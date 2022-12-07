import React from "react";
import Footer from "../components/Footer/Footer";
import service from "../api/apiHandler";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const [someBooks, setSomeBooks] = useState(null);
  console.log(someBooks);

  useEffect(() => {
    service.get("/api").then((response) => {
      setSomeBooks(response.data);
    });
  }, []);

  if (!someBooks) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="home">
      <h1>Bienvenue à la LIBRIOTHÈQUE</h1>
      <p className="intro">
        Bibliothèque numérique proposant plus de 3400 ebooks gratuits en langue
        française.
      </p>
      <ul className="found-books">
        {someBooks.map((book, index) => (
          <Link key={book.id} to={`/books/${book._id}`}>
            <li>
              <img
                className="found-cover"
                src={book.formats["image/jpeg"]}
                alt={book.title}
              />
            </li>
          </Link>
        ))}
      </ul>

      <Footer />
    </div>
  );
};

export default Home;
