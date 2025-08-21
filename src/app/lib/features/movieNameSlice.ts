import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface movieName {
  value: string
}

const initialState: movieName = {
  value: "",
}

const movieNameSlice = createSlice({
  name: 'movieName',
  initialState: { value: '' },
  reducers: {
    setMovieName: (state, action) => {
      state.value = action.payload; 
    },
  },
});

export const { setMovieName } = movieNameSlice.actions;
export const getMovieName = (state: RootState) => state.movieName.value
export default movieNameSlice.reducer;