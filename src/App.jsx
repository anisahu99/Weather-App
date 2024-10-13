import { useState } from 'react'
import './App.css'
import SearchBar from './SearchBar';
import WeatherCard from './WeatherCard';
import LocateMe from './LocateMe';


function App() {
  const [recentLocation,setRecentLocation] = useState([]);
  function addRecent(result){
    setRecentLocation([result,...recentLocation]);
  }
  function deleteRecent(id){
    const updateArray = recentLocation.filter((_,i)=>id!=i);
    setRecentLocation(updateArray);
  }
  return (
    <>
      <h2>Weather App</h2>
      <SearchBar addRecent = {addRecent}/>
      <LocateMe addRecent = {addRecent}/>
      <p>Recent Locations</p>
        {
          recentLocation.map((item,id)=>{
            return <WeatherCard key={id} id={id} location = {item?.location} current = {item?.current} deleteRecent = {deleteRecent}/>
          })
        }
    </>
  )
}

export default App
