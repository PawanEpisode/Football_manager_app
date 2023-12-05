import React from 'react';
import JSZip from "jszip";

const DownloadButton = () => {
    const handleDownload = async () => {
      const zip = new JSZip();
  
      // Sample data for CSV files
      const csvData1 = "Name,Age\nJohn,25\nJane,30";
      const csvData2 = "City,Population\nNew York,8400000\nLos Angeles,3990000";
  
      // Add CSV files to the zip folder
      zip.file("data1.csv", csvData1);
      zip.file("data2.csv", csvData2);
  
      // Add existing files from your project folder
      const file1 = await fetch("/csv/playersAccurateField.csv").then((response) =>
        response.blob()
      );
      zip.file("playersAccurateField.csv", file1);
  
      const file2 = await fetch("/csv/playersMissingField.csv").then((response) =>
        response.blob()
      );
      zip.file("playersMissingField.csv", file2);
  
      // Generate the zip folder
      zip.generateAsync({ type: "blob" }).then((content) => {
        // Create a download link
        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = "data.zip";
  
        // Trigger the download
        document.body.appendChild(link);
        link.click();
  
        // Cleanup
        document.body.removeChild(link);
      });
    };
  
    return (
      <button onClick={handleDownload} className='px-4 py-2 bg-[#FEA013] rounded-lg'>
        Download ZIP Folder
      </button>
    );
  };

export default DownloadButton