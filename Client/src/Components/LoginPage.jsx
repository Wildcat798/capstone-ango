import React, { useRef } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { v4 } from 'uuid'

export default function LoginPage({idSubmit}) {
    const idRef = useRef()

    function handleSubmit(e) {
        e.preventDefault()

        idSubmit(idRef.current.value)
    }

    function createNewId() {
        idSubmit(v4())
    }

    return (
        <Container className="align-items-center d-flex" style={{ height:'100vh'}}>
            <Form onSubmit={handleSubmit} className="w-100">
                <Form.Group>
                    <Form.Label>Enter Your Id</Form.Label>
                    <Form.Control type="text" ref={idRef}></Form.Control>
                </Form.Group>
                <Link to='/dash'><Button type="submit">Login</Button>
                <Button onClick={createNewId} variant="secondary">Create New Id</Button>
                </Link>
            </Form>
        </Container>
    )
}