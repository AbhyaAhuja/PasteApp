import { configureStore } from "@reduxjs/toolkit";
import pasteReducer from './components/pasteSlice'

//register reducers here

export const store = configureStore({
    reducer: {
        paste: pasteReducer
    }
})
