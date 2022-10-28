// Components
import Form from "./components/Form";
import ShowHistory from "./components/ShowHistory";
import ShowWeather from "./components/ShowWeather";

// Custom hook
import useFetch from "./useFetch";

// Styling
import "./scss/style.scss";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({
    weatherReport: {
      name: "-",
      country: "-",
      main: "-",
      description: "-",
      temp_min: "-",
      temp_max: "-",
      humidity: "-",
      time: "-",
    },
    history: [],
    form: { city: "", country: "" },
    isPending: true,
    error: null,
  });
  // fetch data
  const fetchWeather = async (url) => {
    try {
      await axios
        .get(url)
        .then((response) => {
          const w = response.data;
          console.log(response.data);
          setData({
            ...data,
            weatherReport: {
              name: w.name,
              country: w.sys.country,
              main: w.weather[0].main,
              description: w.weather[0].description,
              temp_min: w.main.temp_min,
              temp_max: w.main.temp_max,
              humidity: w.main.humidity,
              time: getDate(),
            },
            isPending: false,
          });
        })
        .catch((error) => {
          throw error;
        });
    } catch (e) {
      // setError(e.toJSON().message);
    }
  };
  // get current time
  const getDate = () => {
    var today = new Date();
    today = today.toLocaleString("en-US");
    today = today.replace(/\//g, "-");
    return today;
  };
  useEffect(() => {
    const query = { lat: 1.2899175, lng: 103.8519072 };
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${query.lat}&lon=${query.lng}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
    fetchWeather(url);
  }, []);

  return (
    <div>
      <h1 className="text-light">Today's Weather</h1>
      <div>
        <Form />
      </div>
      <div>{<ShowWeather weatherReport={data.weatherReport} />}</div>
      <div>
        <ShowHistory />
      </div>
    </div>
  );
}

export default App;
