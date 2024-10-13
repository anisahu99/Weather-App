import { useState,useEffect } from "react";
import SearchResult from "./SearchResult";
import WeatherCard from "./WeatherCard";

export default function LocateMe({addRecent}){
    const [searchKey,setSearchKey] = useState("");
    const [data, setData] = useState(null);
    function getCurrentLocation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                setSearchKey(`${position.coords.latitude},${position.coords.longitude}`);
            },
            (error)=>{
                console.error("Error getting location:", error);
            }
        )
        }else {
            console.error("Geolocation is not supported by this browser.");
        }
    }

    useEffect(()=>{
        // Fetch Data from API
        if(!searchKey){
            return
        }
        const fetchData = async()=>{
            try {
                setData(null);
                const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=d10e2cd6c81b410fa22135844231902&q=${searchKey}&aqi=no`);
                const result  = await response.json();
                if(result?.location){
                    setData(result);
                    console.log(result)
                }else{
                    console.log("Error");
                }
            } catch (error) {
                console.error('Error fetching Data: ', error);
            }finally{
            }
        }
        const timeOutId = setTimeout(()=>{
            fetchData();
        },50)

        // Cleanup function to cancel the previous timeout if the user types quickly
        return ()=> clearTimeout(timeOutId);
    },[searchKey] )

    function handleCurrentLocation(){
        getCurrentLocation();
    }
    return <>
    <button onClick={handleCurrentLocation}>Current Location</button>
    {data&&
        <div onClick = {()=>{addRecent(data);setData(null);setSearchKey("");}} >
            <WeatherCard location={data.location} current={data.current}/>
        </div>
    }
    </>
}