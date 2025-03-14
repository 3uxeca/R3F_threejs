import { Html } from '@react-three/drei';
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from 'react';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useBodyClass } from '../utils/hook';

const Earth = () => {
  const glb = useLoader(GLTFLoader, '/models/earth.glb');
  const ref = useRef(null);
  const htmlRef = useRef(null);
  const [isHover, setHover] = useState(false);
  useFrame((_, delta) => {
    // console.log(ref.current);
    ref.current.rotation.y += delta * 0.1;
  })

  // console.log('htmlRef.current : ', htmlRef.current);
  useBodyClass(isHover, 'drag');
  // useEffect(() => {
  //   const bodyClassList = window?.document.body.classList;

  //   if(isHover) {
  //     bodyClassList.add('drag');
  //   } else {
  //     bodyClassList.remove('drag');
  //   }

  //   return () => {
  //     bodyClassList.remove('drag');
  //   }

  // }, [isHover]);

  return(
    <group position={[0, -1.5, 0]}>
      <mesh 
        onPointerEnter={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
        ref={ref} 
        rotation-x={-Math.PI/2} 
        scale={1.3} 
      >
        <primitive object={glb.scene} />
      </mesh>
      <Html
        center
        ref={htmlRef}
        style={{ color: 'red' }}
      >
        <span className='rotation-icon'>
          <img src={'/icons/rotation.png'} alt='icon' />
        </span>
      </Html>
    </group>
  )
}

export default Earth;