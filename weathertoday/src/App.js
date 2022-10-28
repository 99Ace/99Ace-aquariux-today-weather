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
  const [coordinates, setCoordinates] = useState(null);
  // fetch data
  const fetchWeather = async (url) => {
    try {
      await axios
        .get(url)
        .then((response) => {
          const w = response.data;
          console.log("weather =>", response.data);
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
  const fetchCoordinates = async (url) => {
    try {
      await axios
        .get(url)
        .then((response) => {
          console.log(response.data);
          const query = {
            lat: response.data[0].lat,
            lng: response.data[0].lon,
          };
          console.log(query);
          const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${query.lat}&lon=${query.lng}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
          console.log(weatherUrl);
          fetchWeather(weatherUrl);
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

  const onSubmit = (form) => {
    console.log("submitted", form);
    var query = "";
    if (form.city.length > 0 && form.country.length > 0) {
      query = `${form.city},${form.country}`;
      // console.log("1");
    } else if (form.city.length > 0) {
      query = form.city;
      // console.log("2", form.city);
    } else {
      query = form.country;
      // console.log("3");
    }
    if (query.length > 0) {
      // api to get location coordinates
      const locationURL = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${process.env.REACT_APP_API_KEY}`;

      console.log(locationURL);
      fetchCoordinates(locationURL);
    }
  };
  // default on load
  useEffect(() => {
    const query = { lat: 1.2899175, lng: 103.8519072 };
    const defaultUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${query.lat}&lon=${query.lng}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
    fetchWeather(defaultUrl);
  }, []);

  return (
    <div>
      <h1 className="text-light">Today's Weather</h1>
      <div>
        <Form onSubmit={onSubmit} />
      </div>
      <div>{<ShowWeather weatherReport={data.weatherReport} />}</div>
      <div>
        <ShowHistory />
      </div>
    </div>
  );
}

export default App;
