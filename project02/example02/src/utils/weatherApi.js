const API_KEY = process.env.REACT_APP_API_KEY;

const getCurrentWeather = (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  return (
    fetch(url)
    .then((response) => response.json())
    .then((data) => console.log('getCurrentWeather data :: ', data))
    .catch((error) => {
      console.error('getCurrentWeather error :: ', error);
    })
  )
}

const getCityWeather = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  return (
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if(data) {
        console.log('getCityWeather data :: ', data);
        return (
          {
            city: city,
            weatherData: data
          }
        )
      }
    })
    .catch((error) => {
      console.error('getCityWeather error :: ', error);
    })
  )
}

export { getCurrentWeather, getCityWeather };