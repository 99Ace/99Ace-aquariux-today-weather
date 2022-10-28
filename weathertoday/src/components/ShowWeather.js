const ShowWeather = (props) => {
  console.log(props);

  return (
    <section id="weather-content" className="container">
      <div className="row">
        <div
          className="col-12 col-md-5 order-md-1 d-flex 
                        justify-content-center justify-content-md-start 
                        align-items-center"
        >
          <i
            className="fa-solid fa-su
                    n text-warning"
          ></i>
          <i className="fa-solid fa-cloud-showers-heavy"></i>
          <i className="fa-solid fa-cloud-moon-rain text-dark"></i>
          <i className="fa-solid fa-cloud-bolt text-warning"></i>
          <i className="fa-solid fa-cloud-sun"></i>
          <i className="fa-solid fa-cloud-moon"></i>
          <i className="fa-solid fa-cloud text-light weather-icon"></i>
          <i className="fa-regular fa-snowflake text-light"></i>
        </div>
        <div className="col-12 col-md-7">
          <div className="weather-report ms-md-auto">
            <div className="text-muted">
              <img
                src={`https://countryflagsapi.com/png/${props.weatherReport.country}`}
                className="flag-icon-main me-2"
                alt="country flag"
              />
              {props.weatherReport.name}, {props.weatherReport.country}
            </div>
            <h3>{props.weatherReport.main}</h3>
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
