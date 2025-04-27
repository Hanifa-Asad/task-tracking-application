import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Draggable } from 'react-beautiful-dnd';

const TaskCard = ({ task, index, onUpdate, onDelete }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    assignedTo: task.assignedTo?._id || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(task._id, editedTask);
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-4 mb-4 rounded shadow"
        >
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                name="title"
                value={editedTask.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <textarea
                name="description"
                value={editedTask.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <div className="flex justify-between">
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="font-bold text-lg">{task.title}</h3>
              <p className="text-gray-600 mb-2">{task.description}</p>
              <p className="text-sm text-blue-600">
                Assigned to: {task.assignedTo?.username || 'Unassigned'}
              </p>
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(task._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;