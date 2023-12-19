import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//   value: 0,
// }

export const homeSlice = createSlice({
    //this state has been named home
  name: 'home',
  //declaring initial states for home
  initialState: {
    url: {},
    genres: {},
  },
  reducers: {
    getApiConfiguration: (state, action) => {
        //storing the value of url (from the api) into the state
        state.url = action.payload;
    },

    getGenres: (state, action) => {
        //storing the value of genre (from the api) into the state
        state.genres = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getApiConfiguration, getGenres } = homeSlice.actions

export default homeSlice.reducer