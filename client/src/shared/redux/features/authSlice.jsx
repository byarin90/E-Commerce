import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: false,
    error: null,
    status: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Reducers
    }
})



export default authSlice.reducer;