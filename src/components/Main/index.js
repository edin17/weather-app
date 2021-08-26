import axios from "axios";
import { useEffect, useState } from "react";
import "./main.css";
import { useSelector,useDispatch } from "react-redux";


export default function Main(location){
    let realTimeWeather=useSelector(store=>store.weather);
    let dispatch=useDispatch();



    
    let currentWeather=realTimeWeather.current;
    let [foreCast,setForeCast]=useState([]);
    function getForeCast(){
        let now=Date.now();
        let today=new Date(now)
        let date={
            day:today.getDate(),
            month:today.getMonth()+1,
            year:today.getFullYear()
        }
        
        let foreCastDays=[];
        for(var i=1;i<=7;i++){
            today=new Date(now);
            date={
                day:today.getDate(),
                month:today.getMonth()+1,
                year:today.getFullYear()
            }
            now=now+86400000 //86400000 is 24h in miliseconds
            foreCastDays.push(date);
        }
        foreCastDays.map(thisDay=>{
            axios.post(`http://api.weatherapi.com/v1/forecast.json?key=822e9465199b4a49820105754212308&&q=${location.location.results[0].address_components[2].long_name}&&date=${thisDay.year.toString()+"-"+thisDay.month.toString()+"-"+thisDay.day.toString()}`)
            .then(res=>{
                foreCast.push(res.data)
                console.log(foreCast)
            })
        })
        
    }
    useEffect(()=>{
        getForeCast();
        axios.post(`http://api.weatherapi.com/v1/current.json?key=822e9465199b4a49820105754212308&q=${location.location.results[0].address_components[2].long_name}&aqi=no`,{
            
        })
        .then(res=>{
            dispatch({type:"SELECTEDCITY",payload:res.data});
            console.log(res.data);
        })
        },[])
      
        if(realTimeWeather.length===0 || foreCast.length<0){
            return <div>Loading</div>
        }

    console.log(foreCast)
    return <div className="main">
    <section>
        <div className="weather-card today-weather">
            <h2></h2>
            <img src={currentWeather.condition.icon} alt="weathericon"/>
            <h1>{currentWeather.temp_c}°C</h1>
            <div className="other-weather-info">
                <p>Weather: {currentWeather.condition.text}</p>
                <p>Feels like: {currentWeather.feelslike_c}°C</p>
                <p>Wind speed: {currentWeather.wind_kph}km/h</p>
                <p>Pressure: {currentWeather.pressure_mb}mb</p>
            </div>
        </div>
        {foreCast.map(singleDay=>{
            let forecastday=singleDay.forecast.forecastday;
            return <div className="weather-card today-weather">
            <h2></h2>
            <img src={forecastday[0].day.condition.icon} alt="weathericon"/>
            <h1>{forecastday[0].day.maxtemp_c}°C</h1>
            <div className="other-weather-info">
                <p>Weather: {forecastday[0].day.condition.text}</p>
                <p>Min temp: {forecastday[0].day.mintemp_c}°C</p>
                <p>Max wind speed: {forecastday[0].day.maxwind_kph}km/h</p>
                <p>Chance of rain: {forecastday[0].day.daily_chance_of_rain}%</p>
            </div>
        </div>
        })}
        <div className="weather-card today-weather">
            <h2></h2>
            <img src={currentWeather.condition.icon} alt="weathericon"/>
            <h1>{currentWeather.temp_c}°C</h1>
            <div className="other-weather-info">
                <p>Weather: {currentWeather.condition.text}</p>
                <p>Feels like: {currentWeather.feelslike_c}°C</p>
                <p>Wind speed: {currentWeather.wind_kph}km/h</p>
                <p>Pressure: {currentWeather.pressure_mb}mb</p>
            </div>
        </div>
        
    </section>
  


    </div>
}