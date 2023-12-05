import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
    name: 'player',
    initialState: {
        playerData: null,
    },
    reducers: {
        setPlayerData: (state, action) => {
            state.playerData = action.payload;
        },
    },
  });
  
  export const { setPlayerData } = playerSlice.actions;
//   export const selectPlayerData = (state) => state.playerData;
  export default playerSlice.reducer;