import useFetch from "../useFetch";

const ShowWeather = () => {
  const query = {
    country: "MY",
    name: "Johor Bahru",
    lat: 1.503555,
    lng: 103.7495586,
  };

  const getDate = () => {
    var today = new Date();
    today = today.toLocaleString("en-US");
    today = today.replace(/\//g, "-");
    return today;
  };

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${query.lat}&lon=${query.lng}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

  const { data, isPending, error } = useFetch(url);

  return (
    <section className="container">
      <h1>Show Weather</h1>
      <div>{isPending && <div>Loading...</div>}</div>

      {data && (
        <div className="weather-content">
          <span>
            {query.name} {query.country}
          </span>
          <h3>{data.weather[0].main}</h3>
          <div className="row">
            {/* Description */}
            <div className="col-12">
              <div className="row">
                <div className="col-5">Description</div>
                <div className="col-7">{data.weather[0].description}</div>
              </div>
            </div>
            {/* Temperature */}
            <div className="col-12">
              <div className="row">
                <div className="col-5">Temperature</div>
                <div className="col-7">
                  {data.main.temp_min}&#8451; ~ {data.main.temp_max}&#8451;
                </div>
              </div>
            </div>
            {/* Humidity */}
            <div className="col-12">
              <div className="row">
                <div className="col-5">Humidity</div>
                <div className="col-7">{data.main.humidity}%</div>
              </div>
            </div>
            {/* Time */}
            <div className="col-12">
              <div className="row">
                <div className="col-5">Time</div>
                <div className="col-7">{getDate()}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default ShowWeather;
