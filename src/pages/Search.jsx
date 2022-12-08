import React from "react";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import service from "../api/apiHandler";
import Footer from "../components/Footer/Footer";
import "../styles/Search.css";

const SearchTitle = () => {
  const [allBooks, setAllBooks] = useState(null);
  const [query] = useSearchParams();
  const title = query.get("title");
  const author = query.get("author");

  const apiQuery = title ? `title=${title}` : `author=${author}`;

  useEffect(() => {
    service.get(`/api/search?${apiQuery}`).then((response) => {
      //console.log("response.data", response.data);
      setAllBooks(response.data);
    });
  }, [title, author]);

  if (!allBooks) {
    return (
      <div className="search">
        <p style={{ color: "black", fontWeight: "bold", fontSize: "2rem" }}>
          Chargement...
        </p>
      </div>
    );
  }

  return (
    <div className="search">
      {!allBooks.length && (
        <p style={{ color: "red", fontWeight: "bold", fontSize: "2rem" }}>
          Ebook introuvable !
        </p>
      )}
      {allBooks && (
        <>
          <ul className="found-books">
            {allBooks.map((book, index) => (
              <Link key={book.id} to={`/books/${book._id}`}>
                <li>
                  <img src={book.formats["image/jpeg"]} alt={book.title} />
                </li>
              </Link>
            ))}
          </ul>
        </>
      )}

      <Footer />
    </div>
  );
};

export default SearchTitle;
