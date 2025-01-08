// src/api.js
import axios from 'axios';

// Fetch books based on search query
export const fetchBooks = async (query) => {
  try {
    const response = await axios.get('https://openlibrary.org/search.json', {
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

// Fetch detailed information of a single book using its key
export const fetchBookDetails = async (bookKey) => {
  try {
    const response = await axios.get(`https://openlibrary.org/api/books`, {
      params: {
        bibkeys: `OLID:${bookKey}`,
        format: 'json',
        jscmd: 'data',
      },
    });

    const bookData = response.data[`OLID:${bookKey}`];
    
    return {
      title: bookData.title,
      authors: bookData.authors?.map((author) => author.name),
      publisher: bookData.publishers?.[0]?.name,
      publishDate: bookData.publish_date,
      pages: bookData.number_of_pages,
      description: bookData.description?.value,
      cover: bookData.cover ? `https://covers.openlibrary.org/b/id/${bookData.cover.i}-L.jpg` : null,
    };
  } catch (error) {
    console.error('Error fetching book details:', error);
    return {};
  }
};
