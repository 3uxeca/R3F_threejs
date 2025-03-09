import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export const GLBModel = () => {
  const three = useThree();
  console.log("three :: ", three);
  const { scene, animations } = useGLTF("/dancer.glb");
  const ref = useRef(null);

  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
    console.log("actions", actions);
    actions["wave"].play();
  }, [scene, actions]);

  useFrame((state, delta) => {
    // console.log(state);
    // console.log(delta); // 현재 프레임과 이전 프레임 간의 간격
    // ref.current.rotation.y += 0.02;
  });

  // premitive => obj의 geometry 쉽게 해당 형태에 해당하는 mesh 무엇이든 만들어주는 컴포넌트
  return <primitive ref={ref} scale={0.01} object={scene} position-y={0.8} />;
};
