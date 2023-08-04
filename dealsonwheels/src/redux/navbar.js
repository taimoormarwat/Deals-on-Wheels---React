import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dropDownLinks:{
    "Login":"/login",
    "Sign Up":"/signup",
  }
}

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    setDropDownLinks: (state, action) => {
      state.dropDownLinks = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {setDropDownLinks } = navbarSlice.actions

export default navbarSlice.reducer