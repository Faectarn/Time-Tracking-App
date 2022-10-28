import React, { useState, useEffect } from "react";
import { useProjectsContext } from "../Context/ProjectContext";
import Form from 'react-bootstrap/Form';

function Calendar() {
  const { projects } = useProjectsContext()
  const [tasksByDate, setTasksByDate] = useState([])
  const [selectedDate, setSelectedDate] = useState("")
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const selectedTasks = tasksByDate.filter((date) => date.date === selectedDate)
    if (selectedTasks[0]) {
      setTasks(selectedTasks[0].tasks)
    } else {
      setTasks([])
    }
  }, [selectedDate])

  useEffect(() => {
    let taskDates = []
    projects.forEach((project) => {
      project.tasks.forEach((task) => {
        const date = new Date(task.date)
        const formatedDate = date.toLocaleDateString('sv-SE')
        const dateIndex = taskDates.findIndex((e) => e.date === formatedDate)
        if (dateIndex !== -1) {
          taskDates[dateIndex].tasks.push(task)
        } else {
          taskDates.push({
            date: formatedDate,
            tasks: [task]
          })
        }
      })
    })
    setTasksByDate(taskDates)
  }, [projects])

  return (
    <>
      <h1>Calendar</h1>
      <div className="calendar">
        <Form.Select aria-label="Default select example" onChange={(e) => setSelectedDate(e.target.value)}>
          <option value="">Select a date</option>
          {
            tasksByDate.map((date) => (
              <option value={date.date} key={date.date}>
               <h2>{date.date}</h2> 
              </option>
            ))
          }
        </Form.Select>
        <div>
          {
            tasks && tasks.map((task) => (
              <div className="task">
                <h2>{task.text}</h2>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default Calendar;