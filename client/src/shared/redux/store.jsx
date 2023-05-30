import {configureStore} from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import modalReducer from './features/modalSlice';
//? create Gloabl Store for Redux
const myStore = configureStore({
    reducer:{
        // Reducers
        authReducer,
        modalReducer
    }
})

export default myStore;