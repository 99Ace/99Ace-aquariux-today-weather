// Components
import Form from "./components/Form";
import ShowHistory from "./components/ShowHistory";
import ShowWeather from "./components/ShowWeather";

// Custom hook
import useFetch from "./useFetch";

// Styling
import "./scss/style.scss";

function App() {
  const locationURL = `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={${process.env.REACT_APP_API_KEY}}"`;

  // temp use of api as openweather api not ready
  const testURL = "https://api.data.gov.sg/v1/environment/air-temperature";

  const { data, isPending, error } = useFetch(testURL);

  return (
    <div>
      <h1 className="text-light">Today's Weather</h1>
      <div>
        <Form />
      </div>
      <div>{data && <ShowWeather data={data} />}</div>
      <div>{isPending && <div>Loading...</div>}</div>
      <div>{error && <div>{error}</div>}</div>
      <div>
        <ShowHistory />
      </div>
    </div>
  );
}

export default App;
