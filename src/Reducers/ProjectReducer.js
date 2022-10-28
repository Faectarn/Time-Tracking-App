import { initialTime } from "../Context/ProjectContext"

export async function getData() {
  const res = await fetch("http://localhost:3000/projects")
  const data = await res.json()
  return Promise.resolve(data)
}

async function postData(data) {
  const res = await fetch(`http://localhost:3000/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
}

async function patchData(id, data) {
  const res = await fetch(`http://localhost:3000/projects/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
}

async function deleteData(id, data) {
  const res = await fetch(`http://localhost:3000/projects/${id}`, {
    method: "DELETE"
  })
}

export function projectReducer(state, action) {
  
  if (action.type === "added") {

    const newData = {
      id: parseInt(Math.random()*10000000, 10),
      name: action.name,
      tasks: []
    }

    const newState = [
      ...state,
      newData
    ]
    postData(newData)
    return newState
  }

  if (action.type === "deleted") {
    deleteData(action.id)
    return state.filter(project => project.id !== action.id);
  }

  if (action.type === "taskAdded") {

    const newData = {
      id: parseInt(Math.random()*10000000, 10),
      text: action.text,
      timer: { ...initialTime },
      date: Date.now()
    }

    const data = state.map((project) => {
      if (project.id === action.id) {
        project.tasks = [
          ...project.tasks,
          { ...newData }
        ]
        patchData(action.id, { tasks: project.tasks })
      }
      return project
    })

    return data
  }

  if (action.type === "taskStarted") {
    
    return state.map((project) => {
      const taskIndex = project.tasks.findIndex((task) => task.id === action.id)
      if (taskIndex !== -1) {
        project.tasks[taskIndex].timer.timerOn = true;
        if (project.tasks[taskIndex].timer.stopTime) {
          const diff = project.tasks[taskIndex].timer.stopTime - project.tasks[taskIndex].timer.startTime
          project.tasks[taskIndex].timer.startTime = Date.now() - (diff)
        } else {
          project.tasks[taskIndex].timer.startTime = Date.now();
        }
        patchData(project.id, { tasks: project.tasks })
      }
      return project
    })
  }

  if (action.type === "taskStopped") {
    return state.map((project) => {
      const taskIndex = project.tasks.findIndex((task) => task.id === action.id)
      if (taskIndex !== -1) {
        project.tasks[taskIndex].timer.timerOn = false;
        project.tasks[taskIndex].timer.stopTime = Date.now();
        patchData(project.id, { tasks: project.tasks })
      }
      return project
    })
  }

  if (action.type === "taskReset") {
    return state.map((project) => {
      const taskIndex = project.tasks.findIndex((task) => task.id === action.id)
      if (taskIndex !== -1) {
        project.tasks[taskIndex].timer.timerOn = false;
        project.tasks[taskIndex].timer.startTime = 0;
        project.tasks[taskIndex].timer.stopTime = 0;
        patchData(project.id, { tasks: project.tasks })
      }
      return project
    })
  }

  if (action.type === "taskDeleted") {
    return state.map((project) => {
      const taskIndex = project.tasks.findIndex((task) => task.id === action.id)
      if (taskIndex !== -1) {
        project.tasks = [...project.tasks.filter(task => task.id !== action.id)]
        patchData(project.id, { tasks: project.tasks })
      }
      return project
    })
  }

  return state;
}