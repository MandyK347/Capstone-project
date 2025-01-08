// src/api.js
import axios from 'axios';

export const fetchBooks = async (query) => {
  try {
    // Open Library API URL for searching books
    const response = await axios.get('https://openlibrary.org/search.json', {
      params: {
        q: query, // The search query (title, author, etc.)
        limit: 10, // Limits the number of books returned
      },
    });
    return response.data.docs; // Returns the book items from Open Library API
  } catch (error) {
    console.error('Error fetching books:', error);
    return []; // Return an empty array if there's an error
  }
};
