import { useState } from "react";
import GetTask from "../(components)/AddTask";
import TaskList from "../(components)/TaskList";

export default function page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl mx-auto p-8 rounded-lg shadow-md">
        <GetTask />
        <TaskList />
      </div>
    </div>
  );
}
