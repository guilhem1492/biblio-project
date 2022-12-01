import React from "react";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import service from "./../api/apiHandler";

const Search = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [query] = useSearchParams();
  const books = query.get("books");

  console.log(books);

  useEffect(() => {
    service.get(`/api/search?books=${books}`).then((response) => {
      console.log("response.data", response.data);
      setAllBooks(response.data);
    });
  }, []);

  return (
    <div>
      <ul className="all-beers">
        {allBooks.map((book, index) => (
          <Link to={`/search/${book._id}`}>
            <li key={book._id}>
              {/* <img
                className="beer-img"
                src={beer.image_url}
                alt={`Beer name: ${beer.name}`}
              /> */}
              <h3>{book.title}</h3>
              
              <h4>{book.authors.length ? book.authors[0].name : "Nom de l'auteur non précisé"}</h4>
              {/* {console.log(book.authors[0].name, "index:", index)} */}
              <img src={book.formats["image/jpeg"]} alt={book.title} />
              <hr />
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Search;
