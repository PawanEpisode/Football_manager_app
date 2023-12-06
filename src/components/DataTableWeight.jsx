import React from "react";

const DataTableWeight = ({ value }) => {
  return <span>{value !== "Unknown" ? `${value} kg` : value}</span>;
};

export default DataTableWeight;
