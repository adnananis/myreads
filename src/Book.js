import React from "react";
import PropTypes from "prop-types";

function Book({ book, onShelfChange }) {
  const thumbnail = book.imageLinks?.thumbnail || "";

  const shelves = [
    { id: "1", shelfName: "currentlyReading", shelfDisplayName: "Currently Reading" },
    { id: "2", shelfName: "wantToRead", shelfDisplayName: "Want to Read" },
    { id: "3", shelfName: "read", shelfDisplayName: "Read" },
    { id: "4", shelfName: "none", shelfDisplayName: "None" },
  ];

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url('${thumbnail}')`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            value={book.shelf || "none"}
            onChange={e => onShelfChange(book, e.target.value)}
            aria-label={`Change shelf for ${book.title}`}
          >
            <option value="" disabled>
              Move to...
            </option>
            {shelves.map(shelf => (
              <option key={shelf.id} value={shelf.shelfName}>
                {shelf.shelfDisplayName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors?.join(", ")}</div>
    </div>
  );
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onShelfChange: PropTypes.func.isRequired,
};

export default Book;
