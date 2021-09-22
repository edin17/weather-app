import axios from "axios";
import { useEffect, useState } from "react";
import "./main.css";
import { useSelector,useDispatch } from "react-redux";


export default function Main(location){
    let realTimeWeather=useSelector(store=>store.weather);
  
  
    let [foreCast,setForeCast]=useState([]);
    
    let [hourForeCast,setHourForecast]=useState(undefined);
    let [foreCastDays,setForeCastDays]=useState([]);
    let [g,sg]=useState(true)

    let searchVal=useSelector(store=>store.weather);
    function getForeCast(){
    
        let now=Date.now();
        let today=new Date(now)
        let date={
            day:today.getDate(),
            month:today.getMonth()+1,
            year:today.getFullYear()
        }
        
        
 
        for(var i=2;i<=7;i++){
            today=new Date(now);
            date={
                day:today.getDate(),
                month:today.getMonth()+1,
                year:today.getFullYear()
            }
            now=now+86400000 //86400000 is 24h in miliseconds
            foreCastDays.push(date);
            console.log(foreCastDays)
        }
        sg(false)
        foreCast=[]
        setForeCast([])
        foreCastDays.slice(0,6).map(thisDay=>{
           
            axios.post(`https://api.weatherapi.com/v1/forecast.json?key=822e9465199b4a49820105754212308&&q=${g===true?location.location.results[0].address_components[3].long_name:searchVal}&&date=${thisDay.year.toString()+"-"+thisDay.month.toString()+"-"+thisDay.day.toString()}`)
            .then(res=>{
                console.log(res.data)
                foreCast.push(res.data);
                setForeCast([...foreCast,res.data])
            })
        })
     
    }

    useEffect(()=>{
             
        axios.post(`https://api.weatherapi.com/v1/current.json?key=822e9465199b4a49820105754212308&q=${location.location.results[0].address_components[3].long_name}&aqi=no`,{
            
        })
        .then(res=>{
            
            getForeCast(res.data)
        })
           

        },[searchVal])
        
        if(realTimeWeather===false || foreCast.length<1){
            return <div>Loading</div>
        }
        if(hourForeCast===undefined){
            hourForeCast = foreCast[0].forecast.forecastday[0].hour
        }
        
        function selectElement(date){

            
            let boxes=document.getElementsByClassName("weather-card")
            for(var i=0;i<=boxes.length-1;i++){
                boxes[i].style.border="none";
            }
            let box=document.getElementById(date)
            box.style.border="1px solid black";
           
            let dayFound=foreCast.find(day=>day.forecast.forecastday[0].date===date)
            hourForeCast=dayFound.forecast.forecastday[0].hour
            setHourForecast(dayFound.forecast.forecastday[0].hour) 
        }
        
      foreCast.sort((a,b)=>{
        return a.forecast.forecastday[0].date_epoch - b.forecast.forecastday[0].date_epoch
      }) 
    return <div className="main">
    <section>

        {foreCast.slice(0,6).map(singleDay=>{
            let forecastday=singleDay.forecast.forecastday;
         
            return <div className="weather-card today-weather" id={forecastday[0].date} onClick={()=>selectElement(forecastday[0].date)}>
            <h2>{forecastday[0].date}</h2>
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

        
    </section>
  
    <section id="hour-forecast">
        {hourForeCast.map(hour=>{
            
            return  <div>
                <h4>{hourForeCast.indexOf(hour)+":00"}</h4>
                <img src={hour.condition.icon} alt="ikona"/>
                <p>{hour.chance_of_rain}%</p>
        </div>
        
        })}

    </section>

    </div>

    
}