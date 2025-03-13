import { Canvas } from "@react-three/fiber";
// import Scene from "../components/Scene";
import Lights from "../components/Lights"
import { lazy, Suspense } from 'react';
import { Loader } from '@react-three/drei';

function Sphere() {
  return (
    <mesh>
      <sphereGeometry args={[1]} />
      <meshBasicMaterial color='white' />
    </mesh>
  )
}

const Scene = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(import('../components/Scene'))
    }, 5000);
  })
})

// R3F 3D Suspense => useLoader를 통해 모델을 비동기로 가져오기 때문에 Suspense가 필수적
// Loader는 Canvas 밖에 만들어야함!!
function Home() {
  return (
    <>
    <Canvas camera={{position: [0, 0, 5], fov: 45}}>
      <color attach="background" args={["rgb(67, 127, 240) 100%)"]} />
      <Suspense fallback={'Loading...'}>
        <Lights/>
        <Scene/>
      </Suspense> 
    </Canvas>
    <Loader />
    </>
  );
}

export default Home;