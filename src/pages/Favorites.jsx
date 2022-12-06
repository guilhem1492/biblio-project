import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import service from "../api/apiHandler";
import BackButton from "../components/BackButton/BackButton";
import Profile from "./Profile";

const Favorites = () => {
  const [allFavBooks, setAllFavBooks] = useState(null);

  useEffect(() => {
    service.get("/api/auth/me/favorites").then((response) => {
      console.log("response", response.data);
      setAllFavBooks(response.data);
    });
  }, []);

  if (!allFavBooks) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <Profile />
      <ul className="fav-books">
        {allFavBooks.map((book, index) => (
          <Link key={book.ebook._id} to={`/books/${book.ebook._id}`}>
            <li>
              <h3>{book.ebook.title}</h3>

              <h4>{book.ebook.author?.name}</h4>

              <img
                src={book.ebook.formats["image/jpeg"]}
                alt={book.ebook.title}
              />
              <hr />
            </li>
          </Link>
        ))}
      </ul>
      <BackButton />
    </div>
  );
};

export default Favorites;
