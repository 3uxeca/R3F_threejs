import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export const GLBModel = () => {
  const { scene } = useGLTF("/dancer.glb");

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [scene]);

  // premitive => obj의 geometry 쉽게 해당 형태에 해당하는 mesh 무엇이든 만들어주는 컴포넌트
  return <primitive scale={0.01} object={scene} position-y={0.8} />;
};
