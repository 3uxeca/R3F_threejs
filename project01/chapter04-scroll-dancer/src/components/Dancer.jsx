import { useRecoilValue } from "recoil"
import { IsEnteredAtom } from "../stores"
import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Circle, Points, PositionalAudio, useAnimations, useGLTF, useScroll, useTexture } from "@react-three/drei";
import { Loader } from "./Loader";
import gsap from 'gsap';
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';

let timeline;
const colors = {
  boxMaterialColor: '#dc4f00',
}
export const Dancer = () => {
  const three = useThree();
  const isEntered = useRecoilValue(IsEnteredAtom);
  const dancerRef = useRef(null);
  const boxRef = useRef(null);  // 공간을 담은 커다란 Box mesh
  const starGroupRef01 = useRef(null);
  const starGroupRef02 = useRef(null);
  const starGroupRef03 = useRef(null);
  const rectAreaLightRef = useRef(null);
  const hemisphereLightRef = useRef(null);
  
  const { scene, animations } = useGLTF('/models/dancer.glb');
  const texture = useTexture('/texture/5.png');
  const { actions } = useAnimations(animations, dancerRef);

  const [currentAnimation, setCurrentAnimation] = useState('wave');
  const [rotateFinished, setRotateFinished] = useState(false);  // 카메라 회전을 마무리했는지 여부

  const { positions } = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3); // x,y,z 하나씩 받아야해서 * 3
    for (let i=0; i < count*3; i += 1) {
      positions[i] = (Math.random() - 0.5) * 25;
    }
    return { positions };
  }, []);

  const scroll = useScroll();

  useFrame(() => {
    console.log(scroll.offset);

    if(!isEntered) return;
    timeline.seek(scroll.offset * timeline.duration());
    boxRef.current.material.color = new THREE.Color(colors.boxMaterialColor);
    if(rotateFinished) {
      setCurrentAnimation('breakdancingEnd');
    } else {
      setCurrentAnimation('wave');
    }
  });

  useEffect(() => {
    if(!isEntered) return;
    three.camera.lookAt(1, 2, 0);
    actions['wave'].play();
    three.scene.background = new THREE.Color(colors.boxMaterialColor);
    scene.traverse(obj => {
      if(obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    })
  }, [actions, isEntered, scene, three.camera, three.scene]);

  // 애니메이션 제어
  useEffect(() => {
    let timeout;
    if(currentAnimation === 'wave') {
      actions[currentAnimation]?.reset().fadeIn(0.5).play();
    } else {
      actions[currentAnimation]?.reset().fadeIn(0.5).play().setLoop(THREE.LoopOnce, 1);
      timeout = setTimeout(() => {
        if(actions[currentAnimation]) {
          actions[currentAnimation].paused = true;
        }
      }, 8000);
    }
    return () => {
      clearTimeout(timeout);
      actions[currentAnimation]?.reset().fadeOut(0.5).stop();
    };
  }, [actions, currentAnimation]);

  useEffect(() => {
    // gsap
    if(!isEntered) return;
    if(!dancerRef.current) return;
    // 카메라 이동동
    gsap.fromTo(
      three.camera.position, 
      {
        x: -5,
        y: 5,
        z: 5,
      },
      {
        duration: 2.5,
        x: 0,
        y: 6,
        z: 12,
      }
    )
    // 카메라 회전
    gsap.fromTo(
      three.camera.rotation,
      { z: Math.PI },
      {
        duration: 2.5,
        z: 0,
      }
    );
    gsap.fromTo(
      colors,
      {boxMaterialColor: '#0c0400'},
      {duration: 2.5, boxMaterialColor: '#dc4f00'}
    )
    gsap.to(starGroupRef01.current, {
      yoyo: true, // 애니메이션이 실행되었다가 역재생하는 값
      duration: 2,
      repeat: -1, // -3이면 무한 반복
      ease: 'linear', // 선형적 속도로 재생
      size: 0.05, // 대상의 크기 설정
    });
    gsap.to(starGroupRef02.current, {
      yoyo: true,
      duration: 3,
      repeat: -1,
      ease: 'linear',
      size: 0.05,
    });
    gsap.to(starGroupRef03.current, {
      yoyo: true,
      duration: 4,
      repeat: -1,
      ease: 'linear',
      size: 0.05,
    });        
  }, [isEntered, three.camera.position, three.camera.rotation]);

  useEffect(() => {
    if(!isEntered) return;
    if(!dancerRef.current) return;
    // 카메라를 특정 위치 중심으로 무언가 회전시키고 싶을 때, 지구가 태양 주위를 도는 것처럼
    // 카메라가 댄서를 중심으로 공전하는 효과를 주고싶을때 사용하는 기법
    const pivot = new THREE.Group(); 
    pivot.position.copy(dancerRef.current.position);
    pivot.add(three.camera);
    three.scene.add(pivot);

    timeline = gsap.timeline();
    // y 좌표 -4 * Math.PI 위치에서 0으로 돌아오는 애니메이션
    timeline.from(
      dancerRef.current.rotation,
      {
        duration: 4,
        y: Math.PI,  
      },
      0.5
    ).from(
      dancerRef.current.position,
      {
        duration: 4,
        x: 3,
      },
      "<" // 위 코드와 동시 동작
    ).to(
      three.camera.position,
      {
        duration: 10,
        x: 2,
        z: 8
      },
      "<"   // 위 코드와 동시 동작
    )
    .to(
      colors,
      {
        duration: 10,
        boxMaterialColor: '#0c0400',
      },
      "<"
    )
    .to(
      pivot.rotation,
      {
        duration: 10,
        y: Math.PI
      }
    )
    .to(three.camera.position,
      {
        duration: 10,
        x: -4,
        z: 12,
      },
      "<"
    )
    .to(
      three.camera.position,
      {
        duration: 10,
        x: 0,
        z: 6, // 이 코드들은 위 코드들이 모두 실행된 다음 동작
      }
    ).to(
      three.camera.position,
      {
        duration: 10,
        x: 0,
        z: 16,
        onUpdate: () => {
          setRotateFinished(false);
        }
      }
    ).to(
      hemisphereLightRef.current,
      {
        duration: 5,
        intensity: 30,
      }
    ).to(
      pivot.rotation,
      {
        duration: 25,
        y: Math.PI*4,
        onUpdate: () => {
          setRotateFinished(true);
        }
      },
      "<"
    ).to(
      colors,
      {
        duration: 15,
        boxMaterialColor: '#dc4f00'
      }
    );
    return () => {
      three.scene.remove(pivot);
    }
  }, [isEntered, three.camera, three.camera.position, three.scene]);

  if(isEntered) {
    return (
      <>
      <primitive ref={dancerRef} object={scene} scale={0.05} />
      <ambientLight intensity={2} />
      <rectAreaLight
        ref={rectAreaLightRef}
        position={[0, 10, 0]}
        intensity={30}
      />
      <pointLight 
        position={[0, 5, 0]}
        intensity={45}
        castShadow
        receiveShadow
      />
      <hemisphereLight
        ref={hemisphereLightRef}
        position={[0, 5, 0]}
        intensity={0}
        groundColor={'lime'}
        color='blue'
      />
      <Box 
        ref={boxRef}
        position={[0, 0, 0]}
        args={[100, 100, 100]}
      >
        <meshStandardMaterial color={'#dc4f00'} side={THREE.DoubleSide} />
      </Box>
      <Circle 
        castShadow
        receiveShadow
        args={[8, 32]}
        rotation-x={-Math.PI / 2}
        position-y={-4.4}
      >
        <meshStandardMaterial color={'#dc4f00'} side={THREE.DoubleSide} />
      </Circle>
      <Points positions={positions.slice(0, positions.length / 3)}>
        <pointsMaterial 
          ref={starGroupRef01}
          size={0.5} 
          color={new THREE.Color('#dc4f00')} 
          sizeAttenuation // 원근에 따라 크기를 조절
          depthWrite // 앞에 있는 별이 뒤를 가리게 하고싶을 때
          alphaMap={texture} 
          transparent
          alphaTest={0.001} //
        />
      </Points>
      <Points positions={positions.slice(positions.length / 3, positions.length * 2 / 3)}>
        <pointsMaterial 
          ref={starGroupRef02}
          size={0.5} 
          color={new THREE.Color('#dc4f00')} 
          sizeAttenuation // 원근에 따라 크기를 조절
          depthWrite // 앞에 있는 별이 뒤를 가리게 하고싶을 때
          alphaMap={texture} 
          transparent
          alphaTest={0.001} //
        />
      </Points>
      <Points positions={positions.slice(positions.length * 2 / 3)}>
        <pointsMaterial 
          ref={starGroupRef03}
          size={0.5} 
          color={new THREE.Color('#dc4f00')} 
          sizeAttenuation // 원근에 따라 크기를 조절
          depthWrite // 앞에 있는 별이 뒤를 가리게 하고싶을 때
          alphaMap={texture} 
          transparent
          alphaTest={0.001} //
        />
      </Points>      
      <PositionalAudio
        position={[-24, 0, 0]}
        autoplay
        url='/audio/bgm.mp3'
        distance={50}
        loop
      />
      </>
    )
  }
  return <Loader isCompleted />
}