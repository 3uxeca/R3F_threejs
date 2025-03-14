import { useEffect, useState } from 'react';
import Earth from "./Earth";
import Weather from "./Weather";
import { getCityWeather, getCurrentWeather } from '../utils/weatherApi';
import { cities } from '../utils/cities';
import Lights from './Lights';
import { useFrame } from '@react-three/fiber';
import { Bounds, Stars } from '@react-three/drei';
import { FocusWeather } from './FocusWeather';
import Clouds from './Clouds';

const Scene = () => {
  const [content, setContent] = useState();

  const getCitiesWeather = () => {
    const promises = cities.map((city) => {
      return (
        getCityWeather(city)
      )
    })

    Promise.all(promises)
    .then((weatherDataArray) => {
      setContent(weatherDataArray);
    })
    .catch((error) => {
      console.error('getCitiesWeather error :: ', error);
    })
  };

  useEffect(() => {
    getCitiesWeather();
  }, []);
  
  useEffect(() => {
    console.log('도시들 날씨 데이터 :: ', content);
  }, [content]);

  // useFrame((state) => {
  //   console.log(state)
  // })

  return(
    <>
      <Lights />
      <Earth />
      <Clouds />
      <Stars 
        radius={50} // 별의 반지름
        depth={50}
        count={1000}
        factor={4}  // 별의 크기
        saturation={0}
        fade
        speed={1}
      />
      <Bounds 
        // fit // 바운딩박스가 주어진 객체나 경계상자에 맞게 조정
        clip  // 카메라의 근원과 원거리 평면 설정 => 특정 거리 이상의 오브젝트를 렌더링에서 제외 => 성능 향상에 도움 (여기서는 영향 없음)
        observe // 창의 크기가 변경될 때마다 바운딩 박스를 새로 조정 => 반응형 웹에 도움
        // onFit={() => {
        //   // fit이 일어나면 동작하는 콜백 함수
        //   console.log('fit');
        // }}
        // damping={9}
        margin={0.7}  // 바운딩 박스 주변에 여백을 부여해 객체가 화면 가장자리에 가까워지는 것을 방지 
      >
        <FocusWeather>
          {content?.map((el, i) => {
            const angle = (i / (content.length - 1)) * Math.PI;
            const radius = 2;
            // console.log('angle :: ', angle);
            const x = radius * Math.cos(angle);
            // console.log('x :: ', x.toFixed(2));
            const y = radius * Math.sin(angle);
            // console.log('y :: ', y.toFixed(2));
            return (
              <Weather 
                key={i+'Model Key'}
                position={[x, y - 1, 0]}
                rotation-y={i + 1}
                cityName={el.city}
                weather={el.weatherData.weather[0].main.toLowerCase()}
              />
            )
          })}
        </FocusWeather>
      </Bounds>
    </>
  )
}

export default Scene;