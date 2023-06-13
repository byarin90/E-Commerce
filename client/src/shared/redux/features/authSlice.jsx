import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getApi } from "../../services/services";
import { MY_INFO_URL } from "../../constant/constant";

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')): null,
    loading: false,
    error: null,
    status: false,
}

export const getUserInfo = createAsyncThunk(
    'auth/getUserInfo', 
    async (bodyData, {fulfillWithValue,rejectWithValue}) => {
        try{
            const {data} = await getApi(MY_INFO_URL)
            return fulfillWithValue(data)
        }catch(err){
            return rejectWithValue(err.response.data)
        }
    
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers(builder){
        builder
        .addCase(getUserInfo.pending, (state, action) => {
            state.loading = true
        })
        .addCase(getUserInfo.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        })
        .addCase(getUserInfo.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    },
    reducers: {
        // Reducers
        userLogout: (state, action) => {
            state.user = null
            localStorage.removeItem('user')
        }
    }
})

export const { userLogout } = authSlice.actions;
export default authSlice.reducer;