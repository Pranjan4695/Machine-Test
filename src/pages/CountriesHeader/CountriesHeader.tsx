import React, { useState } from "react";
import "./CountriesHeader.css";

const CountriesHeader = () => {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Asia", "Europe"];

  return (
    <div className="d-flex justify-content-between align-items-center w-100 countries-header mt-5">
      <h4 className="fw-bold mb-0">Countries</h4>
      <div className="d-flex gap-4 country-tabs">
        {tabs.map((tab) => (
          <span
            key={tab}
            className={`tab-item ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}>
            {tab}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CountriesHeader;
