import { useState } from "react";

// custom hook
import useFetch from "../useFetch";

const Form = () => {
  const [form, setForm] = useState({
    city: "",
    country: "",
  });

  const updateFormField = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="container">
      <form>
        <div className="row">
          <div className="col-12 col-md 4">
            <div className="input-group input-group mb-2">
              <span className="input-group-text" id="cityInput">
                City
              </span>
              <input
                type="text"
                name="city"
                className="form-control"
                aria-label="cityInput"
                aria-describedby="cityInput"
                onChange={updateFormField}
                value={form.city}
                placeholder="city (e.g Johor)"
              />
            </div>
          </div>
          <div className="col-12 col-md 4">
            <div className="input-group input-group mb-2">
              <span className="input-group-text" id="countryInput">
                Country
              </span>
              <input
                type="text"
                name="country"
                className="form-control"
                aria-label="countryInput"
                aria-describedby="countryInput"
                onChange={updateFormField}
                value={form.country}
                placeholder="city (e.g Malaysia)"
              />
            </div>
          </div>
          <div className="col-12 col-md 4">
            <button className="btn btn-sm btn-dark">Search</button>
            <button className="btn btn-sm btn-light ms-2">Clear</button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Form;
