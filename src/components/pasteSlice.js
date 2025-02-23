import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
    pastes: localStorage.getItem("pastes")
        ? JSON.parse(localStorage.getItem("pastes")) //as saves in string, and for pushing in new pastes
        : []
}

export const pasteSlice = createSlice({
    name: 'paste',
    initialState,
    reducers: {
        addToPastes: (state, action) => {
            const paste = action.payload;

            //check if paste exists
            state.pastes.push(paste);//in centralized store
            localStorage.setItem("pastes", JSON.stringify(state.pastes))//whole array of notes get saved

            toast("Paste created successfully")
        },

        updateToPastes: (state, action) => {
            const paste = action.payload;
            const index = state.pastes.findIndex((item) =>
                item._id === paste._id);
            //returns index after finding one

            if (index >= 0) {
                state.pastes[index] = paste;
                localStorage.setItem("pastes", JSON.stringify(state.pastes));
            }

            toast.success("Paste updated")

        },
        resetAllPastes: (state, action) => {
            state.pastes = []
            localStorage.removeItem("pastes")
        },
        removeFromPastes: (state, action) => {
            const pasteId = action.payload;
            console.log(pasteId)
            const index = state.pastes.findIndex((item) =>item._id === pasteId
            );

            if(index >=0){
                state.pastes.splice(index, 1);
                localStorage.setItem("pastes", JSON.stringify(state.pastes));

                toast.success("paste deleted")
            }
        }

    }
})

export const { addToPastes, updateToPastes, removeFromPastes, resetAllPastes } = pasteSlice.actions
export default pasteSlice.reducer//for registering in store