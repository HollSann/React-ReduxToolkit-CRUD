import { createSlice } from "@reduxjs/toolkit"

const initialState = [
  {
    id: "1",
    title: 'Tarea 1',
    description: 'Descripción tarea 1',
    completed: false
  },
  {
    id: "2",
    title: 'Tarea 2',
    description: 'Descripción tarea 2',
    completed: false
  }
]

const taskSlice = createSlice({
  name: 'tasks',
  initialState, //igual que useState
  reducers: { //funciones para poder actualizar el estado de taskSlice

    addTask: (state, action) => {
      state.push(action.payload)

    },
    editTask: (state, action) => {
      const { id, title, description } = action.payload
      const foundTask = state.find(task => task.id === id)
      if (foundTask) {
        foundTask.title = title
        foundTask.description = description
      }
    },
    deleteTask: (state, action) => {
      console.log(action)
      const taskFound = state.find(task => task.id === action.payload)
      if (taskFound) {
        state.splice(state.indexOf(taskFound), 1)
      }
    }


  }
})

export const { addTask, deleteTask, editTask } = taskSlice.actions; //El actions tiene las funciones que se van a exportar, como addTask
export default taskSlice.reducer;