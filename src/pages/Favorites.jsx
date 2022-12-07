import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import service from "../api/apiHandler";
import BackButton from "../components/BackButton/BackButton";
import Footer from "../components/Footer/Footer";
import "../styles/Favorites.css";

const Favorites = () => {
  const [allFavBooks, setAllFavBooks] = useState(null);

  useEffect(() => {
    service.get("/api/me/favorites").then((response) => {
      console.log("response", response.data);
      setAllFavBooks(response.data);
    });
  }, []);

  if (!allFavBooks) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="favorites">
      <BackButton />
      <h2>Mes livres favoris</h2>
      <ul className="fav-books">
        {allFavBooks.map((book, index) => (
          <Link key={book.ebook._id} to={`/books/${book.ebook._id}`}>
            <li>
              <img
                src={book.ebook.formats["image/jpeg"]}
                alt={book.ebook.title}
              />
            </li>
          </Link>
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default Favorites;
