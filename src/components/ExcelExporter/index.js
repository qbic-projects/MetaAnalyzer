import React from "react";
import "./ExcelExporter.css";
import * as XLSX from "xlsx";

export const ExcelExporter = ({ data, result, fileName }) => {
  // Remove the file extension
  fileName = fileName.replace(/\.[^/.]+$/, "");

  let exportFileNameReport = fileName + "_report.xlsx";

  const handleExport = () => {
    if (data && data.length < 25) {
      // If the number of samples is below 25, show the warning and ask for confirmation to reload
      if (
        window.confirm(
          "Warning: The sample size is below 25. Please reload the site and enter data with a sample size of at least 25. Would you like to reload the site?"
        )
      ) {
        window.location.reload();
      }
    } else {
      // Proceed with the export logic if the sample size is sufficient

      const sampleSize = data.length;
      const keysToAnalyze = [
        "Country",
        "State",
        "Sample site or feature",
        "Sample material",
        "Sex",
        "Host diet",
        "Phenotypical antimicrobial resistance",
      ];

      const analyzedData = analyzeData(result, keysToAnalyze, sampleSize);

      const primaryHeaders = [];
      const subHeaders = [];
      const values = [];

      // Iterate through each primary key to construct headers and values
      Object.entries(analyzedData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          for (const element of value) {
            primaryHeaders.push(key);
            subHeaders.push(element);
            values.push("");
          }
        } else if (typeof value === "object") {
          Object.entries(value).forEach(([subKey, subValue]) => {
            primaryHeaders.push(key);
            subHeaders.push(subKey);
            values.push(subValue);
          });
        } else {
          primaryHeaders.push(key);
          subHeaders.push(value);
          values.push("");
        }
      });

      const flatData = [];
      flatData.push(primaryHeaders);
      flatData.push(subHeaders);
      flatData.push(values);

      const ws = XLSX.utils.aoa_to_sheet(flatData);

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Data");

      // Export the technical metadata, specified keys are the ones excluded from export
      const specifiedKeys = new Set([
        "Collection Date",
        "Collected by",
        "Country",
        "State",
        "Sample site or feature",
        "Sample material",
        "Site conditions",
        "Material conditions",
        "Chemical exposure",
        "Host name",
        "Host height",
        "Host weight",
        "Age",
        "Sex",
        "Host diet",
        "Phenotypical antimicrobial resistance",
        "Disorders",
      ]);

      const newData = data.map((item) => {
        const newItem = {};
        for (const [key, value] of Object.entries(item)) {
          if (!specifiedKeys.has(key)) {
            newItem[key] = value;
          }
        }
        return newItem;
      });

      const worksheet = XLSX.utils.json_to_sheet(newData);

      // Append the worksheet to the workbook
      XLSX.utils.book_append_sheet(wb, worksheet, "Technical Metadata");

      // Write the workbook to an Excel file
      XLSX.writeFile(wb, exportFileNameReport);
    }
  };

  return (
    <button
      className="export-btn"
      onClick={handleExport}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      Export
    </button>
  );
};

function analyzeData(data, keysToCheck, sampleSize) {
  keysToCheck.forEach((key) => {
    if (
      data[key] &&
      typeof data[key] === "object" &&
      !Array.isArray(data[key])
    ) {
      let invalidateAll = false;

      // First pass to determine if any subkey falls outside the percentage range
      Object.keys(data[key]).forEach((subKey) => {
        const percentage = (data[key][subKey] / sampleSize) * 100;
        if (percentage < 10 || percentage > 90) {
          invalidateAll = true; // Set the flag to invalidate all subkeys
        }
      });

      // Second pass to set all subkeys to null if the invalidate flag is true
      if (invalidateAll) {
        Object.keys(data[key]).forEach((subKey) => {
          data[key][subKey] = null;
        });
      }
    }
  });

  return data;
}
