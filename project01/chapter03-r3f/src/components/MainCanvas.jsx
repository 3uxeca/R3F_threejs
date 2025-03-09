import { Canvas } from "@react-three/fiber";
import { Color } from "three";
import { Meshes } from "./Meshes";
import { Lights } from "./Lights";
import { Controls } from "./Controls";
import { GLBModel } from "./GLBModel";
import { Dancer } from "./Dancer";
import { PostProcessor } from "./PostProcessor";
import { Physics } from "@react-three/cannon";
export const MainCanvas = () => {
  return (
    <Canvas
      gl={{ antialias: true }}
      shadows={"soft"}
      // shadows={{
      //   enabled: true,
      //   type: THREE.PCFSoftShadowMap,
      // }}
      // shadows
      camera={{
        fov: 60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 100,
        position: [5, 5, 5],
      }}
      scene={{
        background: new Color(0x000000),
      }}
    >
      <Physics
        gravity={[0, -9, 0]} // 지구처럼 위에서 아래로 중력 작용
        defaultContactMaterial={{
          restitution: 0.1, // 탄성력
          friction: 1, // 마찰력
        }}
      >
        <Lights />
        <Meshes />
      </Physics>
      <Controls />
      {/* <GLBModel /> */}
      {/* <PostProcessor /> */}
      {/* <Dancer /> */}
    </Canvas>
  );
};
