import {configureStore} from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
//? create Gloabl Store for Redux
const myStore = configureStore({
    reducer:{
        // Reducers
        authReducer
    }
})

export default myStore;