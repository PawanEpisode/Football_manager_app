import React from "react";

const DataTableHeight = ({ value }) => {
  return (
    <span>
      {value !== "Unknown" ? `${(value / 100).toFixed(2)} m` : value}
    </span>
  );
};

export default DataTableHeight;
