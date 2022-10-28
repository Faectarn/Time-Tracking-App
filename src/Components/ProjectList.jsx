import React from 'react'
import { useProjectsContext } from "../Context/ProjectContext";

function ProjectList() {
    const { projects, dispatch } = useProjectsContext()

    function handleDelete(id) {
        dispatch({
            type: "deleted",
            id: id
        });
    }

    return (
        <div>{
            projects.map((project) => (
                <div className="task">
                    <h2>{project.name}</h2>
                    <button className="deleteButton" onClick={() => handleDelete(project.id)}>❌</button>
                </div>
            ))
        }</div>
    )
}

export default ProjectList