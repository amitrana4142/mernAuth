import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    loading:false,
    error:false
}

const userSlice = createSlice ({
    name:'user',
    initialState,
    reducers:{
        signIn : (state)=>{
            state.loading=true
        },
        signInSuccess:(state, action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error =false;
        },
        signInFailure:(state, action)=>{
                state.loading=false;
                state.error=action.payload;
        },
        updateStart :(state)=>{
            state.loading = true

        },
        updateSuccess:(state, action)=>{
            state.currentUser=  action.payload
            state.loading= false,
            state.error = false

        },
        updateFail:(state, action)=>{
            state.loading=false;
            state.error=action.payload;
        }
    }
})

export const {signIn, signInSuccess,signInFailure,updateStart,updateSuccess,updateFail}= userSlice.actions;
export default userSlice.reducer;