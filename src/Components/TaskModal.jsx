import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useProjectsContext } from '../Context/ProjectContext';

function TaskModal() {
    const { dispatch, projects } = useProjectsContext()
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [projectId, setProjectId] = useState(-1)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleSubmit() {
        dispatch({
            type: "taskAdded",
            id: projectId,
            text: name
        })
        setShow(false)
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add new task
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                name="taskName"
                                id="taskName"
                                placeholder="Task name"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Select aria-label="Default select example" onChange={(e) => setProjectId(parseInt(e.target.value))}>
                            <option value="">Select a project</option>
                            {
                                projects.map((project) => (
                                    <option value={project.id} key={project.id}>
                                        {project.name}
                                    </option>
                                ))
                            }
                        </Form.Select>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit} disabled={projectId === -1 || name === ""}>
                        Add task
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default TaskModal