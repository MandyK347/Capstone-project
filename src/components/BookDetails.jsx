// src/components/BookDetails.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookDetails = ({ bookKey, onBack }) => {
    const [bookDetails, setBookDetails] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get('https://openlibrary.org/api/books?bibkeys=OLID:${bookKey}&format=json&jscmd=data');
                const details = response.data['OLID:${bookKey}'];
                setBookDetails(details);
            } catch (error) {
                console.error('Error fetching book details:, error');
            }
        };
        fetchBookDetails();
    }, [bookKey]);

    if (!bookDetails) return <div>Loading...</div>;

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <button
               onClick={onBack}
               className="px-4 py-2 bg-gray-500 text-white rounded-md mb-4"
            >
                Back to Search
            </button>
            <img
              src={'https://covers.openlibrary.org/b/id/${bookDetails.cover_id}-L.jpg'}
              alt={bookDetails.tilte}
              className="w-full h-96 objecj-cover"
            />
            <h3 className="mt-4 font-bold text-3xl">{bookDetails.title}</h3>
            <p className="text-xl text-gray-700">{bookDetails.authors?.map(author => author.name).join(', ')}</p>
            <p className="text-gray-500 mt-2">{bookDetails.publish_date}</p>
            <p className="mt-4">{bookDetails.description?.value || 'No description available.'}</p>
        </div>
    );
};

export default BookDetails;