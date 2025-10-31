import React from 'react';

const TaskCard = ({ task, onStatusChange, showEmployee = false }) => {
  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Completed': 'bg-green-100 text-green-800',
    'On Hold': 'bg-red-100 text-red-800',
  };

  const priorityColors = {
    'Low': 'text-gray-600',
    'Medium': 'text-orange-600',
    'High': 'text-red-600',
  };

  const formatDate = (date) => {
    if (!date) return 'No due date';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[task.status]}`}>
          {task.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4">{task.description}</p>

      {/* Employee Info (for admin) */}
      {showEmployee && task.assignedTo && (
        <div className="mb-3 pb-3 border-b">
          <p className="text-sm text-gray-500">
            Assigned to: <span className="font-medium text-gray-700">{task.assignedTo.name}</span>
          </p>
        </div>
      )}

      {/* Meta Info */}
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center space-x-4">
          <span className={`font-medium ${priorityColors[task.priority]}`}>
            {task.priority} Priority
          </span>
          <span className="text-gray-500">
            {formatDate(task.dueDate)}
          </span>
        </div>
      </div>

      {/* Status Update Dropdown */}
      {onStatusChange && (
        <div className="mt-4 pt-4 border-t">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Update Status
          </label>
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task._id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
