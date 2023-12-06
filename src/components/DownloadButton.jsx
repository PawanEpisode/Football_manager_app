import React from "react";
import JSZip from "jszip";
import CommonButtonWithText from "./CommonButtonWithText";

const DownloadButton = () => {
  const handleDownload = async () => {
    const zip = new JSZip();

    // Add existing files from your project folder
    const file1 = await fetch("/csv/playersAccurateField.csv").then(
      (response) => response.blob()
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
      link.download = "PlayersCSVData.zip";

      // Trigger the download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
    });
  };

  return (
    <CommonButtonWithText
      onClick={handleDownload}
      title="Download ZIP Folder"
    />
  );
};

export default DownloadButton;
