import React, { useState } from 'react';
import './App.css'
import BookSearch from './components/BookSearch';
import BookDetails from './components/BookDetails';

function App() {
  const [selectedBook, setSelectedBook] = useState(null); // State to handle book selection

  const handleBookClick = (bookKey) => {
    setSelectedBook(bookKey); // Set selected book to show its details
  };

  const handleBack = () => {
    setSelectedBook(null); // Go back to search results
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Display BookDetails if a book is selected */}
      {selectedBook ? (
        <BookDetails bookKey={selectedBook} onBack={handleBack} />
      ) : (
        <BookSearch onBookClick={handleBookClick} />
      )}
    </div>
  );
}

export default App;
