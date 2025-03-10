import { useRecoilValue } from "recoil"
import { IsEnteredAtom } from "../stores"
import { useEffect, useMemo, useRef } from "react";
import { Box, Circle, Points, useAnimations, useGLTF, useScroll, useTexture } from "@react-three/drei";
import { Loader } from "./Loader";
import gsap from 'gsap';
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';

let timeline;
export const Dancer = () => {
  const three = useThree();
  const isEntered = useRecoilValue(IsEnteredAtom);
  const dancerRef = useRef(null);
  const { scene, animations } = useGLTF('/models/dancer.glb');
  const texture = useTexture('/texture/5.png');
  const { actions } = useAnimations(animations, dancerRef);
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
  })

  useEffect(() => {
    if(!isEntered) return;
    actions['wave'].play();
  }, [actions, isEntered]);

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
    )
  }, [isEntered, three.camera.position, three.camera.rotation]);

  useEffect(() => {
    if(!isEntered) return;
    if(!dancerRef.current) return;
    timeline = gsap.timeline();
    // y 좌표 -4 * Math.PI 위치에서 0으로 돌아오는 애니메이션
    timeline.from(
      dancerRef.current.rotation,
      {
        duration: 4,
        y: -4 * Math.PI,  
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
    ).to(
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
        z: 16
      }
    )
  }, [isEntered, three.camera.position]);

  if(isEntered) {
    return (
      <>
      <primitive ref={dancerRef} object={scene} scale={0.05} />
      <ambientLight intensity={2} />
      <rectAreaLight 
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
        position={[0, 5, 0]}
        intensity={0}
        groundColor={'lime'}
        color='blue'
      />
      <Box 
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
          size={0.5} 
          color={new THREE.Color('#dc4f00')} 
          sizeAttenuation // 원근에 따라 크기를 조절
          depthWrite // 앞에 있는 별이 뒤를 가리게 하고싶을 때
          alphaMap={texture} 
          transparent
          alphaTest={0.001} //
        />
      </Points>      
      </>
    )
  }
  return <Loader isCompleted />
}