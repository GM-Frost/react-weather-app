import { DateTime } from "luxon";

const API_KEY = "3888c0cc13edd272ddb58d98ac8289b9";

const BASE_URL ="https://api.openweathermap.org/data/2.5";


//creating weather function to pass value from API
//search params has lattitude and longitude
const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({...searchParams,appid:API_KEY});

    return fetch(url)
    .then((res) => res.json())
};

const formatCurrentWeather = (data) => {
const {
    coord: {lat,lon},
    main:{temp,feels_like,temp_min,temp_max,humidity},
    name,
    dt, //data or timestamp
    sys:{country,sunrise,sunset},
    weather,
    wind:{speed}
} = data

const {main:details,icon}= weather[0]

return {lat,lon,temp,feels_like,temp_min,temp_max,
    humidity,name,dt,country,sunrise,sunset,details,icon,speed}
}
//manupulate how many items such as how many days needed for forecast
const formatForecastWeather = (data) => {
    let {timezone, daily, hourly} = data;
    daily = daily.slice(1,6).map(d=>{
        return{
            title: formatToLocalTime(d.dt, timezone, "ccc"),
            temp:d.temp.day,
            icon:d.weather[0].icon
        }
    }); //how many data needed to show for now its 5


    hourly = hourly.slice(1,6).map(d=>{
        return{
            title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
            temp:d.temp,
            icon:d.weather[0].icon
        }
    }); //how many data needed to show for now its 5

    return{timezone,daily,hourly};
}
const getFormattedWeatherData = async (searchParams) => {
const formattedCurrentWeather = await getWeatherData
('weather',searchParams).then(formatCurrentWeather)

const {lat,lon} = formattedCurrentWeather;

const formattedForecastWeather = await getWeatherData("onecall", {
    lat,lon,exclude: 'current,minutely,alerts', units: searchParams.units,
}).then(formatForecastWeather);

return {...formattedCurrentWeather, ...formattedForecastWeather};

};
//getting luxon for date formating 
const formatToLocalTime = (
    secs,
    zone,
    format = "cccc,dd LLL yyyy' | Local Time: 'hh:mm a"
    )=> DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`

export default getFormattedWeatherData;
export {formatToLocalTime, iconUrlFromCode};