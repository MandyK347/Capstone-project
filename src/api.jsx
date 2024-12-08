// src/api.js
import axios from 'axios';

const API_KEY = 'my-book-library-444120'; 

export const fetchBooks = async (query) => {
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
      params: {
        q: query,
        key: API_KEY,
        maxResults: 10,  // Limits the number of books returned
      },
    });
    return response.data.items; // Returns the book items
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};