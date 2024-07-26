import React, { useState, useEffect } from "react";
import ExcelReader from "./components/ExcelReader";
import Analyzer from "./components/Analyzer";
import { ExcelExporter } from "./components/ExcelExporter";

function App() {
  const [excelData, setExcelData] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [showAnalyzer, setShowAnalyzer] = useState(false);
  const [analysisCompleted, setAnalysisCompleted] = useState(false);
  const [analyzedData, setAnalyzedData] = useState(null);

  useEffect(() => {
    if (excelData !== null) {
      const timer = setTimeout(() => {
        setShowAnalyzer(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [excelData]);

  return (
    <div className="App">
      <center>
        <h1>DZIF Metadata Analyzer</h1>
      </center>
      {!showAnalyzer ? (
        <ExcelReader
          onDataUploaded={({ data, fileName }) => {
            setExcelData(data);
            setFileName(fileName);
          }}
        />
      ) : null}
      {!showAnalyzer ? null : (
        <Analyzer
          onComplete={(result) => {
            setAnalysisCompleted(true);
            setAnalyzedData(result);
          }}
          data={excelData}
        />
      )}
      {!analysisCompleted && showAnalyzer && <div>Analyzing . . .</div>}
      {analysisCompleted && (
        <div>
          <center>
            <h3>{fileName} was analyzed.</h3>
          </center>
          <div>
            <center>
              <RestartButton />{" "}
              <ExcelExporter
                data={excelData}
                result={analyzedData}
                fileName={fileName}
              />
            </center>
          </div>
          <br></br>
          <div>
            <center></center>
          </div>
          <AnalyzedDataTable data={analyzedData} />

          <br></br>
        </div>
      )}
    </div>
  );
}

function AnalyzedDataTable({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([key, value]) => {
          if (typeof value === "object" && !Array.isArray(value)) {
            // If value is an object (like statistical results), display each sub-key and sub-value
            return Object.entries(value).map(([subKey, subValue]) => (
              <tr key={`${key}-${subKey}`}>
                <td>
                  {key} ({subKey})
                </td>
                <td>{subValue}</td>
              </tr>
            ));
          } else {
            // If value is simple or an array, display it directly
            return (
              <tr key={key}>
                <td>{key}</td>
                <td>{Array.isArray(value) ? value.join(", ") : value}</td>
              </tr>
            );
          }
        })}
      </tbody>
    </table>
  );
}

function RestartButton() {
  const handleButtonClick = () => {
    const userConfirmation = window.confirm("Do you want to reload the site?");
    if (userConfirmation) {
      window.location.reload();
    }
  };

  return (
    <button
      style={{
        backgroundColor: "#e74c3c",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s",
      }}
      onClick={handleButtonClick}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      Restart Website
    </button>
  );
}

export default App;
