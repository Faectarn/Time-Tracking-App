import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useProjectsContext } from '../Context/ProjectContext';

function ProjectModal() {
    const { projects, dispatch } = useProjectsContext()
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function onSubmit() {
        const res = dispatch({
            type: "added",
            name
        });
        setShow(false)
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add new project
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Control
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                name="projectName"
                                id="projectName"
                                placeholder="Project name"
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={onSubmit}>
                        Add project
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ProjectModal
