const ShowWeather = (props) => {
  console.log(props);

  return (
    <section className="container">
      <h1>Show Weather</h1>
      <div className="weather-content">
        <span>
          {props.weatherReport.name} {props.weatherReport.country}
        </span>
        <h3>{props.weatherReport.main}</h3>
        <div className="row">
          {/* Description */}
          <div className="col-12">
            <div className="row">
              <div className="col-5">Description</div>
              <div className="col-7">{props.weatherReport.description}</div>
            </div>
          </div>
          {/* Temperature */}
          <div className="col-12">
            <div className="row">
              <div className="col-5">Temperature</div>
              <div className="col-7">
                {props.weatherReport.temp_min}&#8451; ~{" "}
                {props.weatherReport.temp_max}
                &#8451;
              </div>
            </div>
          </div>
          {/* Humidity */}
          <div className="col-12">
            <div className="row">
              <div className="col-5">Humidity</div>
              <div className="col-7">{props.weatherReport.humidity}%</div>
            </div>
          </div>
          {/* Time */}
          <div className="col-12">
            <div className="row">
              <div className="col-5">Time</div>
              <div className="col-7">{props.weatherReport.time}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ShowWeather;
