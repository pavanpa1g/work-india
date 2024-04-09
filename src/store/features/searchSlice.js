import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "searchSlice",
  initialState: {searchInput:"",
slideOpen:false},
  reducers: {
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    setSlider:(state)=>{
      state.slideOpen = !state.slideOpen
    }
  },
});
export const { setSearchInput, setSlider } = searchSlice.actions;
export default searchSlice.reducer;
