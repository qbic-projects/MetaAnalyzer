import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import "./ExcelReader.css";

const ExcelReader = ({ onDataUploaded }) => {
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState([]);

  const onDrop = useCallback(
    (files) => {
      const file = files[0];

      if (!file) return;

      setUploading(true);

      const reader = new FileReader();
      reader.readAsBinaryString(file);

      reader.onload = (event) => {
        const binaryString = event.target.result;
        const workbook = XLSX.read(binaryString, { type: "binary" });
        const wsname = workbook.SheetNames[0];
        const ws = workbook.Sheets[wsname];

        // Get data as 2D array
        const rawData = XLSX.utils.sheet_to_json(ws, { header: 1 });

        // Extract headers from the second row
        const headers = rawData[1];

        // Transform the subsequent rows into objects
        const jsonData = rawData.slice(2).map((row) => {
          let obj = {};
          row.forEach((cell, index) => {
            obj[headers[index]] = cell;
          });
          return obj;
        });
        setData(jsonData); // Set the state here!

        if (onDataUploaded) {
          onDataUploaded({ data: jsonData, fileName: file.name });
        }

        setUploading(false);
      };

      reader.onerror = () => {
        console.error("Error reading the file.");
        setUploading(false);
      };
    },
    [onDataUploaded, setUploading, setData]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".xlsx, .xls",
  });

  return (
    <div>
      {data.length === 0 ? (
        <div {...getRootProps()} className="excel-reader">
          <input {...getInputProps()} />
          <p>Drag & drop Excel file here, or click to select file</p>
          {uploading && <p>Uploading...</p>}
        </div>
      ) : null}
      <br />
      {data.length > 0 ? <center>Analyzing . . .</center> : null}
      <br />
      <div>
        {data.length > 0 ? (
          <h3>Data: (Only the first 20 rows are shown)</h3>
        ) : null}
        <table>
          <thead>
            <tr>
              {data[0] &&
                Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 20).map((item, index) => (
              <tr key={index}>
                {Object.values(item).map((val, idx) => (
                  <td key={idx}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {data.length > 0 ? (
          <center>
            <h3>. . .</h3>
          </center>
        ) : null}
      </div>
    </div>
  );
};

export default ExcelReader;
