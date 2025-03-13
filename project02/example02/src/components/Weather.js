import { useLoader } from "@react-three/fiber";
import { useMemo } from 'react';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Weather = (props) => {
    const { position, weather } = props;
    const glb = useLoader(GLTFLoader, '/models/weather.glb');
    console.log(glb.nodes);
    
    // glb.nodes에 있는 여러 모델 중 날씨에 해당하는 모델만 기억하게 하기
    // 날씨 데이터가 바뀔 때만 재계산하고 그렇지 않으면 기억 
    const weatherModel = useMemo(() => {
        const cloneModel = glb.nodes[weather] || glb.nodes.cloud;
        return cloneModel.clone();
    }, [weather]);
    
    return(
        <mesh position={position}>
            <primitive object={weatherModel} />
        </mesh>
    )
}

export default Weather;