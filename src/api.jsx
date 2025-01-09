// src/api.js
import axios from 'axios';

// Fetch books based on a search query
export const fetchBooks = async (query) => {
  try {
    const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`, {
      params: {
        q: query,
        limit: 10,
      },
    });
    return response.data.docs; // Return list of books
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};

// Fetch detailed information about a single book
export const fetchBookDetails = async (bookKey) => {
  try {
    const response = await axios.get(`https://openlibrary.org${bookKey}.json`);
    const book = response.data;

    return {
      title: book.title,
      authors: book.authors ? book.authors.map((author) => author.name).join(', ') : 'Unknown',
      publisher: book.publishers ? book.publishers.join(', ') : 'Unknown',
      publishDate: book.publish_date || 'Unknown',
      isbn: book.isbn_13 ? book.isbn_13.join(', ') : 'Unknown',
      pages: book.number_of_pages || 'Unknown',
      genres: book.subjects ? book.subjects.join(', ') : 'Unknown',
      description: book.description ? book.description.value : 'No description available.',
      cover: book.cover_id ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg` : 'https://via.placeholder.com/128x196.png?text=No+Cover',
    };
  } catch (error) {
    console.error('Error fetching book details:', error);
    return {};
  }
};

