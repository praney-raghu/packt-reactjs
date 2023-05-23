import React from 'react';
import { useLocation } from 'react-router-dom';

const BookDetail = () => {

    const location = useLocation()
    const book = location.state.book

    const createDescMarkup = description => {
        return { __html: description };
    };

    return (
        <section>
            <div>
                <img
                    alt={`${book.title} book`}
                    src={book.image}
                />
                <div>
                    <h3>
                        <strong>Title:</strong> {book.title}
                    </h3>
                    <p>
                        <strong>ISBN:</strong> {book.isbn}
                    </p>
                    <p>
                        <strong>Author:</strong> {book.author}
                    </p>
                    <p>
                        <strong>Genre:</strong> {book.genre}
                    </p>
                    <p>
                        <strong>Published Date:</strong> {book.published}
                    </p>
                    <p>
                        <strong>Publisher:</strong> {book.publisher}
                    </p>
                    <div
                        dangerouslySetInnerHTML={createDescMarkup(
                            book.description
                        )}
                    />
                </div>
            </div>
        </section>
    );
};

export default BookDetail;