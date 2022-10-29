const ShowHistory = (props) => {
  return (
    <>
      <section
        id="weather-history"
        className={props.tracker ? "container" : "ht-hidecontainer"}
      >
        <table className="table">
          <thead>
            <tr>
              <th scope="col" colSpan="3">
                <strong>Search History</strong>
              </th>
              <th className="text-end">
                <button
                  className="badge bg-muted border-0 text-secondary"
                  onClick={props.clearHistory}
                >
                  clear history
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {props.history.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">
                  <em>-- No records --</em>
                </td>
              </tr>
            ) : (
              props.history.map((i, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={`https://countryflagsapi.com/png/${i.country}`}
                        className="flag-icon me-1"
                        alt="country flag"
                      />
                      {i.name}, {i.country}
                    </td>
                    <td className="text-end fs-time">
                      {i.time.slice(11, 14) + i.time.slice(17)}
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm"
                        onClick={() => {
                          const url = `https://api.openweathermap.org/data/2.5/weather?q=${i.name}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
                          props.fetchWeather(url);
                        }}
                      >
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                      <button
                        className="btn btn-sm"
                        onClick={() => {
                          props.removeHistory(index);
                        }}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};
export default ShowHistory;
