import React, { useEffect, useState } from 'react'
import axios from 'axios'


const App = () => {
  const [tasks,setTasks]=useState([])
  const[title,setTitle]=useState('')
  const[description,setDescription]= useState('')

  useEffect(()=>{
    axios.get('http://localhost:5000/api/tasks')
    .then(response=>setTasks(response.data))
    .catch(error=>console.error(error))
  })
  const addTask=()=>{
    axios.post('http://localhost:5000/api/tasks',{title,description})
    .then(response=>{
      setTasks([...tasks,response.data])
      setTitle('')
      setDescription('')
    })
    .catch(error=>console.error(error))
  }

  const deleteTask=(id)=>{
    axios.delete(`http://localhost:5000/api/tasks/${id}`)
    .then(()=>setTasks(tasks.filter(task=>task._id !== id)))
    .catch(error=>console.error(error))
  }
  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <h1 className='text-3xl font-bold text-center mb-6'>Task Manager</h1>

      <div className='bg-white p-4 rounded shadow-md mb-6'>
        <input className='border p-2 w-full mb-4' type='text' placeholder='Enter Task Title'/>

        <textarea className='border p-2 w-full mb-4'
        placeholder='Task Description'/>

        <button className='bg-blue-500 text-white p-2 rounded' onClick={addTask}>Add Task</button>


      </div>
      <div>
        {tasks.map(task=>(
          <div key={task._id} className='bg-white p-4 mb-4 rounded shadow-md flex justify-between'>
            <div>
              <h2 className='text-xl font-bold'>{task.title}</h2>
              <p>{task.description}</p>
            </div>
            <button className='bg-red-500 text-white p-3 rounded' onClick={()=>deleteTask(task._id)}>Delete</button>

          </div>
        ))}
      </div>
      
    </div>
  )
}

export default App
