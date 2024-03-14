import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureHalf } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  const [celsius, setCelsius] = useState("");
  const [kelvin, setKelvin] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");

  const handleInputChange = (e, setterFunction) => {
    const value = e.target.value;
    // Regex to match only numbers or an empty string
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setterFunction(value);
    } else {
      alert("Please enter a valid number.");
    }
  };

  const handleCelsiusChange = (e) => {
    handleInputChange(e, setCelsius);
    const value = e.target.value !== "" ? parseFloat(e.target.value) : NaN;
    setKelvin(!isNaN(value) ? value + 273.15 : "");
    setFahrenheit(!isNaN(value) ? (value * 9) / 5 + 32 : "");
  };

  const handleKelvinChange = (e) => {
    handleInputChange(e, setKelvin);
    const value = e.target.value !== "" ? parseFloat(e.target.value) : NaN;
    setCelsius(!isNaN(value) ? value - 273.15 : "");
    setFahrenheit(!isNaN(value) ? ((value - 273.15) * 9) / 5 + 32 : "");
  };

  const handleFahrenheitChange = (e) => {
    handleInputChange(e, setFahrenheit);
    const value = e.target.value !== "" ? parseFloat(e.target.value) : NaN;
    setCelsius(!isNaN(value) ? ((value - 32) * 5) / 9 : "");
    setKelvin(!isNaN(value) ? ((value - 32) * 5) / 9 + 273.15 : "");
  };

  const handleClear = () => {
    setCelsius("");
    setKelvin("");
    setFahrenheit("");
  };

  return (
    <div className="container">
      <div className="app-container">
        <h1 className="title">
          Temperature Converter <FontAwesomeIcon icon={faTemperatureHalf} />
        </h1>
        <div className="converter-container">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="celsius-addon">
                C
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Celsius"
              aria-describedby="celsius-addon"
              value={celsius}
              onChange={handleCelsiusChange}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="kelvin-addon">
                K
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Kelvin"
              aria-describedby="kelvin-addon"
              value={kelvin}
              onChange={handleKelvinChange}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="fahrenheit-addon">
                F
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Fahrenheit"
              aria-describedby="fahrenheit-addon"
              value={fahrenheit}
              onChange={handleFahrenheitChange}
            />
          </div>
          <button className="btn btn-primary" onClick={handleClear}>
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
