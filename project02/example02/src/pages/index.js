import { Canvas } from "@react-three/fiber";
import Scene from "../components/Scene";
import { lazy, Suspense } from 'react';
import { Loader } from '@react-three/drei';
import Lights from '../components/Lights';
import { motion } from 'framer-motion-3d';

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
  return (
    <>
    <Canvas camera={{position: [0, 0, 5], fov: 45}}>
      <color attach="background" args={["rgb(67, 127, 240) 100%)"]} />
      <Suspense fallback={'loading'}>
        <Scene/>
        {/* <FramerModel /> */}
      </Suspense> 
    </Canvas>
    <Loader />
    </>
  );
}

export default Home;