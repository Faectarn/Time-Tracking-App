import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/App.css';
import './Styles/Typography.css';
import './Styles/TimeTracker.css';
import './Styles/Overview.css';
import './Styles/Calendar.css';
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Root from "./Pages/Root";
import ErrorPage from "./Pages/ErrorPage";
import Calendar from "./Pages/Calendar";
import TimeTracker from "./Pages/TimeTracker";
import Overview from "./Pages/Overview";
import { fetchData, ProjectsProvider } from "./Context/ProjectContext";

async function init() {
  await fetchData() // väntar på att få in data från json-server

  const router = createBrowserRouter([
    {
       path: "/",
       element: <Root />,
       errorElement: <ErrorPage />,
       children: [
         {
           path: "/TimeTracker",
           element: <TimeTracker />,
         },
         {
           path: "Calendar",
           element: <Calendar />,
         },
         {
           path: "Overview",
           element: <Overview />,
         },
       ],
     },
   ]);

  ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
      <ProjectsProvider>
        <RouterProvider router={router} />
      </ProjectsProvider>
    // </React.StrictMode>
  );
}

init()