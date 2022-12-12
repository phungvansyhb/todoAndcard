import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CardTodo, CardAssign } from '../typeDef/CardTodo'
import { arrayTodo } from './dataStore'

function formatTodoList(todoList: CardTodo[]): CardAssign[][] {
  const result = []
  const listTmp: CardAssign[] = todoList.map(item => ({ ...item, userIds: [1, 2, 3] }))
  for (const iterator of ['BACKLOG', 'INPROGRESS', 'DONE']) {
    result.push(listTmp.filter((item) => item.status === iterator))
  }
  return result
}

const initialState: { list: CardAssign[][] | [] } = {
  // list: formatTodoList(arrayTodo)
  list: []
}
export const counterSlice = createSlice({
  name: 'todoSlice',
  initialState,
  reducers: {
    updateList: (state, action: PayloadAction<CardAssign[][]>) => {
      state.list = action.payload
    },

    createTodo: (state, action: PayloadAction<CardAssign>) => {
      if (state.list.length === 0) state.list = [[action.payload]]
      else {
        state.list.forEach(iterator => {
          if (iterator[0].status === "BACKLOG") {
            iterator = [...iterator, action.payload]
          }
        })
      }
    },
    editTodo: (state, action: PayloadAction<CardAssign>) => {

    },
    deleteTodo: (state, action: PayloadAction<CardAssign>) => {

    }

  },
})

// Action creators are generated for each case reducer function
export const { createTodo, editTodo, deleteTodo, updateList } = counterSlice.actions

export default counterSlice.reducer