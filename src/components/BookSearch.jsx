// src/components/BookSearch.jsx
import React, { useState } from 'react';
import { fetchBooks } from '../api';  // Import the API function

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    const results = await fetchBooks(query);
    setBooks(results);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Search for Books</h1>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-md"
        placeholder="Search by book title or author"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="w-full p-2 mt-2 bg-blue-500 text-white rounded-md"
        onClick={handleSearch}
      >
        Search
      </button>

      {loading && <p className="text-center mt-4">Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className="p-4 border border-gray-300 rounded-md">
              <img
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={book.volumeInfo.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold">{book.volumeInfo.title}</h2>
              <p className="text-sm text-gray-600">{book.volumeInfo.authors?.join(', ')}</p>
              <p className="mt-2 text-gray-700">{book.volumeInfo.description?.slice(0, 150)}...</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full mt-4">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default BookSearch;