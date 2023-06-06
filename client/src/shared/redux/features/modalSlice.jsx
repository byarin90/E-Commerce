import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authModal:{
        show: false,
        isSignIn:false
    }
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        // Reducers
        showAuthModal(state, action){
            state.authModal.show = !state.authModal.show
        }
    }
})

export const {showAuthModal} = modalSlice.actions
export default modalSlice.reducer;