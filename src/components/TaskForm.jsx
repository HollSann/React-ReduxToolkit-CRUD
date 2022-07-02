import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, editTask } from '../features/tasks/taskSlice';
import { v4 as uuid } from 'uuid'
import { useNavigate, useParams } from 'react-router-dom'
function TaskForm() {

  const [task, setTask] = useState({
    title: '',
    description: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch(); //función que permite disparar eventos
  const params = useParams();
  const tasks = useSelector((state) => state.tasks)

  //CAPTURANDO LOS CAMBIOS handleChange (INPUT Y TEXTAREA)
  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  }

  //GUARDAR TAREA handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (params.id) {
      dispatch(editTask({ ...task, id: params.id }))
    }
    else {
      dispatch(addTask({
        ...task,
        id: uuid()
      }))

    }
    navigate('/React-ReduxToolkit-CRUD/');
  };

  //ACTUALIZAR TAREA
  useEffect(() => {
    if (params.id) {
      setTask(tasks.find((task) => task.id === params.id));
    }
  }, [params, tasks]);

  return (
    <form onSubmit={handleSubmit} className='bg-zinc-800 max-w-sm p-4'>
      <label
        htmlFor='Título'
        className='block text-sm font-bold mb-1'
      >Tarea:
      </label>
      <input
        name='title'
        type='text'
        placeholder='Agrega un título'
        onChange={handleChange}
        value={task.title}
        className='w-full p-2 rounded-md bg-zinc-600 mb-2 focus:outline-none'
      />
      <label
        htmlFor='Descripción'
        className='block text-sm font-bold mb-1'
      >Descripción:
      </label>
      <textarea
        name="description"
        placeholder='Descripción'
        onChange={handleChange}
        value={task.description}
        className='w-full p-2 rounded-md bg-zinc-600 mb-2 focus:outline-none'
      >
      </textarea>

      <button
        className='bg-indigo-600 px-2 py-1 rounded-md text-sm hover:bg-indigo-500'
      >Guardar
      </button>


    </form>
  )
}

export default TaskForm