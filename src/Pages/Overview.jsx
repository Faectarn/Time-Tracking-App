import React from "react";
import ProjectModal from "../Components/ProjectModal";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TaskList from "../Components/TaskList";
import TaskModal from "../Components/TaskModal";
import ProjectList from "../Components/ProjectList";

function Overview() {
  return (
    <>
        <h1>Overview</h1>
      <Tabs
        defaultActiveKey="projects"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="project" title="Projects">
          <ProjectList />
          <ProjectModal />
          <div />
        </Tab>
        <Tab eventKey="tasks" title="Tasks">
          <TaskList />
          <TaskModal />
        </Tab>
      </Tabs>
    </>
  )

}

export default Overview;