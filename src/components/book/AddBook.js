import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

const apiBaseUrl = process.env.REACT_APP_API_BASEURL

export default function AddBook() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [description, setDescription] = useState("")
    const [genre, setGenre] = useState("")
    const [isbn, setIsbn] = useState("")
    const [image, setImage] = useState()
    const [published, setPublished] = useState("")
    const [publisher, setPublisher] = useState("")
    const [validationError, setValidationError] = useState({})

    const changeHandler = (event) => {
        setImage(event.target.files[0]);
    };

    const addBook = async (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append('title', title)
        formData.append('author', author)
        formData.append('genre', genre)
        formData.append('isbn', isbn)
        formData.append('description', description)
        formData.append('published', published)
        formData.append('publisher', publisher)
        formData.append('image', image)

        await axios.post(`${apiBaseUrl}/book/add`, formData).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            })
            navigate("/")
        }).catch(({ response }) => {
            if (response.status === 422) {
                setValidationError(response.data.errors)
            } else {
                Swal.fire({
                    text: response.data.message,
                    icon: "error"
                })
            }
        })
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Add Book</h4>
                            <hr />
                            <div className="form-wrapper">
                                {
                                    Object.keys(validationError).length > 0 && (
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="alert alert-danger">
                                                    <ul className="mb-0">
                                                        {
                                                            Object.entries(validationError).map(([key, value]) => (
                                                                <li key={key}>{value}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                <Form onSubmit={addBook}>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Name">
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control type="text" value={title} onChange={(event) => {
                                                    setTitle(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="my-3">
                                        <Col>
                                            <Form.Group controlId="Description">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control as="textarea" rows={3} value={description} onChange={(event) => {
                                                    setDescription(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Author">
                                                <Form.Label>Author</Form.Label>
                                                <Form.Control type="text" value={author} onChange={(event) => {
                                                    setAuthor(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Genre">
                                                <Form.Label>Genre</Form.Label>
                                                <Form.Control type="text" value={genre} onChange={(event) => {
                                                    setGenre(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="ISBN">
                                                <Form.Label>ISBN</Form.Label>
                                                <Form.Control type="text" value={isbn} onChange={(event) => {
                                                    setIsbn(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Published">
                                                <Form.Label>Published</Form.Label>
                                                <Form.Control type="date" value={published} onChange={(event) => {
                                                    setPublished(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Publisher">
                                                <Form.Label>Publisher</Form.Label>
                                                <Form.Control type="text" value={publisher} onChange={(event) => {
                                                    setPublisher(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Image" className="mb-3">
                                                <Form.Label>Image</Form.Label>
                                                <Form.Control type="file" onChange={changeHandler} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                                        Save
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}