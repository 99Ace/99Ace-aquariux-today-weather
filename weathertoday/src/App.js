import Form from "./components/Form";
import ShowHistory from "./components/ShowHistory";
import ShowWeather from "./components/ShowWeather";
import "./scss/style.scss";

function App() {
  return (
    <div>
      <h1 className="text-light">Today's Weather</h1>
      <div>
        <Form />
      </div>
      <div>
        <ShowWeather />
      </div>
      <div>
        <ShowHistory />
      </div>
    </div>
  );
}

export default App;
