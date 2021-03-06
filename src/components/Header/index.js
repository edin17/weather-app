import axios from "axios";
import { useState } from "react";
import "./header.css";
import { useDispatch,useSelector} from "react-redux";


export default function Header(location){
    let [searchVal,setSearchVal]=useState("");
    let [searchRes,setSearchRes]=useState([]);

    function searching(e){
        setSearchVal(e.target.value);
        if(searchVal.length>2){
            axios.post(`https://api.weatherapi.com/v1/search.json?key=822e9465199b4a49820105754212308&name=${searchVal}&q=${searchVal}`)
            .then(res=>{
                setSearchRes(res.data);
            });
           
        }

    }
    let searchStyle=searchVal.length<3 ? {display:"block"}:{display:"none"};
    let [searchToggle,setSearchToggle]=useState();
    let boxStyle=searchToggle ? {display:"block"}:{display:"none"};

    let dispatch=useDispatch();
    function pickPlace(city){
        dispatch({type:"SELECTEDCITY",payload:city});
        
        setSearchToggle(false);
    }
   
    let city=useSelector(store=>store.weather);
    console.log(location)
    return <header>
        
        <div className="location">
            <h2>{city.length===0 ? "Your location":city}</h2>
        </div>

        <input type="text" placeholder="Search place..." value={searchVal} onChange={(e)=>searching(e)} onClick={()=>setSearchToggle(!searchToggle)}/>
        <div className="search-res-box" style={boxStyle}>
            <p style={searchStyle}>Please type 2 or more letters.</p>
            {searchRes.map(place=>{
                return <div className="place">
                    <p onClick={()=>pickPlace(place.name)}>{place.name}</p>
                </div>
            })}
        </div>
    </header>
}