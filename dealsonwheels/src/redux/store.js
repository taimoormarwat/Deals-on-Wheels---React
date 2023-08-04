import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth.js'
import navbarReducer from './navbar.js'

export const store = configureStore({
  reducer: {
    authReducer,
    navbarReducer
  },
})