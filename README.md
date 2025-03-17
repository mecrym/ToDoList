# ToDo List Application  

A simple and interactive task management application built using React and Bootstrap. It provides functionalities such as task creation, search, calendar view, task completion, archiving, and statistical visualization of tasks. 

  ## Features  
  
  - ✅ **Task Management:** Create, edit, delete, and mark tasks as completed and archive them.  
  - 🔎 **Search Functionality:** Quickly find tasks using a search bar.  
  - 📅 **Calendar View:** Visual representation of tasks on a calendar.  
  - 📊 **Task Statistics:** Graphical representation of completed and pending tasks using charts.  
  - 🔍 **Filtering Options:** View tasks by status (all, active, archived).  

## Technologies Used  
  
  ### Frontend  
  
  - **React.js** - JavaScript library for building user interfaces.  
  - **React Bootstrap** - UI framework for styling and responsive components.  
  - **Chart.js** - Used for generating visual statistics of task completion.  
  - **date-fns** - Library for manipulating and formatting dates in JavaScript.  
  - **Axios** - Promise-based HTTP client for API requests.  
  
  ### Backend (Expected API)  
  
  - **Node.js - Handles CRUD operations on tasks.  
  - **JSON-based Mock API** - Placeholder for storing and managing tasks.  

## API Structure (Mock Data)
The application interacts with an API that follows this structure:
  ```json
    [
    	{
    		"id": 1,
    		"description": "Finish Robbson's project",
    		"end_date": "2025-03-17",
    		"completed": false,
    		"archived": false
    	},
    	{
    		"id": 2,
    		"description": "Study for discrete math exam",
    		"end_date": "2025-03-20",
    		"completed": true,
    		"archived": false
    	},
    	{
    		"id": 3,
    		"description": "Prepare slides for project presentation",
    		"end_date": "2025-03-26",
    		"completed": true,
    		"archived": false
    	},
    	{
    		"id": 4,
    		"description": "Review authentication module code",
    		"end_date": "2025-03-19",
    		"completed": false,
    		"archived": false
    	},
    	{
    		"id": 5,
    		"description": "Schedule meeting with the development team",
    		"end_date": "2025-03-21",
    		"completed": false,
    		"archived": false
    	},
    	{
    		"id": 6,
    		"description": "Send progress report to the manager",
    		"end_date": "2025-03-22",
    		"completed": true,
    		"archived": false
    	},
    	{
    		"id": 7,
    		"description": "Go grocery shopping",
    		"end_date": "2025-03-18",
    		"completed": false,
    		"archived": false
    	}
    ]
```
### Bibliography
- 📖 React Documentation: https://pt-br.react.dev/learn
- 📖 React Tutorial: https://www.w3schools.com/react/default.asp
- 📖 React Tabs: https://mui.com/material-ui/react-tabs/?srsltid=AfmBOopEJn3Afxe1Pl1ONFDrDC-WwUwXtzdX205xT2mSWzaITEgzAKZv
- 🎨 Bootstrap Documentation: https://react-bootstrap.github.io/
- 📊 Chart.js Documentation: https://www.chartjs.org/
- ⏳ date-fns Documentation: https://date-fns.org/
- 🌐 Axios Documentation: https://axios-http.com/
- 🎥 Video: https://www.youtube.com/watch?v=CgkZ7MvWUAA
