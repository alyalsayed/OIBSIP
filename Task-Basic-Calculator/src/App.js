import React, { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";

const Calculator = () => {
  const [display, setDisplay] = useState("");
  const [result, setResult] = useState("");

  const handleButtonClick = (value) => {
    setDisplay(display + value);
  };

  const handleCalculate = () => {
    try {
      let expression = display;
      if (expression.includes("%")) {
        expression = expression.replace(/([0-9.]+)%/g, "($1/100)");
      }
      const calculatedResult = eval(expression).toString();
      setResult("ans = " + calculatedResult);
    } catch (error) {
      setResult("Syntax Error");
    }
  };

  const handleClear = () => {
    setDisplay("");
    setResult("");
  };

  const handleBackspace = () => {
    setDisplay(display.slice(0, -1));
  };

  return (
    <div>
      <div className="calculator">
        <h2 className="header">Basic Calculator</h2>
        <div className="display">
          <div className="input-row">{display}</div>
          <div className="result-row">{result}</div>
        </div>
        <div className="buttons">
          <button className="btn-number btn-process" onClick={handleClear}>
            C
          </button>
          <button
            className="btn-process"
            onClick={() => handleButtonClick("/")}
          >
            ÷
          </button>
          <button
            className="btn-process"
            onClick={() => handleButtonClick("*")}
          >
            x
          </button>
          <button
            onClick={handleBackspace}
            className="btn-process backspace-icon"
          >
            <FontAwesomeIcon icon={faBackspace} />
          </button>
          <button className="btn-number" onClick={() => handleButtonClick("7")}>
            7
          </button>
          <button className="btn-number" onClick={() => handleButtonClick("8")}>
            8
          </button>
          <button className="btn-number" onClick={() => handleButtonClick("9")}>
            9
          </button>
          <button
            className="btn-process"
            onClick={() => handleButtonClick("-")}
          >
            -
          </button>
          <button className="btn-number" onClick={() => handleButtonClick("4")}>
            4
          </button>
          <button className="btn-number" onClick={() => handleButtonClick("5")}>
            5
          </button>
          <button className="btn-number" onClick={() => handleButtonClick("6")}>
            6
          </button>
          <button
            className="btn-process"
            onClick={() => handleButtonClick("+")}
          >
            +
          </button>
          <button className="btn-number" onClick={() => handleButtonClick("1")}>
            1
          </button>
          <button className="btn-number" onClick={() => handleButtonClick("2")}>
            2
          </button>
          <button className="btn-number" onClick={() => handleButtonClick("3")}>
            3
          </button>
          <button onClick={handleCalculate} className="double-row btn-process">
            =
          </button>
          <button className="btn-number" onClick={() => handleButtonClick("%")}>
            %
          </button>{" "}
          <button className="btn-number" onClick={() => handleButtonClick("0")}>
            0
          </button>
          <button className="btn-number" onClick={() => handleButtonClick(".")}>
            .
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
