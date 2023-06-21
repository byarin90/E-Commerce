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
            state.authModal.show = true
        },
        closeAuthModal(state, action){
            state.authModal.show = false
        },
        toSignIn(state, action){
            state.authModal.isSignIn = true
        },
        toSignUp(state, action){
            state.authModal.isSignIn = false
        },
        toggleIsSignIn(state, action){
            state.authModal.isSignIn = !state.authModal.isSignIn
        }
    }
})

export const {showAuthModal,closeAuthModal,toSignIn,toSignUp,toggleIsSignIn} = modalSlice.actions
export default modalSlice.reducer;