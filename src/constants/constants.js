export const PlayerTableColumnName = [
  "Player Name",
  "Jersey Number",
  "Starter",
  "Position",
  "Height",
  "Weight",
  "Nationality",
  "Appearances",
  "Minutes Played",
  "Action Button",
];

export const PositionOptions = [
  "Goalkeeper",
  "Defender",
  "Midfielder",
  "Forward",
];

export const getNationalityOptions = (playerData) => {
  const uniqueSet = new Set();
  playerData.forEach((element) => {
    uniqueSet.add(element["Nationality"]);
  });

  return [...uniqueSet];
};

export const isTwoObjectDiffer = (obj1, obj2) => {
  if (obj1 === obj2) return true;

  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false;

    return obj1.every((elem, index) => {
      return isTwoObjectDiffer(elem, obj2[index]);
    });
  }

  if (
    typeof obj1 === "object" &&
    typeof obj2 === "object" &&
    obj1 !== null &&
    obj2 !== null
  ) {
    if (Array.isArray(obj1) || Array.isArray(obj2)) return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (
      keys1.length !== keys2.length ||
      !keys1.every((key) => keys2.includes(key))
    )
      return false;

    for (let key in obj1) {
      let isEqual = isTwoObjectDiffer(obj1[key], obj2[key]);
      if (!isEqual) {
        return false;
      }
    }

    return true;
  }

  return false;
};

export const getCustomPlayerInfo = (player) => {
  return {
    ["Player Name"]: player["Player Name"],
    ["Jersey Number"]: player["Jersey Number"],
    ["Height"]: player["Weight"],
    ["Nationality"]: player["Nationality"],
    ["Position"]: player["Position"],
    ["Starter"]: player["Starter"],
  };
};

export const convertToCorrectLink = (wrongLink) => {
  // Define the pattern for the wrong link
  const pattern = /\/media\/(\d+)\/card_(\d+-\d+)_(.+)\.png/;

  // Extract values from the wrong link using the pattern
  const match = wrongLink?.match(pattern);

  if (match) {
    const [, id, date, name] = match;

    // Create the correct link using the extracted values
    const correctLink1 = `https://www.psg.fr/media/${id}/cards-23-24_${name}-alt.png`;
    const correctLink2 = `https://www.psg.fr/media/${id}/cards-23-24_${name}.png`;

    return [correctLink1,
        correctLink2];
  }
};

export const getPlayerDataCategoryPosition = ( data ) => {
    const position = {
        "Goalkeeper": [],
        "Defender": [],
        "Midfielder": [],
        "Forward": [],
    }

    const updatePositionedPlayer =(acc, position, curr) => {
        let temp = acc[position];
                temp = [...temp, curr];
                return {
                    ...acc,
                    [position]: temp
                }
    }
    const temp = data?.reduce((acc, curr) => {
        switch(curr["Position"]) {
            case "Goalkeeper":
                return updatePositionedPlayer(acc,"Goalkeeper",curr)
            case "Defender": 
            return updatePositionedPlayer(acc,"Defender",curr)
            case "Midfielder":
                return updatePositionedPlayer(acc,"Midfielder",curr)
            case "Forward":
                return updatePositionedPlayer(acc,"Forward",curr)
            default:
                return acc;
        }
    }, position)
    return temp;
}

export const getErrorMessage = (countStarters) => {
    return {
        title:
          countStarters < 11
            ? "Not enough starters"
            : countStarters > 11 && "There are too many starters",
        subtitle:
          countStarters < 11
            ? "Your team doesn’t have enough starters for one or more of the positions in the 4-3-3 formation"
            : countStarters > 11 &&
            "Your team has too many starters for one or more of the positions in the 4-3-3 formation.",
    }
}


