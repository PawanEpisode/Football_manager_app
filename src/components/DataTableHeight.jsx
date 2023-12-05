import React from 'react'

const DataTableHeight = ({height}) => {
  return (
    <span>{height !== 'Unknown' ? `${(height/100).toFixed(2)} m`: height}</span>
  )
}

export default DataTableHeight;