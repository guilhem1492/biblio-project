import React from "react";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import service from "../api/apiHandler";
import Footer from "../components/Footer/Footer";

const SearchTitle = () => {
  const [allBooks, setAllBooks] = useState([]);
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

  return (
    <div>
      <ul className="found-books">
        {allBooks.map((book, index) => (
          <Link to={`/books/${book._id}`}>
            <li key={book._id}>
              <h3>{book.title}</h3>

              <h4>
                {book.author ? book.author.name : "Nom de l'auteur non précisé"}
              </h4>
              {/* {console.log(book.authors[0].name, "index:", index)} */}
              <img src={book.formats["image/jpeg"]} alt={book.title} />
              <hr />
            </li>
          </Link>
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default SearchTitle;
