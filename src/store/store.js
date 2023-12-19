import { configureStore } from '@reduxjs/toolkit'
//importing reducers
import homeSlice from './homeSlice'

export const store = configureStore({
  reducer: {
    home: homeSlice, 
  },
})
