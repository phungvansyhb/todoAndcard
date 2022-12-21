import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CardTodo, CardAssign, TODOSTATE } from '../typeDef/CardTodo'
// import { arrayTodo, arrayUser } from './dataStore'


function getItemLocalStorage(key: string, initValue: any) {
  const item = window.localStorage.getItem('arrayTodo')
  return item ? JSON.parse(item) : initValue
}
function setItemLocalStorage(key: string, value: any, isRemove?: boolean) {
  if (isRemove) {
    window.localStorage.removeItem(key)
  } else {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
}

const arrayTodo = getItemLocalStorage('arrayTodo', [])
const arrayUser = getItemLocalStorage('arrayUser', [])

function formatTodoList(todoList: CardTodo[] | CardAssign[]): TODOSTATE {
  const result: TODOSTATE = { 'BACKLOG': [], "INPROGRESS": [], "DONE": [] }
  if (todoList.length === 0) return result;
  let temp = [...todoList]
  if (!("userIds" in temp[0])) {
    temp = temp.map(item => ({ ...item, userIds: Math.round(Math.random() * arrayUser.length) }))
  }
  for (const iterator of ['BACKLOG', 'INPROGRESS', 'DONE']) {
    result[iterator as 'BACKLOG' | 'INPROGRESS' | 'DONE'] = (temp as CardAssign[]).filter((item) => item.status === iterator)
  }
  return result;
}

const initialState: { list: TODOSTATE } = {
  list: formatTodoList(arrayTodo)
}
export const counterSlice = createSlice({
  name: 'todoSlice',
  initialState,
  reducers: {
    updateList: (state, action: PayloadAction<TODOSTATE>) => {
      state.list = action.payload
      setItemLocalStorage('arrayTodo', action.payload)
    },

    createTodo: (state, action: PayloadAction<CardAssign>) => {
      const temp = Object.values(state.list).flatMap(item => item)
      state.list = formatTodoList([action.payload, ...temp])
      setItemLocalStorage('arrayTodo', [action.payload, ...temp])
    },
    editTodo: (state, action: PayloadAction<CardAssign>) => {
      const temp = Object.values(state.list).flatMap(item => item).map(item => {
        if (item.id === action.payload.id) return action.payload
        else return item
      })
      state.list = formatTodoList([...temp])
      setItemLocalStorage('arrayTodo', [...temp])

    },
    deleteTodo: (state, action: PayloadAction<CardAssign>) => {
      const temp = Object.values(state.list).flatMap(item => item).filter(item => item.id !== action.payload.id)
      const status = action.payload.status
      state.list[status] = state.list[status].filter(item => item.id !== action.payload.id)
      setItemLocalStorage('arrayTodo', [...temp])
    }
  },
})
// Action creators are generated for each case reducer function
export const { createTodo, editTodo, deleteTodo, updateList } = counterSlice.actions
export default counterSlice.reducer
