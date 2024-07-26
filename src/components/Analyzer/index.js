import React, { useEffect } from "react";
import { performAnalysis } from "./Analyzer";

function Analyzer({ onComplete, data }) {
  useEffect(() => {
    async function handleAnalysis() {
      const result = await performAnalysis(data);
      onComplete(result);
    }

    handleAnalysis();
  }, [data]);

  return <div className="Analyzer"></div>;
}

export default Analyzer;
