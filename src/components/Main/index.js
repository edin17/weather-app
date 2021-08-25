import axios from "axios";
import { useEffect, useState } from "react";
import "./main.css";
import { useSelector,useDispatch } from "react-redux";


export default function Main(location){
    let realTimeWeather=useSelector(store=>store.weather);
    let dispatch=useDispatch();


    useEffect(()=>{
    axios.post(`http://api.weatherapi.com/v1/current.json?key=822e9465199b4a49820105754212308&q=${location.location.results[0].address_components[2].long_name}&aqi=no`,{
        
    })
    .then(res=>{
        dispatch({type:"SELECTEDCITY",payload:res.data});
        console.log(res.data);
    })
    },[])
  
    if(realTimeWeather.length===0){
        return <div>Loading</div>
    }
    
    let currentWeather=realTimeWeather.current;
    return <div className="main">

        <div className="weather-card today-weather">
            <img src={currentWeather.condition.icon} alt="weathericon"/>
            <h1>{currentWeather.temp_c}°C</h1>
            <div className="other-weather-info">
                <p>Weather: {currentWeather.condition.text}</p>
                <p>Feels like: {currentWeather.feelslike_c}°C</p>
                <p>Wind speed: {currentWeather.wind_kph}km/h</p>
                <p>Pressure: {currentWeather.pressure_mb}mb</p>
            </div>
        </div>
    </div>
}