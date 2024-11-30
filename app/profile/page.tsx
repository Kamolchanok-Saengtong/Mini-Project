'use client';
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function StudifyDashboard() {
  const [date, setDate] = useState(new Date());
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [profileLinks, setProfileLinks] = useState([]);
  const [newLink, setNewLink] = useState("");
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [colorTheme, setColorTheme] = useState("pink");
  const [showNotice, setShowNotice] = useState(true);

  const handleDateChange = (newDate) => setDate(newDate);

  const handleTaskChange = (e) => setTask(e.target.value);

  const handleAddTask = () => {
    const dateString = date.toISOString().split("T")[0];
    setTasks((prevTasks) => ({
      ...prevTasks,
      [dateString]: [...(prevTasks[dateString] || []), task],
    }));
    setTask("");
  };

  const handleProfileImageChange = (e) =>
    setProfileImage(URL.createObjectURL(e.target.files[0]));

  const handleLinkChange = (e) => setNewLink(e.target.value);

  const handleAddLink = () => {
    if (newLink.trim()) {
      setProfileLinks((prevLinks) => [...prevLinks, newLink]);
      setNewLink("");
    }
  };

  const handleTodoChange = (e) => setTodo(e.target.value);

  const handleAddTodo = () => {
    setTodos((prevTodos) => [...prevTodos, todo]);
    setTodo("");
  };

  const getTasksForDate = (date) => tasks[date.toISOString().split("T")[0]] || [];

  const colorClasses = {
    pink: "bg-pink-50",
    blue: "bg-blue-50",
    green: "bg-green-50",
    yellow: "bg-yellow-50",
  };

  return (
    
    <div className={`${colorClasses[colorTheme]} min-h-screen flex flex-col`}>
      {/* Hero Section */}
      <section className="bg-pink-200 relative bg-cover bg-center bg-no-repeat flex flex-col items-center text-center py-40 px-6 transition-all duration-1000 ease-in-out" >
        <div className="flex justify-center items-center">
      <img
            alt="Avatar"
            src="flower.jpeg"
            className="h-[300px] w-[300px] object-cover rounded-full z-10 "
          />
          </div>
        <h1 className="text-4xl mt-[80px] font-bold text-pink-800">Welcome to Studify Demo</h1>
        <p className="text-xl text-gray-600 mt-4">Discover the innovative features that make Studify the perfect platform for students!</p>
        <a href="/"className="mt-[50px] inline-block shrink-0 rounded-md border border-pink-400 bg-pink-400 px-12 py-3 text-sm text-white font-semibold transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-white-500 animate-bounce">
        Go back to home page
         </a>
      </section>

      <section className="bg-pink-600 py-12 px-6 text-white rounded-lg shadow-lg">
  <div className="max-w-6xl mx-auto text-center space-y-6">
    <h2 className="text-4xl font-semibold">Join Studify Today!</h2>
    <p className="text-lg">
      Become part of our growing community of students, collaborate on projects, seek advice, and build valuable connections with peers. Join now to start networking with like-minded individuals!
    </p>
    <a 
      href="/Login_page" 
      className="inline-block px-6 py-3 bg-white text-pink-500 font-semibold text-lg rounded-lg shadow-md hover:bg-pink-100 transition duration-300"
    >
      Go to Login
    </a>
  </div>
</section>

     {/* Features Section */}
<section className="py-12 px-6">
  <div className="max-w-6xl mx-auto space-y-12">
    
    {/* Feature 1: Calendar */}
    <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
      <img 
        src="/Bear.jpeg" 
        alt="Profile Management" 
        className="w-full sm:w-48 md:w-56 lg:w-48 xl:w-52 2xl:w-64 rounded-lg shadow-md" 
      />
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold text-gray-800">1. Personal Calendar</h2>
        <p className="text-gray-600 text-lg">
          The calendar allows you to organize your tasks and events. Easily view and add tasks to specific dates, and stay on top of your schedule. 
          The calendar shows the number of tasks on a given day, helping you to visualize your productivity.
        </p>
      </div>
    </div>

    {/* Feature 2: Task Management */}
    <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
      <img 
        src="/flower.jpeg" 
        alt="Profile Management" 
        className="w-full sm:w-48 md:w-56 lg:w-48 xl:w-52 2xl:w-64 rounded-lg shadow-md" 
      />
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold text-gray-800">2. Task Management</h2>
        <p className="text-gray-600 text-lg">
          Stay organized by adding tasks to your calendar. You can add new tasks, mark them as complete, and keep track of them efficiently.
          The task feature helps you break down your study routine and other responsibilities with ease.
        </p>
      </div>
    </div>

    {/* Feature 3: To-Do List */}
    <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
      <img 
        src="/cute.jpeg" 
        alt="Profile Management" 
        className="w-full sm:w-48 md:w-56 lg:w-48 xl:w-52 2xl:w-64 rounded-lg shadow-md" 
      />
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold text-gray-800">3. To-Do List</h2>
        <p className="text-gray-600 text-lg">
          The to-do list allows you to track small tasks that are essential for your daily activities. You can easily add and manage to-dos,
          ensuring you don’t miss out on small but important tasks. Keep your day organized with this handy feature!
        </p>
      </div>
    </div>

    {/* Feature 4: Profile Management */}
    <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
      <img 
        src="/jeje.png" 
        alt="Profile Management" 
        className="w-full sm:w-48 md:w-56 lg:w-48 xl:w-52 2xl:w-64 rounded-lg shadow-md" 
      />
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold text-gray-800">4. Profile Management</h2>
        <p className="text-gray-600 text-lg">
          Customize your Studify profile by uploading your profile picture and adding links to your personal or professional websites.
          You can share your profile with others to connect and collaborate on projects or activities.
        </p>
      </div>
    </div>

    {/* Feature 5: Customizable Theme */}
    <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
      <img 
        src="/icons.jpeg" 
        alt="Customizable Theme" 
        className="w-full sm:w-48 md:w-56 lg:w-48 xl:w-52 2xl:w-64 rounded-lg shadow-md" 
      />
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold text-gray-800">5. Customizable Theme</h2>
        <p className="text-gray-600 text-lg">
          Studify offers a customizable theme to match your style. Choose between different color themes (pink, blue, green, yellow) 
          to personalize the look of your dashboard and make it uniquely yours.
        </p>
      </div>
    </div>
    
  </div>
</section>

      {/* Notice Banner */}
      {showNotice && (
        <div className="bg-pink-300 text-white p-4 fixed top-0 left-0 right-0 flex justify-between items-center">
          <div className="flex flex-col">
            <h2 className="font-bold text-2xl">Notice</h2>
            <p className="text-sm">This is just the demo page. It's coming soon after I finish submitting this project to Ajarn Warodom!</p>
          </div>
          <button
            onClick={() => setShowNotice(false)}
            className="text-white font-bold text-lg"
          >
            X
          </button>
        </div>
      )}

      <header className="flex items-center justify-between p-4 bg-white shadow-md mt-20">
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

      <div className="flex-1 flex justify-center py-8 px-4">
        <div className="max-w-6xl w-full bg-white rounded-lg shadow-lg p-6 flex gap-8">
          {/* Hero Section with Explanations */}
          <div className="flex-1 space-y-8">
            <div className="bg-pink-200 p-4 rounded-lg text-center">
              <h2 className="text-2xl font-bold text-gray-800">This is the demo design. It's coming soon after I finish submitting this project to Ajarn Warodom!</h2>
              <img src="/flower.jpeg" alt="Coming Soon" className="mx-auto mt-4" style={{ width: '150px' }} />
            </div>

            {/* Calendar Component */}
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Your Calendar</h2>
              <p className="text-gray-500 mb-4">This is your personal calendar to help you stay organized with tasks and events.</p>
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

            {/* Task Input Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Add a Task</h2>
              <p className="text-gray-500 mb-4">Quickly add tasks to your calendar for better time management.</p>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={task}
                  onChange={handleTaskChange}
                  placeholder="Enter task"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none"
                />
                <button
                  onClick={handleAddTask}
                  className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                >
                  Add Task
                </button>
              </div>
            </div>

            {/* To-Do List */}
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">To-Do List</h2>
              <p className="text-gray-500 mb-4">Keep track of your small tasks and goals here!</p>
              <ul className="space-y-3">
                {todos.map((todoItem, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-2 p-3 bg-pink-100 rounded-lg shadow-sm"
                  >
                    <span>{todoItem}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center space-x-2 mt-4">
                <input
                  type="text"
                  value={todo}
                  onChange={handleTodoChange}
                  placeholder="Enter to-do item"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                />
                <button
                  onClick={handleAddTodo}
                  className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                >
                  Add To-Do
                </button>
              </div>
            </div>
          </div>

          {/* Profile Section */}
          <div className="w-80 bg-white p-6 rounded-lg shadow-xl space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Profile</h2>
            <div className="flex flex-col items-center">
              <label htmlFor="profileImage" className="cursor-pointer">
                <div className="px-6 py-3 bg-pink-500 text-white rounded-lg">Upload Image</div>
                <input
                  type="file"
                  id="profileImage"
                  onChange={handleProfileImageChange}
                  className="hidden"
                />
              </label>
              {profileImage && (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-32 h-32 object-cover rounded-full mt-4"
                />
              )}
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={newLink}
                onChange={handleLinkChange}
                placeholder="Enter profile link"
                className="border border-gray-300 rounded-lg py-2 px-4 w-full"
              />
              <button
                onClick={handleAddLink}
                className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 w-full"
              >
                Add Link
              </button>
              <ul className="space-y-3 mt-4">
                {profileLinks.map((link, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      {link}
                    </a>
                  </li>
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
