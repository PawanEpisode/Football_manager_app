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

export const INITIAL_FILE_DATA = {
  "Total Players": 0,
  "Goalkeepers": 0,
  "Defenders": 0,
  "Midfielders": 0,
  "Forwards": 0
}

export const PLAYER_CARD_DETAILS = [
  {
    title: "Goalkeeper",
    className: "p-4 w-[160px] h-full flex justify-center items-center"
  },
  {
    title: "Defender",
    className: "py-6 w-[240px] -ml-20 h-full flex flex-col justify-between items-center"
  },
  {
    title: "Midfielder",
    className: "py-6 -ml-10 w-[240px] h-full flex flex-col justify-around items-center"
  },
  {
    title: "Forward",
    className: "py-24 -ml-20 w-[240px] h-full flex flex-col justify-between items-center"
  },
]

export const MODAL_STYLES = {
  position: "fixed",
  top: "46%",
  left: "52%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#2D2D2D",
  zIndex: 1000,
  borderRadius: "8px",
  boxShadow: "0px 2px 12px 0px rgba(22, 22, 22, 0.50)",
};

export const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  zIndex: 1000,
};

export const EDIT_INPUT_FIELDS_DATA = [
  {
    label: "Player Name",
    name: "Player Name",
    width: 270,
    type: "text",
    key: "Player Name",
  },
  {
    label: "Jersey Number",
    width: 140,
    type: "number",
    key: "Jersey Number",
  },
  { label: "Height (in cm)", width: 205, type: "number", key: "Height" },
  { label: "Weight (in kg)", width: 205, type: "number", key: "Weight" },
];

export const EDIT_SELECT_FIELDS_DATA = [
  {
    label: "Nationality",
    width: 430, 
    key: "Nationality",
  },
  {
    label: "Position",
    width: 430,
    key: "Position",
  },
];

export const EDIT_RADIO_FIELDS_DATA = [
  { label: "No", id: "StartersNo", value: "No" },
  { label: "Yes", id: "StartersYes", value: "Yes" },
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

export const getCustomPlayerInfo = (playerInfo) => {
  return {
    ["Player Name"]: playerInfo["Player Name"],
    ["Jersey Number"]: playerInfo["Jersey Number"],
    ["Height"]: playerInfo["Height"],
    ["Weight"]: playerInfo["Weight"],
    ["Nationality"]: playerInfo["Nationality"],
    ["Position"]: playerInfo["Position"],
    ["Starter"]: playerInfo["Starter"],
    _id: playerInfo._id,
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

export const getErrorMessage = (countStarters,showingPlayerCardInfo) => {
    return {
        title:
          countStarters < 11
            ? "Not enough starters"
            : countStarters === 11 && !showingPlayerCardInfo ? "More positional starters": "There are too many starters",
        subtitle:
          countStarters < 11
            ? "Your team doesn’t have enough starters for one or more of the positions in the 4-3-3 formation"
            : countStarters >= 11 &&
            "Your team has too many starters for one or more of the positions in the 4-3-3 formation.",
    }
}

export const ROSTER_DETAILS = [
  {
    title: "Editable Team Name",
    description: "Customize your team name with the option to edit it anytime.",
  },
  {
    title: "Search Field",
    description:
      "Utilize a search bar to find players by name or position. Execute searches with Enter and cancel with ESC.",
  },
  {
    title: "Roster Importer",
    description:
      "Import players from a CSV file. Re-import if needed, and Refresh to clear the state for a fresh import.",
  },
  {
    title: "Roster Table",
    description:
      "View and manage your roster in a table. Edit or delete players with ease using three dots(...) beside Minutes Played column. Ensure all fields are filled for editing.",
  },
];

export const FORMATION_OVERVIEW = [
  {
    title: "Formation Preview",
    description: "Visualize your team's formation on the field. See where players are positioned. Check the required starters for each position.",
  },
  {
    title: "Player Details",
    description:
      "View details about players in the formation. Click on a player to see more information, including stats.",
  },
];

