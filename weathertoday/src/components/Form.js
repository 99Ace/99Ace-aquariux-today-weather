import { useState } from "react";

const Form = (props) => {
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
    <div id="weather-search" className="container p-2">
      <div className="weather-form border">
        {/* input fields */}
        <div className="d-md-flex justify-content-evenly gap-2">
          <div className="input-group mb-3">
            <span className="input-group-text" id="city">
              City
            </span>
            <input
              type="text"
              className="form-control"
              name="city"
              placeholder="city (e.g Hanoi)"
              aria-label="city-input"
              aria-describedby="city"
              onChange={updateFormField}
              value={form.city}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="country">
              Country
            </span>
            <input
              type="text"
              className="form-control"
              name="country"
              placeholder="country (e.g Vietnam)"
              aria-label="country-input"
              aria-describedby="country"
              onChange={updateFormField}
              value={form.country}
            />
          </div>
        </div>

        {/* buttons */}
        <button
          className="btn btn-sm btn-dark"
          onClick={() => {
            props.onSubmit(form);
            setForm({
              city: "",
              country: "",
            });
          }}
        >
          Search
        </button>
        <button
          className="btn btn-sm btn-light ms-2"
          onClick={() => {
            setForm({
              city: "",
              country: "",
            });
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
};
export default Form;
