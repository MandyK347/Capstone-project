import { useState } from 'react';
import './App.css';
import BookSearch from './components/BookSearch';
import BookCard from './components/BookCard';
import BookDetails from './components/BookDetails';
import { fetchBooks } from './api';  // Import the fetchBooks function

function App() {
  const [books, setBooks] = useState([]);  // State to store book list
  const [selectedBook, setSelectedBook] = useState(null);  // State for selected book

  const handleSearch = async (query) => {
    const bookData = await fetchBooks(query);
    setBooks(bookData);
    setSelectedBook(null);  // Reset selection when new search is performed
  };

  const handleBookClick = (bookKey) => {
    setSelectedBook(bookKey);  // Set the book as selected
  };

  const handleBack = () => {
    setSelectedBook(null);  // Reset the selection when "Back" is clicked
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="text-center p-6">
        <h1 className="text-4xl font-bold">Book Library</h1>
      </header>

      {/* Search Bar */}
      <BookSearch onSearch={handleSearch} />

      {/* Display BookDetails if a book is selected */}
      {selectedBook ? (
        <BookDetails bookKey={selectedBook} onBack={handleBack} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {/* Display BookCards if no book is selected */}
          {books.map((book) => (
            <BookCard key={book.key} book={book} onClick={handleBookClick} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
