import './style/App.css';
import Header from './components/Header';
import Main from './components/Main';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  let [loc,setLoc]=useState();
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      console.log(position)
      axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&sensor=true&key=AIzaSyBCWVbvZMR08qDcQrHW0pGvmHxs5FN0huw`)
      .then(res=>{
          console.log(res.data)
          setLoc(res.data)
      })
  })
  },[])
if(!loc){
  return <div>Loading</div>
}
  return (
    <div className="App">
      <Header location={loc}/>
      <Main location={loc}/>
    </div>
  );
}

export default App;
