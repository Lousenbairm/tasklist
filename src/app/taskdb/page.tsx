"use client"

import { useState } from "react"

export default function taskdb() {

  const [task, setTask] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState('');

  const handleCreateTask = async () => {
    try {

      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({task, desc, status})
      })
      if (response.ok) {
        const data = await response.json()
        console.log(data)
      } else {
        console.error("Error creating task") 
      }
    } catch (error) {
      console.error("Error creating task", error)
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl mx-auto p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-black   ">Task List</h2>
        <form className="flex flex-row gap-4 items-start">
          <div className="flex-1">
            <label htmlFor="task" className="block text-gray-700">Task</label>
            <input 
              type="text" 
              id="task" 
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="desc" className="block text-gray-700">Description</label>
            <input 
              type="text" 
              id="desc" 
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="status" className="block text-gray-700">Status</label>
            <input 
              type="text" 
              id="status" 
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
          <div className="flex items-end mt-6">
            <button 
              type="button"
              className="px-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              onClick={handleCreateTask}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
