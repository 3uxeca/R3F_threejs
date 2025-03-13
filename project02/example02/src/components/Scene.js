import { useEffect, useState } from 'react';
import Earth from "./Earth";
import Weather from "./Weather";
import { getCityWeather, getCurrentWeather } from '../utils/weatherApi';
import { cities } from '../utils/cities';

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

  return(
    <>
      <Earth position={[0,-2,0]}/>
      {content?.map((el, i) => {
        return (
          <Weather 
            key={i+'Model Key'}
            position={[-1 + (i * 0.5), 0, 0]}
            weather={content[i].weatherData.weather[0].main.toLowerCase()}
          />
        )
      })}
    </>
  )
}

export default Scene;