import React from "react";

const RosterDetails = ({ features }) => {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-lg text-[#cbcbcb] font-semibold">
        This section includes features for managing your roster:
      </p>
      <ul className="flex flex-col gap-5">
        {features.map((feature, index) => (
          <li key={index}>
            <strong className="text-[#fea013]">{feature.title}</strong>
            <p className="text-lg text-[#fff] font-normal">
              {feature.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RosterDetails;
