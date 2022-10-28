// Components
import Form from "./components/Form";
import ShowHistory from "./components/ShowHistory";
import ShowWeather from "./components/ShowWeather";

// Styling
import "./scss/style.scss";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [record, setRecord] = useState({
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
    searchHistory: [],
    form: { city: "", country: "" },
  });
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  // fetch data
  const fetchWeather = async (url, init = false) => {
    try {
      await axios
        .get(url)
        .then((response) => {
          const w = response.data;

          var newSearchHistory = [];
          init
            ? (newSearchHistory = [...record.searchHistory])
            : (newSearchHistory = [
                ...record.searchHistory,
                {
                  name: w.name,
                  country: w.sys.country,
                  time: getCurrentDate(),
                },
              ]);
          // save the weather and history
          setRecord({
            ...record,
            weatherReport: {
              name: w.name,
              country: w.sys.country,
              main: w.weather[0].main,
              description: w.weather[0].description,
              temp_min: w.main.temp_min,
              temp_max: w.main.temp_max,
              humidity: w.main.humidity,
              time: getCurrentDate(),
            },
            searchHistory: newSearchHistory,
          });
          setIsPending(false);
        })
        .catch((error) => {
          throw error;
        });
    } catch (e) {
      setError(e.toJSON().message);
    }
  };

  // get current time
  const getCurrentDate = () => {
    var today = new Date();
    today = today.toLocaleString("en-US");
    today = today.replace(/\//g, "-");
    return today;
  };

  const onSubmit = (form) => {
    console.log("submitted", form);
    // set query including city and country
    var query = "";
    if (form.city.length > 0 && form.country.length > 0) {
      query = `${form.city},${form.country}`;
    } else if (form.city.length > 0) {
      query = form.city;
    } else {
      query = form.country;
    }
    // process only if the there is content in both city and country
    if (query.length > 0) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
      fetchWeather(url);
    }
  };

  const clearHistory = () => {
    setRecord({
      ...record,
      searchHistory: [],
    });
  };
  // default on load
  useEffect(() => {
    const query = "singapore";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
    fetchWeather(url, true);
  }, []);

  return (
    <div>
      <div className="top-banner p-3">
        <strong>weatherToday</strong>
      </div>
      <div>
        <Form onSubmit={onSubmit} />
      </div>
      {/* Error message
      <div>
        {error && <span className="text-danger fst-italic">{error}</span>}
      </div> */}
      <div>{<ShowWeather weatherReport={record.weatherReport} />}</div>

      <div>
        <ShowHistory
          history={record.searchHistory}
          clearHistory={clearHistory}
        />
      </div>
    </div>
  );
}

export default App;
