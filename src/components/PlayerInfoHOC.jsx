import React from 'react'

const PlayerInfoHOC = (WrappedComponent) => {
  // The returned component
    return function DataTableFormattedComponent({ label, value }) {
        return (
        <div className="flex flex-col gap-2 justify-center items-start">
            <span className="text-xs font-normal text-[#cbcbcb]">{label}</span>
            <WrappedComponent value={value} />
        </div>
        );
    };
}

export default PlayerInfoHOC;