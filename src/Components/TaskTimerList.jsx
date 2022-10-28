import React, { useState, useEffect } from "react";
import { useProjectsContext } from "../Context/ProjectContext";

const playIcon = <img src="https://cdn-icons-png.flaticon.com/512/27/27223.png" width="20"></img>
const stopIcon = <img src="https://cdn-icons-png.flaticon.com/512/151/151859.png" width="20"></img>
const resetIcon = <img src="https://cdn-icons-png.flaticon.com/512/32/32303.png" width="25"></img>

function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString('sv-SE')
}

function leadingZero(num) {
  return num < 10 ? '0' + num : num;
  }

function convertTime( ms ) {
  let seconds = ms / 1000;
  seconds = seconds % 3600;
  const minutes = parseInt( seconds / 60 );
  seconds = seconds % 60;
  return leadingZero(minutes) + ":" + leadingZero(seconds.toFixed(1));
}

function Timer({ task }) {
  const [displayTime, setDisplayTime] = useState("00:00");
  const [timerId, setTimerId] = useState(0)
  const { dispatch } = useProjectsContext();
  const start = task.timer.startTime
  const stop = task.timer.stopTime
  const on = task.timer.timerOn


  useEffect(() => {
    if (on) {
      const newTimerId = setInterval(() => {
        const newTime = Date.now() - start
        setDisplayTime(convertTime(newTime))
      }, 10)
      setTimerId(newTimerId)
    } else if (stop && start) {
      const newTime = stop - start
      setDisplayTime(convertTime(newTime))
      clearInterval(timerId)
    } else {
      setDisplayTime("00:00")
      clearInterval(timerId)
    }
  }, [start, stop, on]);

  return (
    <>
      <div>
        <h2>{task.text}</h2>
      <p>{displayTime}</p>
      </div>
      
      <div className="timerButtons">
        {on === false && (
          <button className="timerbutton" onClick={() => dispatch({ type: "taskStarted", id: task.id })}>{playIcon}</button>
        )}
        {on === true && (
          <button className="timerbutton" onClick={() => dispatch({ type: "taskStopped", id: task.id })}>{stopIcon}</button>
        )}
        {<button className="timerbutton" onClick={() => dispatch({ type: "taskReset", id: task.id })}>{resetIcon}</button>}
      </div>
    </>
  );
}

function TaskTimerList() {
  const { projects } = useProjectsContext();
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    let newTasks = []
    projects.forEach((project) => {
        newTasks = newTasks.concat(project.tasks)
    })
    setTasks(newTasks)
},[projects])

  return (
    <div>
      {tasks.map((task) => (
      <>
        <h3>{formatDate(task.date)}</h3>
        <div className="timertask" key={task.id}>
          <Timer task={task} />
        </div>
        </>
      ))}
    </div>
  );
}


export default TaskTimerList;