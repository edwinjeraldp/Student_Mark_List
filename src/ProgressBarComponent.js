import React from "react";
import { useState } from "react";
import "./progress.css";

function ProgressBarComponent({ dataToPass }) {
  const [inputState, setInputState] = useState("");
  const [viewOutput, setViewOutput] = useState([]);

  let colorPickObject = {
    green: "bg-success",
    blue: "bg-info",
    yellow: "bg-warning",
    red: "bg-danger"
  };

  const handleRequestFromJson = () => {
    // 90% is Success - should be in green with % of progress shown
    // 70% is Average - should be in blue with % of progress shown
    //50% is Pass - should be in yellow with % of progress shown
    //Below 30% is fail - should be in red with % of progress shown

    let filteredData = dataToPass.filter((e) => {
      return e.id == inputState;
    });
    filteredData.forEach((e) => {
      e.totalPercentage = (e.maths + e.english + e.biology + e.chemistry) / 4;
      e.colorClassNameFromBootStrap =
        e.totalPercentage > 90
          ? colorPickObject["green"]
          : e.totalPercentage > 70 && e.totalPercentage < 90
          ? colorPickObject["blue"]
          : e.totalPercentage > 50 && e.totalPercentage < 70
          ? colorPickObject["yellow"]
          : e.totalPercentage < 30
          ? colorPickObject["red"]
          : "";
    });
    setViewOutput(filteredData);
  };

  return (
    <div>
      <div className="studentinputField">
        <input
          onChange={(e) => {
            setInputState(e.target.value);
          }}
        ></input>
        <button onClick={handleRequestFromJson}>Get Data From Server </button>
      </div>
      <div className="containerForStudentMarks">
        {viewOutput.map((e) => (
          <div className="studentMarksContainer">
            <h1>Maths : </h1>
            <input readonly value={e.maths + "%"} className="center" />

            <h1>English : </h1>
            <input readonly value={e.english + "%"} className="center" />

            <h1>Biology : </h1>
            <input readonly value={e.biology + "%"} className="center" />

            <h1>Chemistry : </h1>
            <input readonly value={e.chemistry + "%"} className="center" />

            <div className="totalContainer">
              <h1>Total Percentage : {e.totalPercentage + "%"}</h1>

              <div className="progress">
                <div
                  className={`progress-bar ${e.colorClassNameFromBootStrap}`}
                  role="progressbar"
                  style={{ width: e.totalPercentage + "%" }}
                  aria-valuenow={e.totalPercentage.toString()}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {e.totalPercentage}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressBarComponent;
