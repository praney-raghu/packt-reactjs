import React, { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'
import Pagination from 'react-js-pagination';

const apiBaseUrl = process.env.REACT_APP_API_BASEURL

export default function BookList() {

    const [books, setBooks] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(15)
    const [totalBooks, setTotalBooks] = useState(0)

    const fetchBooks = async (page = 1) => {
        await axios.get(`${apiBaseUrl}/books?page=${page}`).then(({ data }) => {
            setBooks(data.data.data)
            setCurrentPage(data.data.meta.current_page)
            setPerPage(data.data.meta.per_page)
            setTotalBooks(data.data.meta.total)
        })
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    return (
        <div className="container text-center">
            <div className="row gy-5">
                {
                    books.length > 0 ? (
                        books.map((book, key) => (
                            <div className="col" key={key}>

                                <div className="card" style={{ width: '18rem' }}>
                                    <img src={book.image} className="card-img-top" style={{ height: '250px' }} alt={book.title} />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <Link to={`/book/${book.id}`} state={{book}}>{book.title}</Link>
                                        </h5>
                                        <span className="badge text-bg-info">{book.genre}</span>
                                        <p className="card-text">{book.description.length > 50 ?
                                            `${book.description.substring(0, 50)}...` : book.description
                                        }</p>
                                        <h6 className="card-text">{book.author}</h6>
                                    </div>
                                </div>

                            </div>
                        ))
                    ) : "Loading ..."
                }
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={perPage}
                    totalItemsCount={totalBooks}
                    onChange={(pageNumber) => {
                        fetchBooks(pageNumber)
                    }}
                    pageRangeDisplayed={10}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First Page"
                    lastPageText="Last Page"
                />
            </div>
        </div>
    )
}