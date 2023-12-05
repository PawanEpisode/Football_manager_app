import React, { useState } from "react";
import ReactDOM from "react-dom";
import close from "../assets/close.png";
import { useDispatch, useSelector } from 'react-redux';
import { setPlayerData } from "../redux/playerSlice";

const MODAL_STYLES = {
  position: "fixed",
  top: "46%",
  left: "52%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#2D2D2D",
  padding: "24px",
  zIndex: 1000,
  width: "800px",
  height: "600px",
  borderRadius: "8px",
  boxShadow: "0px 2px 12px 0px rgba(22, 22, 22, 0.50)",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  zIndex: 1000,
};

const fileData = {
  "Total Players": 0,
  "Goalkeepers": 0,
  "Defenders": 0,
  "Midfielders": 0,
  "Forwards": 0
}

const Modal = ({ open, onClose }) => {

  const dispatch = useDispatch();
  const { playerData } = useSelector(state => state.player);

  const [file, setFile] = useState();
  const [error, setError] = useState(false);
  const [fileSummary, setFileSummary] = useState(null);

  if (!open) return null;

  const fileReader = new FileReader();

  const getNewValues = (values) => {
    const startIndex = values.findIndex((item) => item.includes("https"));

    // Find the ending index with "cropmode"
    const endIndex = values.findIndex((item) => item.includes("mode"));

    // Concatenate values from startIndex to endIndex
    const imageUrl = values
      .slice(startIndex, endIndex + 1)
      .map((item) => item.replace(/^"|"$/g, ""))
      .join(",");
    const NewValues = [values[0], imageUrl, ...values.slice(endIndex + 1)];
    return NewValues;
  };

  const getHeaderAndRows = (text) => {
    const csvHeader = text.slice(0, text.indexOf("\n")).split(",");
    const csvRows = text.slice(text.indexOf("\n") + 1).split("\n");
    return {
      csvHeader,
      csvRows
    }
  }

  const getFileSummary =(csvRows) => {
    
    const fileDataSummary = csvRows.reduce((acc,current) => {
      const NewValues = getNewValues(current.split(','));
      switch(NewValues[3]) {
        case "Goalkeeper":
            return {
              ...acc,
              ["Goalkeepers"]: acc["Goalkeepers"] +1
            }
        case "Midfielder":
          return {
            ...acc,
            ["Midfielders"]: acc["Midfielders"] +1
          }
        case "Forward":
          return {
            ...acc,
            ["Forwards"]: acc["Forwards"] +1
          }
        case "Defender":
          return {
            ...acc,
            ["Defenders"]: acc["Defenders"] +1
          }
        default:
          return acc;
      }
    },fileData);

    return {
      ...fileDataSummary,
      ["Total Players"]: csvRows.length
    }
  
  }

  const handleOnChange = (e) => {
    const fileInput = e.target;
    const mainfile = fileInput.files[0];
    setFile(mainfile);

    if (mainfile) {
      const fileReader = new FileReader();

      fileReader.onload = function (event) {
        const text = event.target.result;

        const { csvHeader, csvRows } = getHeaderAndRows(text);

        const array = csvRows?.filter((rowitem, i) => {
          const NewValues = getNewValues(rowitem.split(","));
          // console.log("value",rowitem,NewValues,csvHeader,NewValues.length,csvHeader.length)
          if (NewValues.length !== csvHeader.length) {
            console.log(
              `Row ${i + 1} does not have the expected number of cells.`
            );
            // if rowitem is string having no length, so returning 'rowitem' instead
            return !rowitem.length ? "rowitem": rowitem;
          }

          for (let j = 0; j < NewValues.length; j++) {
            if (NewValues[j].trim() === "") {
              console.log(
                `Cell at row ${i + 1}, column ${csvHeader[j]} is empty.`
              );
              return rowitem;
            }
          }
        });

        const fileSummaryData = getFileSummary(csvRows); 
        if (array.length) {
          setFileSummary(null);
          setError(true);
        } else {
          setFileSummary(fileSummaryData);
          setError(false);
        }
      };

      fileReader.readAsText(mainfile);
    }
  };

  const csvFileToArray = (string) => {
    const { csvHeader, csvRows } = getHeaderAndRows(string);

    const array = csvRows.map((i) => {
      const NewValues = getNewValues(i.split(","))

      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = NewValues[index];
        return object;
      }, {});
      obj._id = JSON.stringify(NewValues);
      return obj;
    });
    console.log(array);
    if(playerData) {
      dispatch(setPlayerData(null))
    }
    dispatch(setPlayerData(array));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={onClose} />
      <div style={MODAL_STYLES}>
        <div className="flex justify-between items-center border-[#494949] border-b-2 py-4 mb-6">
          <p className="text-[#f8f8f8] font-semibold text-lg">Importer</p>
          <button onClick={onClose}>
            <img src={close} />
          </button>
        </div>

        <div className="flex flex-col justify-center items-start">
          <span className="text-[#f8f8f8] text-sm font-medium mb-2">
            Roster File
          </span>
          <form className="w-full">
            <div className="flex flex-col w-full h-[420px] justify-between">
              <div className="flex flex-col h-fit">
                <div
                  className={`flex justify-between items-start 
                gap-2.5 border ${
                  error ? "border-[#D23131]" : "border-[#494949]"
                } rounded-lg 
                pl-4 w-[300px] mb-4`}
                >
                  <div
                    className="text-[#999] text-sm 
                  font-normal py-3 truncate ..."
                  >
                    {file ? file?.name : "No file Chosen"}
                  </div>
                  <input
                    type={"file"}
                    id={"csvFileInput"}
                    accept={".csv"}
                    onChange={handleOnChange}
                    className=""
                    hidden
                  />
                  <label
                    htmlFor="csvFileInput"
                    className={`text-[#cbcbcb] text-sm font-medium 
                  rounded-lg ${
                    error ? "border-[#D23131]" : "border-[#494949]"
                  } border px-5 py-3 w-[120px]`}
                  >
                    Select File
                  </label>
                </div>

                {!error && (
                  <>
                    <p className="text-[#999] text-sm font-normal mb-8">
                      File must be in .csv format
                    </p>

                    {file && fileSummary && (
                        <>
                          <p className="text-[#f8f8f8] text-sm font-medium mb-6">File Summary</p>
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between gap-20">
                              {Object.keys(fileSummary).map((item,index) => (
                                <p key={index} className="text-left w-25 text-[#cbcbcb] text-sm font-normal">{item}</p>
                              ))}
                            </div>
                            <div className="flex justify-between gap-20">
                              {Object.values(fileSummary).map((item,index) => (
                                <p key={index} className="text-left w-25 text-[#cbcbcb] text-base font-semibold">{item}</p>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                  </>
                )}

                {error && (
                  <>
                    <p
                      className="text-[#D23131] text-sm 
                      font-medium mb-2"
                    >
                      Error
                    </p>

                    <p className="text-[#cbcbcb] text-sm font-normal">
                      Your sheet is missing data. Please ensure all cells are
                      filled out.
                    </p>
                  </>
                )}
              </div>

              <div className="flex justify-end w-full">
                <button
                  disabled={!(!error && file)}
                  onClick={(e) => {
                    handleOnSubmit(e);
                  }}
                  className={`px-5 py-3 rounded-lg text-sm font-medium ${
                    !(!error && file)
                      ? "text-[#707070] bg-[#2d2d2d]"
                      : "text-[#f8f8f8] bg-[#FEA013]"
                  }`}
                >
                  Import
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
