import React from "react";
import { PlayerTableColumnName } from "../constants/constants";
import NameFlag from "./NameFlag";
import DataTableHeight from "./DataTableHeight";
import DataTableWeight from "./DataTableWeight";
import ActionButton from "./ActionButton";

const DataTable = ({ data }) => {
    const applyWidth = (key) => key === "Player Name" ? "w-[200px]" : "w-[100px]";
  return (
    <div className="w-full">
      <table className="w-full relative">
        <thead className="sticky z-10 top-0 bg-[#222]">
          <tr
            key={"header"}
            className="w-full flex gap-6 px-5 py-3 justify-start items-center"
          >
            {PlayerTableColumnName.map((key) => {
              
              return (
                <th
                  key={key}
                  className={`text-[#CBCBCB] 
                text-xs font-medium text-left ${key !== "Action Button" && applyWidth(key)}`}
                >
                  {key === 'Action Button' ? "": key}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {data?.map((item) => (
            <tr
              key={item?._id}
              className="w-full flex gap-6 px-5 py-3 justify-start items-center"
            >
              {PlayerTableColumnName.map((val, index) => {
                let content;
                switch (val) {
                  case "Player Name":
                    content = <NameFlag name={item[val]} imgUrl={item["Flag Image"]} />;
                    break;
                  case "Height":
                    content = <DataTableHeight height={item[val]} />;
                    break;
                  case "Weight":
                    content = <DataTableWeight weight={item[val]} />;
                    break;
                  case "Action Button":
                    content = <ActionButton data={item}/>;
                    break;
                  default:
                    content = item[val];
                    break;
                }
                return (
                    <td
                      key={index}
                      className={`text-[#cbcbcb] ${ val !== 'Action Button' && applyWidth(val)}
                text-sm font-medium text-left`}
                    >
                      {content}
                    </td>
                  );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
