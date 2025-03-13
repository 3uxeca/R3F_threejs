import { useEffect, useState } from 'react';
import Earth from "./Earth";
import Weather from "./Weather";
import { getCityWeather, getCurrentWeather } from '../utils/weatherApi';
import { cities } from '../utils/cities';
import Lights from './Lights';
import { useFrame } from '@react-three/fiber';

const API_KEY = process.env.REACT_APP_API_KEY;

const Scene = () => {
  const [content, setContent] = useState();

  const getCitiesWeather = () => {
    const promises = cities.map((city) => {
      return (
        getCityWeather(city, API_KEY)
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
            weather={el.weatherData.weather[0].main.toLowerCase()}
          />
        )
      })}
    </>
  )
}

export default Scene;