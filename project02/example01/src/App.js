import { Canvas } from '@react-three/fiber';
import { useHelper } from '@react-three/drei';
import { useRef } from 'react';
import { DirectionalLightHelper } from 'three';

function Lights () {
  const ref = useRef();
  useHelper(ref, DirectionalLightHelper, 1, 'red');
  return (
    <directionalLight 
      ref={ref}
      position={[1, 3, -1]}
      intensity={3}
    />
  )
}

function Box (props) {
  return (
    <mesh {...props}>
      <boxGeometry args={[1]} />
      <meshStandardMaterial color={'hotpink'} wireframe />
    </mesh>
  )
}

function App() {
  return (
    <Canvas
      camera={{
        position: [0,1,2]
      }}
    >
      <color attach='background' args={['yellow']}></color>
      <Box rotation-y={1} />
      <Box position={[0, 0, -1.5]} rotation-y={1} />
      <Lights />
    </Canvas>
  );
}

export default App;
