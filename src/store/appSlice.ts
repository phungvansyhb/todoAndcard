import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CardTodo, CardAssign, TODOSTATE } from '../typeDef/CardTodo'
import { arrayTodo, arrayUser } from './dataStore'

type APPSTATE = {
    showNotify:boolean
}

const initialState: APPSTATE   = {
    showNotify : false
}
export const applice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    toggleSlice:(state , action: PayloadAction<boolean>)=>{
        state.showNotify = action.payload
    }
  },
})
// Action creators are generated for each case reducer function
export const { toggleSlice } = applice.actions
export default applice.reducer
