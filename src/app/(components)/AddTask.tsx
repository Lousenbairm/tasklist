"use client";

import { useEffect, useState } from "react";
import { createTask } from "../utils/api";
import { truncate } from "fs";

export default function AddTask() {
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("");
  const [checkError, setCheckError] = useState(false);

  async function handleCreateTask() {
    try {
      await createTask({ task, desc, status });
    } catch (error) {
      setCheckError(true);
    }
  };

  useEffect(() => {
    handleCreateTask();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center text-black">
        Task List
      </h2>
      <form className="flex flex-row gap-4 items-start">
        <div className="flex-1">
          <label htmlFor="task" className="block text-gray-700">
            Task
          </label>
          <input
            type="text"
            id="task"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="desc" className="block text-gray-700">
            Description
          </label>
          <input
            type="text"
            id="desc"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="status" className="block text-gray-700">
            Status
          </label>
          <input
            type="text"
            id="status"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            value={status}
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
      {checkError && (
        <div className="text-red-700 py-1 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span>Something went wrong</span>
        </div>
      )}
    </div>
  );
}
