import { createContext, useReducer, useContext } from "react";
import { projectReducer } from "../Reducers/ProjectReducer";

let initialData = []

export const isDataLoaded = false

export const initialTime = {
  startTime: undefined,
  stopTime: undefined,
  timerOn: false,
};

export async function fetchData() {
  const res = await fetch("http://localhost:3000/projects")
  const data = await res.json()
  console.log(data)
  initialData = data
  return Promise.resolve()
}
 
export const ProjectsContext = createContext({
  projects: initialData
});

export function ProjectsProvider({ children }) {
  const [projects, dispatch] = useReducer(projectReducer, initialData)

  const providerValue = {
    projects,
    dispatch
  }

  return (
    <ProjectsContext.Provider value={providerValue}>
      {children}
    </ProjectsContext.Provider>
  )
}

export function useProjectsContext() {
  const context = useContext(ProjectsContext);

  if (!context) {
    throw new Error("useProjectsContext är utanför ProjectsProvidern");
  }

  return context;
}
