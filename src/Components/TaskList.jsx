import React, { useState, useEffect } from "react";
import { useProjectsContext } from "../Context/ProjectContext";

function TaskList() {
  const { projects } = useProjectsContext();
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    let newTasks = []
    projects.forEach((project) => {
      newTasks = newTasks.concat(project.tasks)
    })
    setTasks(newTasks)
  }, [projects])

  function Task({ task }) {
    const { dispatch } = useProjectsContext();

    function onDelete() {
      dispatch({
        type: "taskDeleted",
        id: task.id
      });
    }

    return (
      <>
        <h2>{task.text}</h2>
        <button className="deleteButton" onClick={onDelete}>❌</button>
      </>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <div className="task" key={task.id}>
          <Task task={task} />
        </div>
      ))}
    </div>
  );
}

export default TaskList;

