// packages
import { ReactSession } from "react-client-session";

// Components
import Form from "./components/forms/Form";
import ShowHistory from "./components/ShowHistory";
import ShowWeather from "./components/ShowWeather";

// Styling
import "./scss/style.scss";
import { useState, useEffect } from "react";
import axios from "axios";

// Session
ReactSession.setStoreType("localStorage");

function App() {
  // State variables
  const [record, setRecord] = useState({
    username: null,
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
  const [error, setError] = useState(null);
  const [tracker, setTracker] = useState(false);

  // function: fetch weather data from api, save data or error if any
  const fetchWeather = async (url, init = false) => {
    try {
      await axios
        .get(url)
        .then((response) => {
          const w = response.data;
          const newWeatherReport = {
            name: w.name,
            country: w.sys.country,
            main: w.weather[0].main,
            description: w.weather[0].description,
            temp_min: w.main.temp_min,
            temp_max: w.main.temp_max,
            humidity: w.main.humidity,
            icon: w.weather[0].icon,
            time: getCurrentDate(),
          };
          // if user not initialise
          if (!record.username) {
            const userData = ReactSession.get("userData");
            // save the weather + history from session
            setRecord({
              ...record,
              username: userData.username,
              weatherReport: newWeatherReport,
              searchHistory: userData.searchHistory,
            });
          } else {
            // create a copy of the search result
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
              weatherReport: newWeatherReport,
              searchHistory: newSearchHistory,
            });
            // save to session
            const userData = {
              username: record.username,
              searchHistory: newSearchHistory,
            };
            ReactSession.set("userData", userData);
          }
        })
        .catch((error) => {
          throw error;
        });
    } catch (e) {
      setError("Sorry, No result found");
    }
  };

  // function: get current time
  const getCurrentDate = () => {
    var today = new Date();
    today = today.toLocaleString("en-US");
    today = today.replace(/\//g, "-");
    return today;
  };
  // function: handle form detail and sent for search
  const onSubmit = (form) => {
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
  // function: clear search history
  const clearHistory = () => {
    setRecord({
      ...record,
      searchHistory: [],
    });
    // save to session
    const userData = {
      username: record.username,
      searchHistory: [],
    };
    ReactSession.set("userData", userData);
  };
  // function: clear a specific search history
  const removeHistory = (index) => {
    const modifiedSearchHistory = [
      ...record.searchHistory.slice(0, index),
      ...record.searchHistory.slice(index + 1),
    ];
    setRecord({
      ...record,
      searchHistory: modifiedSearchHistory,
    });
  };
  // function: Show or hide form
  const showHideForm = () => {
    console.log(tracker);
    setTracker(!tracker);
  };

  // Loading : Mount default Singapore weather, load user from session if any
  useEffect(() => {
    const query = "singapore";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
    var userData = ReactSession.get("userData");
    if (!userData) {
      userData = {
        username: "Ace",
        searchHistory: [],
      };
      ReactSession.set("userData", userData);
    }
    fetchWeather(url, true);
  }, []);

  return (
    <div className="wrapper-main">
      {/* Top Banner */}
      <div className="bg-color-1 p-3 d-flex align-item-center">
        <strong>
          WeatherT<i className="fa-solid fa-sun"></i>day
        </strong>
        <div className="ms-auto text-light">
          <span>{record.username}</span>
          <i className="fa-solid fa-user ms-2"></i>
        </div>
      </div>

      {/* Weather Display */}
      <div>{<ShowWeather weatherReport={record.weatherReport} />}</div>

      {/* Error Display else normal banner */}
      <div className="text-center py-1 bg-color-1 position-relative">
        {error ? (
          <small className="text-light fst-italic">
            <span className="text-danger">**</span>
            &nbsp;{error}&nbsp;
            <span className="text-danger">**</span>
          </small>
        ) : (
          <small>&nbsp;</small>
        )}
        <div className="trigger" onClick={showHideForm}>
          <i className="fa-solid fa-magnifying-glass"></i>
          {tracker ? (
            <i className="fa-solid fa-angles-down ms-2"></i>
          ) : (
            <i className="fa-solid fa-angles-up ms-2"></i>
          )}
        </div>
      </div>

      {/* Form */}

      <div >
        <Form onSubmit={onSubmit} tracker={tracker} />
      </div>

      {/* History Display */}
      <div>
        <ShowHistory
          history={record.searchHistory}
          clearHistory={clearHistory}
          removeHistory={removeHistory}
          fetchWeather={fetchWeather}
        />
      </div>

      {/* Footer   */}
      <footer className="bg-dark text-light p-2">
        <small>
          <em>@99ace-assignment2022</em>
        </small>
      </footer>
    </div>
  );
}

export default App;
