import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import BookList from "./components/customer/BookList";
import BookDetail from "./components/customer/BookDetail";
import EditBook from "./components/book/EditBook";
import ListBooks from "./components/book/ListBook";
import AddBook from "./components/book/AddBook";
import Login from "./components/Auth/Login";
import useToken from './components/App/useToken';

function App() {

  const { token, setToken } = useToken();

  return (<Router>
    <Navbar bg="primary">
      <Container>
        <Link to={"/"} className="navbar-brand text-white">
          Book Store
        </Link>
      </Container>
    </Navbar>

    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Routes>
            {/* <Route path="/book/add" element={<AddBook />} />
            <Route path="/book/edit/:id" element={<EditBook />} />
            <Route exact path='/' element={<ListBooks />} /> */}
            <Route exact path="/" element={<BookList />} />
            <Route exact path="/book/:id" element={<BookDetail />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  </Router>);
}

export default App;