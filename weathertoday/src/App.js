// Components
import Form from "./components/Form";
import ShowHistory from "./components/ShowHistory";
import ShowWeather from "./components/ShowWeather";

// Custom hook
import useFetch from "./useFetch";

// Styling
import "./scss/style.scss";
import { useState } from "react";

function App() {
  // api to get location coordinates
  const locationURL = `https://api.openweathermap.org/geo/1.0/direct?q=johor_bahru&limit=1&appid=${process.env.REACT_APP_API_KEY}`;

  const { data, isPending, error } = useFetch(locationURL);

  const [weatherReport, setWeatherReport] = useState({
    name: "-",
    country: "-",
    main: "-",
    description: "-",
    temp_min: "-",
    temp_max: "-",
    humidity: "-",
    time: "-",
    datetime: "-",
  });
  return (
    <div>
      <h1 className="text-light">Today's Weather</h1>
      <div>
        <Form />
      </div>
      <div>{data && <ShowWeather weatherReport={weatherReport} />}</div>
      <div>{error && <div>{error}</div>}</div>
      <div>
        <ShowHistory />
      </div>
    </div>
  );
}

export default App;
