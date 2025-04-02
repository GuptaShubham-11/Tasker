# Tasker With Weather 🌡️

A task management app that allows users to add tasks with customizable priority, description, and type (indoor or outdoor). For outdoor tasks, users can also enter a city to fetch the current weather and use that information to prioritize or plan the task better.

## Features

- 📋 **Task Management**: Add tasks with a title, description, priority, and type.
- 🏠 **Indoor or Outdoor Tasks**: Option to mark tasks as either indoor or outdoor.
- 🌤 **Weather Fetching**: Fetch weather data for outdoor tasks to plan better (temperature, condition, wind speed).
- 🔥 **Task Prioritization**: Set task priorities: High, Medium, or Low.
- 🌙 **Dark & Light Modes**: Stylish UI with both dark and light themes for better user experience.

## Technologies Used

- **Frontend**: React, Redux, Tailwind CSS
- **Backend**: No backend, uses local state management for task storage
- **Weather API**: Fetch weather data for outdoor tasks based on city input
- **Icons**: Lucide React for UI icons (Clipboard, FileText, Flag, MapPin, Sun)
- **State Management**: Redux for managing tasks and weather data

## Installation

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/GuptaShubham-11/Tasker.git
   cd tasker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and go to [http://localhost:5173](http://localhost:5173).

## Usage

- 🚀 **Start the app** and you'll see an interface to add a task.
- ✏️ **Input the title and description** of your task.
- ⚡ **Choose the priority** (High, Medium, or Low).
- 🏠 **Select task type**: Whether the task is "Indoor" or "Outdoor."
- 🌍 **Outdoor tasks**: If the task is "Outdoor," enter a city to fetch the weather for that location.

## Screenshots

Here are some screenshots of the app in action:

![Home](/screenshortsOfTasker/HomeL.jpeg)
![Home](/screenshortsOfTasker/HomeD.jpeg)

### **Home**

![Login](/screenshortsOfTasker/SignIn.jpeg)

### **Login**

![Tasks](/screenshortsOfTasker/TaskL.jpeg)

### **Tasks**

![Mobile](/screenshortsOfTasker/Mobile.jpeg)

### **Mobile View**

![Mobile](/screenshortsOfTasker/Dashboard.jpeg)

### **Dashboard**

## Contributing

1. 🍴 Fork the repository.
2. 🌿 Create a new branch for your feature or bugfix (`git checkout -b feature-name`).
3. 📜 Commit your changes (`git commit -am 'Add feature'`).
4. 🔼 Push to the branch (`git push origin feature-name`).
5. 📝 Open a pull request.

## Acknowledgments

- **Lucide**: For providing beautiful icons.
- **React & Redux**: For the state management system.
- **Tailwind CSS**: For styling the application.
