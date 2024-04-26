import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ReactAnimatedWeather from "react-animated-weather";
import img from "./Image/WeatherIcons.gif"

const api = {
  key: "4b0f0be4e175d35139b0180297b28815",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [isLoading,setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [icon,setIcon] = useState('');
  const [dateTime, setDateTime] = useState('');

  const defaultCity = "Delhi"; 

  const searchPressed = () => {
    let searchQuery = search;
   
    if (search.trim() === "") {
      searchQuery = defaultCity;
    }
    setIsLoading(true)
    setDateTime(getFormattedDateTime());
    fetch(`${api.base}weather?q=${searchQuery}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setIsLoading(false)
        setWeather(result);
        switch (result.weather[0].main) {
          case "Thunderstorm":
            setIcon("THUNDERSTORM")
            break;
          case "Haze":
            setIcon("CLEAR_DAY");
            break;
          case "Clouds":
            setIcon("CLOUDY");
            break;
          case "Rain":
            setIcon("RAIN");
            break;
          case "Snow":
            setIcon("SNOW");
            break;
          case "Dust":
            setIcon( "WIND" );
            break;
          case "Drizzle":
            setIcon( "SLEET");
            break;
          case "Fog":
            setIcon("FOG");
            break;
          case "Smoke":
            setIcon("FOG");
            break;
          case "Tornado":
            setIcon("WIND");
            break;
        }
      });
    setSearch(''); 
  };

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  const getWeatherColor = (icon) => {
    switch (icon.toLowerCase()) {
      case "thunderstorm":
        return "white";
      case "cloudy":
        return "white"
      case "snow":
        return "white";
      case "wind":
        return "white";
      default:
        return "black";
    }
  };
  

  const getFormattedDateTime = () => {
    const currentDate = new Date();
    const day = currentDate.toLocaleString('en-US', { day: 'numeric' });
    const month = currentDate.toLocaleString('en-US', { month: 'long' });
    const year = currentDate.getFullYear();
    const dayOfWeek = currentDate.toLocaleString('en-US', { weekday: 'long' });
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${day}/${month}/${year} ${dayOfWeek} ${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  useEffect(()=>{
    searchPressed()
  },[])


  return (
    <div className="App">
      <Navbar name = {weather.name} />

      {isLoading? <div>
        <img src= {img}  alt="error"/>
      </div>:
      <header className={`App-header ${icon.toLowerCase()}`}>
       <div className="Icons">
    <ReactAnimatedWeather
      icon={icon}
      color={getWeatherColor(icon)}
      size={defaults.size}
      animate={defaults.animate}
    />
  </div>
 <div className="search">
          <input
            type="text"
            placeholder="Enter city/town..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>

        {dateTime && (
          <div className="datetime" style={{ color: getWeatherColor(icon)}}>
            {dateTime}
          </div>
        )}

        {typeof weather.main !== "undefined" ? (
          <div className="data">
           <li className="cityHead">
                <p>
                  {weather.name}, {weather.sys.country}
                </p>
                <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                />
              </li>
              <li>
                Temperature{" "}
                <span className="temp">
                  {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
                </span>
              </li>
              <li>
                Humidity{" "}
                <span className="temp">
                  {Math.round(weather.main.humidity)}%
                </span>
              </li>
              <li>
                Visibility{" "}
                <span className="temp">
                  {Math.round(weather.visibility)} mi
                </span>
              </li>
              <li>
                Wind Speed{" "}
                <span className="temp">
                  {Math.round(weather.wind.speed)} Km/h
                </span>
              </li>
          </div>
        ) : (
          ""
        )}
      </header>}
    </div>
  );
}

export default App;