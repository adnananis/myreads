import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

function SearchPage({ myBooks, onShelfChange }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    let active = true;
    BooksAPI.search(query, 20).then(data => {
      if (!active) return;
      if (!data || data.error) {
        setResults([]);
      } else {
        // Merge shelf info from myBooks
        const merged = data.map(book => {
          const found = myBooks.find(b => b.id === book.id);
          return found ? { ...book, shelf: found.shelf } : { ...book, shelf: "none" };
        });
        setResults(merged);
      }
    });
    return () => { active = false; };
  }, [query, myBooks]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/" aria-label="Close search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {results.map(book => (
            <li key={book.id}>
              <Book book={book} onShelfChange={onShelfChange} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default SearchPage;
