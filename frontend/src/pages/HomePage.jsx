import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import TaskBoard from '../components/TaskBoard';
import api from '../api';

const HomePage = () => {
  const { user, token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks');
        setTasks(response.data);
      } catch (err) {
        setError(err.message || 'Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchTasks();
    }
  }, [token]);

  const handleCreateTask = async (taskData) => {
    try {
      const response = await api.post('/tasks', {
        ...taskData,
        createdBy: user._id
      });
      setTasks(prev => [...prev, response.data]);
    } catch (err) {
      console.error('Error creating task:', err);
      setError(err.response?.data?.message || 'Failed to create task');
    }
  };

  const handleUpdateTask = async (taskId, updatedData) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, updatedData);
      setTasks(prev =>
        prev.map(task => (task._id === taskId ? response.data : task))
      );
    } catch (err) {
      console.error('Error updating task:', err);
      setError(err.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(prev => prev.filter(task => task._id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
      setError(err.response?.data?.message || 'Failed to delete task');
    }
  };

  if (!user) {
    return <div className="container mx-auto p-4 text-center">Please login to view tasks</div>;
  }

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Loading tasks...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <TaskBoard
        tasks={tasks}
        onCreateTask={handleCreateTask}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default HomePage;