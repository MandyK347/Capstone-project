// src/components/BookCard.jsx
import React from 'react';

const BookCard = ({ book, onClick }) => {
    return (
        <div className="max-w-xs mx-auto my-4 p-4 border rounded-md shadow-lg">
            <img
              src={'https://cover.openlibrary.org/b/id/${book.cover_i}-L.jpg'}
              alt={book.title}
              className="w-full h-48 object-cover"
            />
            <h3 className="mt-2 font-bold text-xl">{book.title}</h3>
            <p className="text-gray-500">{book.author_name?.join(', ')}</p>
            <button
              onClick={() => onClick(book.key)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              View Details
            </button>
        </div>
    );
};

export default BookCard;