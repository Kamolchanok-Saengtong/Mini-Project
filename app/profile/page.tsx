'use client';
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function StudifyDashboard() {
  // States for the calendar, tasks, profile, and to-do list
  const [date, setDate] = useState(new Date());
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [profileLinks, setProfileLinks] = useState([]);
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [colorTheme, setColorTheme] = useState("pink");

  // Handle date change
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  // Handle task input change
  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  // Add task to selected date
  const handleAddTask = () => {
    const dateString = date.toISOString().split("T")[0];
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      if (updatedTasks[dateString]) {
        updatedTasks[dateString].push(task);
      } else {
        updatedTasks[dateString] = [task];
      }
      return updatedTasks;
    });
    setTask(""); // Reset task input
  };

  // Handle profile image upload
  const handleProfileImageChange = (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
  };

  // Handle link input change
  const handleLinkChange = (e) => {
    setProfileLinks(e.target.value);
  };

  // Add a link to profile
  const handleAddLink = () => {
    if (profileLinks.trim()) {
      setProfileLinks((prevLinks) => [...prevLinks, profileLinks]);
      setProfileLinks(""); // Clear the input after adding
    }
  };

  // Handle to-do input change
  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };

  // Add to-do to the list
  const handleAddTodo = () => {
    setTodos((prevTodos) => [...prevTodos, todo]);
    setTodo(""); // Reset to-do input
  };

  // Get tasks for selected date
  const getTasksForDate = (date) => {
    const dateString = date.toISOString().split("T")[0];
    return tasks[dateString] || [];
  };

  // Color theme options
  const colorClasses = {
    pink: "bg-pink-50",
    blue: "bg-blue-50",
    green: "bg-green-50",
    yellow: "bg-yellow-50",
  };

  return (
    <div className={`${colorClasses[colorTheme]} min-h-screen flex flex-col`}>
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <img src="/avatartion.png" alt="Studify Logo" className="h-10 w-10" />
          <h1 className="text-2xl font-bold text-gray-800">Studify</h1>
        </div>
        <select
          value={colorTheme}
          onChange={(e) => setColorTheme(e.target.value)}
          className="border border-gray-300 rounded-lg py-2 px-4"
        >
          <option value="pink">Pink</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
        </select>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex justify-center py-8 px-4">
        <div className="max-w-6xl w-full bg-white rounded-lg shadow-lg p-6 flex gap-8">
          {/* Left Side - Calendar and To-Do List */}
          <div className="flex-1 space-y-8">
            {/* Calendar */}
            <div className="flex justify-center mb-6">
              <Calendar
                onChange={handleDateChange}
                value={date}
                className="rounded-lg border-2 border-gray-300 shadow-md"
                tileContent={({ date }) => {
                  const tasksForDate = getTasksForDate(date);
                  return (
                    tasksForDate.length > 0 && (
                      <div className="text-xs text-gray-800 bg-pink-200 rounded-full px-2 py-1 absolute top-0 right-0 translate-x-1 translate-y-1">
                        {tasksForDate.length}
                      </div>
                    )
                  );
                }}
              />
            </div>

            {/* Add Task */}
            <div className="mb-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">Add Task</h2>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={task}
                  onChange={handleTaskChange}
                  placeholder="Enter task"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button
                  onClick={handleAddTask}
                  className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all duration-300"
                >
                  Add Task
                </button>
              </div>
            </div>

            {/* To-Do List */}
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">To-Do List</h2>
              <ul className="space-y-3">
                {todos.map((todoItem, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-2 p-3 bg-pink-100 rounded-lg shadow-sm hover:bg-pink-200 transition duration-200"
                  >
                    <span className="text-gray-800">{todoItem}</span>
                  </li>
                ))}
              </ul>
              {/* Add New To-Do */}
              <div className="flex items-center space-x-2 mt-4">
                <input
                  type="text"
                  value={todo}
                  onChange={handleTodoChange}
                  placeholder="Enter to-do item"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button
                  onClick={handleAddTodo}
                  className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all duration-300"
                >
                  Add To-Do
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Profile */}
          <div className="w-80 bg-white p-6 rounded-lg shadow-xl space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Profile</h2>
            <div className="flex flex-col items-center">
              {/* Profile Image */}
              <label htmlFor="profileImage" className="cursor-pointer">
                <div className="px-6 py-3 bg-pink-500 text-white rounded-lg text-center">Upload Image</div>
                <input
                  type="file"
                  id="profileImage"
                  onChange={handleProfileImageChange}
                  className="hidden"
                />
              </label>
              {profileImage && (
                <img src={profileImage} alt="Profile" className="w-32 h-32 object-cover rounded-full mt-4" />
              )}
            </div>

            {/* Profile Links */}
            <div className="space-y-4">
              <input
                type="text"
                value={profileLinks}
                onChange={handleLinkChange}
                placeholder="Enter profile link"
                className="border border-gray-300 rounded-lg py-2 px-4 w-full"
              />
              <button
                onClick={handleAddLink}
                className="w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all duration-300"
              >
                Add Link
              </button>
              <ul className="space-y-2 mt-4">
                {profileLinks.length > 0 &&
                  profileLinks.map((link, index) => (
                    <li key={index} className="text-blue-500 hover:underline">{link}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudifyDashboard;
