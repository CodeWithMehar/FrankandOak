import { configureStore } from '@reduxjs/toolkit'
import loginSlice from '../slice/loginSlice'
import  cartSlice  from '../slice/cartSlice'
export const store = configureStore({
    reducer: {
        loginReducer :loginSlice,
        cartReducer:cartSlice
    },
  })