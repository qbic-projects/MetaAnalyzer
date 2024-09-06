import * as simsta from "simple-statistics";

export async function performAnalysis(data) {
  const listForStatisticsCalculation = [
    "Age",
    "Host height",
    "Host weight"
  ];
  const listForUniqueValues = [
    "Collected by",
    "Disorders",
    "Host name",
    "Chemical exposure"
  ];
  const listForOccurencesOfValues = [
    "Country",
    "State",
    "Sample site or feature",
    "Sample material",
    "Sex",
    "Host diet",
    "Phenotypical antimicrobial resistance"
  ];
  const listForTimeSpan = ["Collection Date"];
  // Process data
  let results = {};

  listForStatisticsCalculation.forEach((key) => {
    results[key] = analyzeDataOnKey(data, key);
  });

  listForUniqueValues.forEach((key) => {
    results[key] = listUniqueValuesFromData(data, key);
  });

  listForOccurencesOfValues.forEach((key) => {
    results[key] = countOccurrences(data, key);
  });

  listForTimeSpan.forEach((key) => {
    results[key] = calculateTimeRange(data.map((item) => item[key]));
  });
  return results;
}

function countOccurrences(data, key) {
  const occurrences = {};

  data.forEach((item) => {
    // Check if the key exists and if it is a string
    if (item[key] && typeof item[key] === "string") {
      // Split the string by ';' and trim whitespace from each item
      const values = item[key].split(";").map((value) => value.trim());
      // Count each individual value
      values.forEach((value) => {
        if (value) {
          // Check if the value is not an empty string after trimming
          occurrences[value] = (occurrences[value] || 0) + 1;
        }
      });
    }
  });

  return occurrences;
}

function listUniqueValuesFromData(data, key) {
  const uniqueValues = new Set();

  data.forEach((item) => {
    // Check if the key exists in the item
    if (item[key] && typeof item[key] === "string") {
      // Split the value by ';' and trim whitespace from each item
      const values = item[key].split(";").map((value) => value.trim());
      // Add each value to the Set
      values.forEach((value) => uniqueValues.add(value));
    }
  });

  return [...uniqueValues];
}

// Takes a List of values as input and calculates mean,
// median, std, q25, q75
function calculateStatistics(inputValues) {
  return {
    mean: simsta.mean(inputValues),
    median: simsta.median(inputValues),
    standardDeviation: simsta.standardDeviation(inputValues),
    q25: simsta.quantile(inputValues, 0.25),
    q75: simsta.quantile(inputValues, 0.75),
  };
}

function calculateTimeRange(dates) {
  if (dates.length === 0) {
    return 0;
  }

  // Convert the dates into Date objects and sort them
  let sortedDates = dates.map((date) => new Date(date)).sort((a, b) => a - b);

  // Get the earliest and latest dates
  let earliestDate = sortedDates[0];
  let latestDate = sortedDates[sortedDates.length - 1];

  // Calculate the difference in days
  let timeDiff = latestDate - earliestDate;
  let dayDiff = timeDiff / (1000 * 60 * 60 * 24);

  return {
    timeSpan: dayDiff + 1,
  }; // +1 to make the range inclusive of both start and end dates
}

function extractNumber(value) {
  return parseFloat(value.replace(/[^\d.-]/g, ""));
}

function convertAllAgesToYears(age, unit) {
  switch (unit) {
    case "y":
      return age; // Age is already in years
    case "m":
      return age / 12; // Convert months to years
    case "h":
      return age / (365 * 24); // Convert hours to years
    default:
      return age;
  }
}

function analyzeDataOnKey(data, key) {
  if (key === "Age") {
    const ages = data.map((entry) => {
      const value = extractNumber(entry[key]);
      const unit = entry[key].slice(-1);
      return convertAllAgesToYears(value, unit);
    });
    return calculateStatistics(ages);
  } else {
    const values = data.map((entry) => extractNumber(entry[key]));
    return calculateStatistics(values);
  }
}
