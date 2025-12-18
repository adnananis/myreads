

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Bookshelf from "./Bookshelf";
import SearchPage from "./SearchPage";
import "./App.css";

// Main app
function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then(setBooks);
  }, []);

  const handleShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      setBooks(prevBooks => {
        // If book is already in state, update shelf; else add it
        const exists = prevBooks.find(b => b.id === book.id);
        if (exists) {
          return prevBooks.map(b =>
            b.id === book.id ? { ...b, shelf } : b
          );
        } else {
          return [...prevBooks, { ...book, shelf }];
        }
      });
    });
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/search"
            element={<SearchPage myBooks={books} onShelfChange={handleShelfChange} />}
          />
          <Route
            path="/"
            element={
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <Bookshelf
                    title="Currently Reading"
                    books={books.filter(b => b.shelf === "currentlyReading")}
                    onShelfChange={handleShelfChange}
                  />
                  <Bookshelf
                    title="Want to Read"
                    books={books.filter(b => b.shelf === "wantToRead")}
                    onShelfChange={handleShelfChange}
                  />
                  <Bookshelf
                    title="Read"
                    books={books.filter(b => b.shelf === "read")}
                    onShelfChange={handleShelfChange}
                  />
                </div>
                <div className="open-search">
                  <Link to="/search" aria-label="Add a book">Add a book</Link>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
