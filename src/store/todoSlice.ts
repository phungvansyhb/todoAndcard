import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CardTodo, CardAssign, TODOSTATE } from '../typeDef/CardTodo'
import { arrayTodo } from './dataStore'

function formatTodoList(todoList: CardTodo[]): TODOSTATE {
  const result: TODOSTATE = { 'BACKLOG': [], "INPROGRESS": [], "DONE": [] }
  const listTmp: CardAssign[] = todoList.map(item => ({ ...item, userIds: [1, 2, 3] }))
  for (const iterator of ['BACKLOG', 'INPROGRESS', 'DONE']) {
    result[iterator as 'BACKLOG' | 'INPROGRESS' | 'DONE'] = listTmp.filter((item) => item.status === iterator)
  }
  return result;
}

const initialState: { list: TODOSTATE } = {
  list: formatTodoList(arrayTodo.slice(0, 5))
}
export const counterSlice = createSlice({
  name: 'todoSlice',
  initialState,
  reducers: {
    updateList: (state, action: PayloadAction<TODOSTATE>) => {
      state.list = action.payload
    },

    createTodo: (state, action: PayloadAction<CardAssign>) => {
      const status = action.payload.status
      state.list = { ...state.list, [status]: [action.payload, ...state.list[status]] }
    },
    editTodo: (state, action: PayloadAction<CardAssign>) => {
      const status = action.payload.status
      const updateItemIndex = state.list[status].findIndex(item => item.id === action.payload.id)
      state.list[status][updateItemIndex] = action.payload
    },
    deleteTodo: (state, action: PayloadAction<CardAssign>) => {
      const status = action.payload.status
      state.list[status] = state.list[status].filter(item => item.id !== action.payload.id)
    }
  },
})
// Action creators are generated for each case reducer function
export const { createTodo, editTodo, deleteTodo, updateList } = counterSlice.actions
export default counterSlice.reducer
