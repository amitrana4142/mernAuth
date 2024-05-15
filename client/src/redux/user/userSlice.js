import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

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
            state.error =false

        },
        updateSuccess:(state, action)=>{
            state.currentUser=  action.payload
            state.loading= false,
            state.error = false

        },
        updateFail:(state, action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        deleteStart :(state)=>{
            state.loading= true
        },
        deleteSuccess :(state)=>{
            state.currentUser=null
            state.loading= false
            state.error = false
            
        },
        deleteFail :(state, action)=>{
            state.loading= false
            state.error= action.payload
        },
        signout:(state)=>{
            state.currentUser=null;
            state.loading=false;
            state.error =false;
        },
    }
})

export const {signIn, signInSuccess,signInFailure,updateStart,updateSuccess,updateFail,
deleteFail,deleteStart,deleteSuccess,signout}= userSlice.actions;
export default userSlice.reducer;
