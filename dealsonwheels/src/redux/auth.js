import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: null,
  name: null,
  email: null,
  img: null,
  contact: null,
  role:null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      //   state.token += action.payload.token

      const data = action.payload;
      if (data.status==1) {
        state.token = data.token;
        state.name = data.data.name;
        state.email = data.data.email;
        state.img = data.data.img;
        state.contact = data.data.contact;
        state.role=data.data.role;
      } else {
        state.token = null;
        state.name = null;
        state.email = null;
        state.img = null;
        state.contact = null;
        state.role=null;
      }

    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken } = authSlice.actions;

export default authSlice.reducer;
