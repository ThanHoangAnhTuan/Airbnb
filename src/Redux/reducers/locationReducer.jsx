import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    arrLocation:[]
}

const locationReducer = createSlice({
  name: 'locationReducer',
  initialState,
  reducers: {
    setLocationAction:(state,action)=>{
        state.arrLocation= action.payload
    }
  }
});

export const {setLocationAction} = locationReducer.actions

export default locationReducer.reducer

