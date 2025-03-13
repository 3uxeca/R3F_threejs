import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function Model(props) {
  const glb = useLoader(GLTFLoader, '/models/earth.glb');
  console.log('glb :: ', glb);
  return (
    <mesh {...props}>
      <primitive object={glb.scene} />
    </mesh>
  )
}

function Lights () {
  return (
    <directionalLight 
      position={[1, 3, -1]}
      intensity={3}
    />
  )
}

function App() {
  return (
    <Canvas
      camera={{
        position: [0,1,5]
      }}
    >
      <color attach='background' args={['yellow']}></color>
      <Lights />
      <Model position={[0, -2, 0]} />
    </Canvas>
  );
}

export default App;
