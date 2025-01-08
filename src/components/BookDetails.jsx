// src/components/BookDetails.jsx
import React, { useEffect, useState } from 'react';
import { fetchBookDetails } from '../api';  // Import API function to fetch detailed book data

const BookDetails = ({ bookKey, onBack }) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch detailed book info
  useEffect(() => {
    const getBookDetails = async () => {
      const data = await fetchBookDetails(bookKey);
      setBook(data);
      setLoading(false);
    };

    getBookDetails();
  }, [bookKey]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button 
        onClick={onBack} 
        className="mb-4 p-2 bg-blue-500 text-white rounded-md"
      >
        Back to Search Results
      </button>

      <div className="flex flex-col sm:flex-row items-center">
        {/* Book Cover */}
        {book.cover && (
          <img 
            src={book.cover} 
            alt={book.title} 
            className="w-48 h-72 object-cover rounded-md mb-4 sm:mb-0 sm:mr-8" 
          />
        )}

        <div>
          {/* Book Title */}
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>

          {/* Book Details */}
          <p className="text-lg mb-2"><strong>Author(s):</strong> {book.authors?.join(', ')}</p>
          <p className="text-lg mb-2"><strong>Publisher:</strong> {book.publisher || 'Unknown'}</p>
          <p className="text-lg mb-2"><strong>Published:</strong> {book.publishDate || 'Unknown'}</p>
          <p className="text-lg mb-2"><strong>Pages:</strong> {book.pages || 'N/A'}</p>

          {/* Description */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p>{book.description || 'No description available.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
