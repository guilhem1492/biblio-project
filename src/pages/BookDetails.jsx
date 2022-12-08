import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link, Routes, Route, useNavigate } from "react-router-dom";
import service from "../api/apiHandler";
import BackButton from "../components/BackButton/BackButton";
import Footer from "../components/Footer/Footer";
import ButtonAddFav from "../components/ButtonAddFav/ButtonAddFav";
import "../styles/BookDetails.css";

const BookDetails = () => {
  const [foundBook, setFoundBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { bookId } = useParams();
  const navigate = useNavigate();
  console.log("bookId", bookId);
  console.log("foundBook", foundBook);

  useEffect(() => {
    service
      .get(`/api/books/${bookId}`)
      .then(({ data }) => {
        setFoundBook(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  }, [bookId]);

  return (
    <div className="book-details">
      <BackButton />
      <div className="book-img-and-details">
        {!foundBook && (
          <p
            style={{
              color: loading ? "black" : "red",
              fontWeight: "bold",
              fontSize: "2rem",
              margin: "0 auto",
            }}
          >
            {loading ? "Chargement..." : "Ebook introuvable !"}
          </p>
        )}
        {foundBook && (
          <>
            <img
              className="cover-book-details"
              src={foundBook.formats["image/jpeg"]}
              alt={foundBook.title}
            />
            <ButtonAddFav
              id={bookId}
              isFaved={foundBook.isFaved}
              setFoundBook={setFoundBook}
            />

            <div>
              <h3>{foundBook.title}</h3>
              <p>
                {foundBook.author?.name}({foundBook.author?.birth_year}-
                {foundBook.author?.death_year})
              </p>

              <h4>Sujets du livre (en anglais) :</h4>
              <ul>
                {foundBook.subjects.map((subject) => {
                  return (
                    <li className="book-subjects" key={foundBook.id}>
                      {subject}
                    </li>
                  );
                })}
              </ul>
              <h4 className="ebook-formats">Ebook (formats) :</h4>
              <ul className="formats-list">
                <li>
                  <a
                    className="button-format"
                    href={foundBook.formats["text/html"]}
                    target="_blank"
                  >
                    HTML
                  </a>
                </li>
                <li>
                  <a
                    className="button-format"
                    href={foundBook.formats["application/epub+zip"]}
                    target="_blank"
                    download
                  >
                    EPUB
                  </a>
                </li>
                <li>
                  <a
                    className="button-format"
                    href={foundBook.formats["application/x-mobipocket-ebook"]}
                    target="_blank"
                    download
                  >
                    MOBI
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BookDetails;
