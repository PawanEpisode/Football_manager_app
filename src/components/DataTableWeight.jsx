import React from 'react'

const DataTableWeight = ({weight}) => {
  return (
    <span>{weight !== "Unknown" ? `${weight} kg`: weight}</span>
  )
}

export default DataTableWeight