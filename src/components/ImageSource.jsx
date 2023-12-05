import React, { useEffect, useMemo, useState } from "react";
import footbal from "../assets/football.png";
import { convertToCorrectLink } from "../constants/constants";

const ImageSource = ({ imgUrl, altText }) => {
  const tempImageUrl = useMemo(() => {
    return convertToCorrectLink(imgUrl?.split("?")?.[0]);
  }, [imgUrl]);

  const [sourceURL, setSourceURL] = useState(tempImageUrl?.[0]);

  useEffect(() => {
    setSourceURL(tempImageUrl?.[0]);
  }, [imgUrl, tempImageUrl]);

  const handleImageSource = () => {
    if (sourceURL === tempImageUrl[0]) {
      setSourceURL(tempImageUrl[1]);
    } else {
      setSourceURL(footbal);
    }
  };
  return (
    <img
      className="background-player w-[300px] h-[220px]"
      src={sourceURL}
      alt={altText}
      onError={handleImageSource}
    />
  );
};

export default ImageSource;
