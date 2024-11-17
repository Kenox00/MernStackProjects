import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:7000')
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            {books.map((book, index) => (
                <div key={book.id || index}>
                    <h2>{book.title}</h2>
                    <p>{book.author}</p>
                    <p>{book.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Home;
