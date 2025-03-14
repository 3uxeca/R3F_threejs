import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from 'react';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { motion } from 'framer-motion-3d';
import { Html } from '@react-three/drei';
import { CityName } from './CityName';
import { useNavigate } from 'react-router-dom';

const Weather = (props) => {
  const { position, weather, rotationY, cityName } = props;
  const glb = useLoader(GLTFLoader, '/models/weather.glb');
  const ref = useRef(null);
  const navigate = useNavigate();
  // console.log(glb.nodes);
  const [isHover, setHover] = useState(false);
  
  // glb.nodes에 있는 여러 모델 중 날씨에 해당하는 모델만 기억하게 하기
  // 날씨 데이터가 바뀔 때만 재계산하고 그렇지 않으면 기억 
  const weatherModel = useMemo(() => {
      const cloneModel = glb.nodes[weather] || glb.nodes.cloud;
      return cloneModel.clone();
  }, [weather]);

  useFrame((_, delta) => {
    ref.current.rotation.y += delta;
  });

  useEffect(() => {
    document.body.style.cursor = isHover ? 'pointer' : 'auto'
  }, [isHover]);    

  const formatCityName = (name) => {
    return name.replace(/\s/g,'').toLowerCase();
  };

  const onClick = () => {
    navigate(`/${formatCityName(cityName)}`);
  };
    
  return(
    <group
      rotation-y={rotationY} 
      position={position}
    >
      <motion.mesh 
        onPointerEnter={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
        onClick={onClick}
        // onClick={(e) => console.log('클릭')}
        // onContextMenu={(e) => console.log('콘텍스트 메뉴, 오른쪽 마우스 클릭')}
        // onDoubleClick={(e) => console.log('더블 클릭')}
        // onWheel={(e) => console.log('마우스 휠')}
        // onPointerUp={(e) => console.log('마우스에서 손 뗐을 때(위로)')}
        // onPointerDown={(e) => console.log('마우스 버튼을 눌렀을 때(아래로')}
        // onPointerOver={(e) => console.log('포인터가 객체 위에 올라감')}
        // onPointerOut={(e) => console.log('포인터가 객체를 벗어남')}
        // onPointerEnter={(e) => console.log('포인터가 객체 내로 들어가는 타이밍')}
        // onPointerLeave={(e) => console.log('포인터가 객체에서 벗어나는 타이밍')}
        // onPointerMove={(e) => console.log('포인터가 객체 내에서 이동 중')}
        // onPointerMissed={() => console.log('포인터가 객체 내에서 잃어버림')}
        // onUpdate={(self) => console.log('프로퍼티가 업데이트됨')}        
        whileHover={{ scale: 1.5, transition: 0.5 }}
        ref={ref} 
      >
        <primitive object={weatherModel} />
      </motion.mesh>
      { isHover && <CityName name={cityName} /> }
    </group>
  )
}

export default Weather;