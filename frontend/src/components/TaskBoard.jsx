import { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const TaskBoard = ({ tasks, onUpdateTask, onDeleteTask, onCreateTask }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'To Do',
    assignedTo: '',
  });
  const [filteredTasks, setFilteredTasks] = useState({
    'To Do': [],
    'In Progress': [],
    'Done': [],
  });

  useEffect(() => {
    const todo = tasks.filter(task => task.status === 'To Do');
    const inProgress = tasks.filter(task => task.status === 'In Progress');
    const done = tasks.filter(task => task.status === 'Done');
    setFilteredTasks({
      'To Do': todo,
      'In Progress': inProgress,
      'Done': done,
    });
  }, [tasks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      onCreateTask(newTask);
      setNewTask({
        title: '',
        description: '',
        status: 'To Do',
        assignedTo: '',
      });
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    if (source.droppableId === destination.droppableId) return;

    const taskToUpdate = tasks.find(task => task._id === draggableId);
    if (taskToUpdate) {
      onUpdateTask(draggableId, { ...taskToUpdate, status: destination.droppableId });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleCreateTask} className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-bold mb-4">Create New Task</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Task title"
            value={newTask.title}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newTask.description}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <select
            name="status"
            value={newTask.status}
            onChange={handleInputChange}
            className="p-2 border rounded"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>
      </form>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(filteredTasks).map(([status, tasks]) => (
            <div key={status} className="bg-gray-100 p-4 rounded">
              <h2 className="text-xl font-bold mb-4">{status}</h2>
              <Droppable droppableId={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="min-h-40"
                  >
                    {tasks.map((task, index) => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        index={index}
                        onUpdate={onUpdateTask}
                        onDelete={onDeleteTask}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;