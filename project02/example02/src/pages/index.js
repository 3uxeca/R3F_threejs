import { Canvas } from "@react-three/fiber";
import Scene from "../components/Scene";
import { lazy, Suspense } from 'react';
import { Loader, OrbitControls } from '@react-three/drei';
import Lights from '../components/Lights';
import { motion } from 'framer-motion-3d';
import { Vector3 } from 'three';

function Sphere() {
  return (
    <mesh>
      <sphereGeometry args={[1]} />
      <meshBasicMaterial color='white' />
    </mesh>
  )
}

// const Scene = lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(import('../components/Scene'))
//     }, 5000);
//   })
// })

const variants = {
  initial: {
    rotateX: Math.PI / 2,
    rotateZ: 1,
  },
  animate1: {
    rotateZ: [0, Math.PI],
    transition: {
      duration: 3,
      repeat: Infinity
    }
  },
  animate2: {
    rotateY: [Math.PI, 0], transition: {
      duration: 3, repeat: Infinity
    }
  }
}

function FramerModel () {
  return (
    <motion.mesh
      variants={variants}
      initial='initial'
      animate='animate1'
    >
      <cylinderGeometry args={[1, 1, 0.5, 8]} />
      <motion.meshBasicMaterial 
        color={'hotpink'} 
      />
    </motion.mesh>
  )
}

// rotation={[Math.PI/2, 0, 1]} 

// R3F 3D Suspense => useLoader를 통해 모델을 비동기로 가져오기 때문에 Suspense가 필수적
// Loader는 Canvas 밖에 만들어야함!!
function Home() {
  const pivot = new Vector3(0, -2, 0);
  return (
    <>
    <Canvas camera={{position: [0, 0, 5], fov: 45}}>
      {/* <color attach="background" args={["rgb(67, 127, 240) 100%)"]} /> */}
      <Suspense fallback={'loading'}>
        <Scene/>
        {/* <FramerModel /> */}
      </Suspense> 
      <OrbitControls 
        enablePan={false}
        minDistance={2}
        maxDistance={15}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI - Math.PI / 6}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
      />
    </Canvas>
    <Loader />
    </>
  );
}

export default Home;