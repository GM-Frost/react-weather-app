//fetch location icons, ssearch icon, text field, Celsius and farenheit

import React from 'react'
import { UilSearch, UilMapMarkerAlt  } from '@iconscout/react-unicons'
import { useState } from 'react';

function Inputs({setQuery, units, setUnits}) {

  const [city, setCity] = useState("");
  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name
    if(units !== selectedUnit) setUnits(selectedUnit);
  }

  const handleSearchClick = () => {
    if(city !== '') setQuery({q:city});
  };

  const handleLocationClick = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  }
  return (
    <div className='flex flex-row justify-center my-6'>
        <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
            <input type="text" 
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            placeholder='search for city...' className="searchbox text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"></input>
            <UilSearch size={25} className="search-bar  cursor-pointer transition ease-out hover:scale-125" onClick={handleSearchClick}></UilSearch>
            <UilMapMarkerAlt size={25} className="location-icon  cursor-pointer transition ease-out hover:scale-125" onClick={handleLocationClick}></UilMapMarkerAlt>
        </div>

        <div className='flex flex-row w-1/4 items-center justify-center'>
            <button name='metric' className='celcius-text text-xl font-light text-white transition ease-out hover:scale-125' onClick={handleUnitsChange}>℃</button>
            <p className='text-xl text-white mx-l'>&#160;
|&#160;</p>
            <button name='imperial' className='farenheit-text  text-xl font-light text-white transition ease-out hover:scale-125' onClick={handleUnitsChange}>℉</button>
        </div>
    </div>
  );
}

export default Inputs