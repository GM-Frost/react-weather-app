import './App.css';
import Forecast from './components/Forecast';
import Inputs from './components/Inputs';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import TimeAndLocation from './components/TimeAndLocation';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons';
import getFormattedWeatherData from './services/WeatherService';
import { useEffect, useState } from 'react';
import { data } from 'autoprefixer';
import Logo from './components/Logo';
import Copyright from './components/Copyright';


function App() {

  const  [ query, setQuery] = useState({q: 'berlin'})
  const  [ units, setUnits] = useState('metric')
  const  [ weather, setWeather] = useState(null)

useEffect(() => {
    //fetching from weatherSercive

  const fetchWeather = async () => {
     await getFormattedWeatherData({...query, units}).then(
       (data)=> {
        setWeather(data);
      });
  };
  fetchWeather();

}, [query,units]); //fetch new data with every query/usit change

//for background 

const formatBackground = () => {
  if(!weather) return 'from-cyan-700 to-blue-700';
  // const threshold = units === 'metric' ? 5:60;
  // if(weather.temp<=threshold) return 'app-warm-text app-warm';

  const weatherConditionClouds =  'Clouds';
  const weatherConditionClear =  'Clear';
  const weatherConditionSunny =  'Sunny';
  const weatherConditionRain =  'Rain';
  const weatherConditionThunderstorm =  'Thunderstorm';
  const weatherConditionHaze =  'Haze';
  const weatherConditionMist =  'Mist';

  if(weather.details==weatherConditionClouds) return 'app-warm-text app-cloudy';
  if(weather.details==weatherConditionClear) return 'app-warm-text app-clear';
  if(weather.details==weatherConditionSunny) return 'app-warm-text app-sunny';
  if(weather.details==weatherConditionRain) return 'app-warm-text app-rain';
  if(weather.details==weatherConditionThunderstorm) return 'app-warm-text app-thunderstorm';
  if(weather.details==weatherConditionHaze) return 'app-warm-text app-haze';
  if(weather.details==weatherConditionMist) return 'app-warm-text app-mist';

  return 'from-yellow-700 to-orange-700';
}
  return (
    <div className={`application-ui mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <Logo></Logo>
      <TopButtons setQuery={setQuery}></TopButtons>
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} ></Inputs>
      
      {weather && (
        <div>
          <TimeAndLocation weather={weather}></TimeAndLocation>
          <TemperatureAndDetails weather={weather}></TemperatureAndDetails>
          
          <Forecast title="hourly forecast" items={weather.hourly}></Forecast>
          <Forecast title="daily forecast" items={weather.daily}></Forecast>
          
          
          <Copyright></Copyright>
        </div>
      )}
     
    </div>
  );
}

export default App;
