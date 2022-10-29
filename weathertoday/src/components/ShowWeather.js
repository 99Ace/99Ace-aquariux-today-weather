const ShowWeather = (props) => {
  return (
    <section id="weather-content" className="container">
      <div className="row pt-md-5">
        <div className="col-12 col-md-7">
          <div className="weather-report ms-auto me-auto me-md-0 my-3 border">
            <div className="row">
              {/* Country detail and main weather forcast */}
              <div className="col-8">
                <div className="text-muted">
                  <img
                    src={`https://countryflagsapi.com/png/${props.weatherReport.country}`}
                    className="flag-icon-main me-2"
                    alt="country flag"
                  />
                  {props.weatherReport.name}, {props.weatherReport.country}
                </div>
                <h3>{props.weatherReport.main}</h3>
              </div>
              {/* Weather icon */}
              <div className="col-4">
                <img
                  src={`http://openweathermap.org/img/wn/${props.weatherReport.icon}@4x.png`}
                  alt="weather icon"
                  className="img-fluid rounded-circle border bg-light"
                />
              </div>
            </div>
            <table>
              <tbody>
                <tr>
                  <td className="text-muted">Description:</td>
                  <td>{props.weatherReport.description}</td>
                </tr>
                <tr>
                  <td className="text-muted">Temperature:</td>
                  <td>20&#8451; ~ 23&#8451;</td>
                </tr>
                <tr>
                  <td className="text-muted">Humidity:</td>
                  <td>{props.weatherReport.humidity}%</td>
                </tr>
                <tr>
                  <td className="text-muted">Time:</td>
                  <td>{props.weatherReport.time}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ShowWeather;
