import React from "react";
import TaskTimerList from "../Components/TaskTimerList";

function TimeTracker() {
  return (
    <>
      <h1>Timer</h1>
      <div className="timertasklist">
        <TaskTimerList />
      </div>
    </>
  );
}

export default TimeTracker;