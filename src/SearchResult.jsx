import { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";

export default function SearchResult({searchKey, setSeachKey, save, setSave, addRecent}){
    const [data, SetData] = useState();
    const [loading, SetLoading] = useState(true);
    const [isError,setIsError] = useState(false);
    const [errorDetail,setErrorDetail] = useState("");

    useEffect(()=>{
        // Fetch Data from API
        if(!searchKey){
            SetLoading(true);
            return
        }
        const fetchData = async()=>{
            try {
                SetData("");
                SetLoading(true);
                setIsError(false);
                setErrorDetail("");
                const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=d10e2cd6c81b410fa22135844231902&q=${searchKey}&aqi=no`);
                const result  = await response.json();
                if(result?.location){
                    SetData(result);
                    // addSearch(result);
                    console.log(result)
                }else{
                    setIsError(true);
                    setErrorDetail(result?.error?.message);
                }
            } catch (error) {
                console.error('Error fetching Data: ', error);
                setIsError(true);
            }finally{
                SetLoading(false);
            }
        }
        const timeOutId = setTimeout(()=>{
            fetchData();
        },500)

        // Cleanup function to cancel the previous timeout if the user types quickly
        return ()=> clearTimeout(timeOutId);
    },[searchKey] )


    useEffect(()=>{
        if(save){
            addRecent(data);
            console.log("Save");
        }
        return ()=>{
            SetData("");
            setSave(false);
        }
    },[save])
    
    if(loading){
        return <p>Loading...</p>
    }else{
        if(isError){
            return <p>Error: {errorDetail}</p>
        }else{
            return <>
            {data&&
            <div onClick = {()=>{setSave(true);setSeachKey("")}} >
                <WeatherCard location={data.location} current={data.current}/>
            </div>
            }
            </>
        }
    }
}