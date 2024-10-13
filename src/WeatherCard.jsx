export default function WeatherCard({id,location,current,deleteRecent}){

    return (
        <div className="weather-card">
          {deleteRecent&&<button className="delete-button" onClick={()=>deleteRecent(id)}>X</button>}
          <h2 className="weather-location">{location.name}</h2>
          <div className="weather-info">
            <div className="weather-temperature">
              <img src={current.condition.icon} alt="weather icon" className="weather-icon" />
              <span>{current?.temp_c}°C</span>
            </div>
            <div className="weather-details">
              <p>Humidity: {current?.humidity}%</p>
              <p>Wind Speed: {current?.wind_kph} kph</p>
            </div>
          </div>
          
        </div>
      );
}