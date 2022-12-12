import React from 'react'
import{
    UilArrowUp,
    UilArrowDown,
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset,
} from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from '../services/WeatherService';

function TemperatureAndDetails({weather: {
    details,
     icon,
      temp,
       temp_min,
        temp_max,
         sunrise,
          sunset,
    speed,
     humidity,
      feels_like,
      timezone
}}) {

  

    
  return (
    <div>
        <div className='flex items-center justify-center py-6 text-xl font-bold '>
                <p>{details}</p>
        </div>

        <div className='flex flex-row items-center justify-between  py-3'>
            <img src={iconUrlFromCode(icon)} alt='' className='w-20'></img>
        
            <p className='real-temperature-data text-5xl'>{`${temp.toFixed()}`} °</p>

            <div className='flex flex-col space-y-2'>
                <div className='flex font-light text-m items-center justify-center'>
                    <UilTemperature size={18} className="mr-1"></UilTemperature>
                    Real Feel: <span className='font-medium ml-1'>{`${feels_like.toFixed()}`}°</span>
                </div>
                <div className='flex font-light text-m items-center justify-center'>
                
                <UilTear size={18} className="mr-1"></UilTear>
                    Humidity: <span className='font-medium ml-1'>{`${humidity.toFixed()} %`}</span>

                </div>

                <div className='flex font-light text-m items-center justify-center'>
                <UilWind size={18} className="mr-1"></UilWind>
                    Wind: <span className='font-medium ml-1'>{`${speed.toFixed()} km/h`}</span>
                </div>
            </div>
        </div>

        <div className='flex flex-row items-center justify-center space-x-2 text-sm py-3'>
            <UilSun className="transition ease-out hover:scale-125"></UilSun>
            <p className='font-light '>Rise: <span className='font-medium ml-1'>{formatToLocalTime(sunrise, timezone, "hh:mm a")}</span></p>
            <p className='font-light'>|</p>

            <UilSunset className="transition ease-out hover:scale-125"></UilSunset>
            <p className='font-light '>Set: <span className='font-medium ml-1'>{formatToLocalTime(sunset, timezone, "hh:mm a")}</span></p>
            <p className='font-light'>|</p>


            <UilSun className="transition ease-out hover:scale-125"></UilSun>
            <p className='font-light '>High: <span className='font-medium ml-1'>{`${temp_max.toFixed()}°`}</span></p>
            <p className='font-light'>|</p>


            <UilSun className="transition ease-out hover:scale-125"></UilSun>
            <p className='font-light '>Low: <span className='font-medium ml-1'>{`${temp_min.toFixed()}°`}</span></p>

        </div>
    </div>
  )
}

export default TemperatureAndDetails;