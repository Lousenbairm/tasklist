"use client";

import React, { useEffect, useState } from "react";
import { deleteTask, getTasks } from "../utils/api";

interface Task {
  id: string;
  task: string;
  desc: string;
  status: string;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (error) {
      setError("Failed to delete data");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="text-black mt-5">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">Task</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Description
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Status
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border border-gray-300 px-4 py-2">
                  {item.task}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.desc}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
