import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTask } from '../features/tasks/taskSlice'
import { Link } from 'react-router-dom'
function TasksLists() {

  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.tasks)

  const handleDelete = (id) => {
    dispatch(deleteTask(id))
  }
  return (
    <div className='w-2/3'>
      <header className='flex justify-between items-center py-4'>
        <h1 className='font-bold'>Tareas ({tasks.length})</h1>
        <Link to='/create-task' className='bg-indigo-600 px-2 py-1 rounded-sm text-sm hover:bg-indigo-500'>Crear Tarea</Link>
      </header>
      <div className='grid grid-cols-3 gap-4'>
        {
          tasks.map(task => (
            <div key={task.id} className='bg-neutral-800 p-4 rounded-md'>
              <header className='flex justify-between'>
                <h3 className='font-bold'>{task.title}</h3>
                <div className='flex gap-x-2'>

                  <Link
                    className='bg-zinc-600 px-2 py-1 text-xs rounded-md hover:bg-zinc-500'
                    to={`/edit-task/${task.id}`}>Editar
                  </Link>


                  <button
                    className='bg-red-500 px-2 py-1 rounded-md text-xs hover:bg-red-400'
                    onClick={() => handleDelete(task.id)}>Eliminar
                  </button>

                </div>
              </header>
              <p>{task.description}</p>

            </div>

          ))
        }
      </div>
    </div>
  )
}

export default TasksLists