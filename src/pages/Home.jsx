import React from "react";
import Footer from "../components/Footer/Footer";
import service from "../api/apiHandler";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const Home = () => {
  const [someBooks, setSomeBooks] = useState([]);

  useEffect(() => {
    service.get("/api").then((response) => {
      setSomeBooks(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Bienvenue sur la LIBRIOTHÈQUE</h1>
      <h2>
        Bibliothèque en accès libre proposant plus de 3000 livres numériques
        gratuits en langue française.
      </h2>
      <ul className="found-books">
        {someBooks.map((book, index) => (
          <Link key={book.id} to={`/books/${book._id}`}>
            <li>
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

export default Home;
