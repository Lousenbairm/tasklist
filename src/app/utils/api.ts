export async function getTasks() {
    const response = await fetch('api/tasks/showTask', {
        method: 'GET',
        headers: {"Content-Type": "application/json"}
    });
    if (!response.ok) throw new Error("Error getting tasks");
    return await response.json();
}

export async function createTask(taskData: {task: string, desc: string, status: string}) {
    const response = await fetch('api/tasks/showTask', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(taskData)
    });
    if (!response.ok) throw new Error("Error creating tasks");
    return await response.json();
}

export async function deleteTask(taskId:string) {
    const response = await fetch(`api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"}
    })
    if (!response.ok) throw new Error("Error deleting task");
}