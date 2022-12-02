import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link, Routes, Route, useNavigate } from "react-router-dom";
import service from "../api/apiHandler";
import BackButton from "../components/BackButton/BackButton";
import Footer from "../components/Footer/Footer";

const BookDetails = () => {
  const [foundBook, setFoundBook] = useState(null);
  const { bookId } = useParams();
  console.log("bookId", bookId);

  useEffect(() => {
    service.get(`/api/books/${bookId}`).then(({ data }) => {
      console.log(data);
      setFoundBook(data);
    });
  }, [bookId]);

  const navigate = useNavigate();

  return (
    <div>
      {!foundBook && <h3>Ebook non trouvé !</h3>}
      {foundBook && (
        <>
          <h2>{foundBook.title}</h2>
          <p>
            {foundBook.author.name} ({foundBook.author.birth_year}-
            {foundBook.author.death_year})
          </p>
          <img src={foundBook.formats["image/jpeg"]} alt={foundBook.title} />
          <h3>Sujets :</h3>
          <p key={foundBook.id}>
            {foundBook.subjects.map((subject) => {
              return <p>{subject}</p>;
            })}
          </p>
          <h3>Ebook :</h3>

          <ul>
            <li>
              <a href={foundBook.formats["text/html"]} target="_blank">
                Format HTML
              </a>
            </li>
            <li>
              <a
                href={foundBook.formats["application/epub+zip"]}
                target="_blank"
                download
              >
                Format ePub à télécharger
              </a>
            </li>
            <li>
              <a
                href={foundBook.formats["application/x-mobipocket-ebook"]}
                target="_blank"
                download
              >
                Format Mobi à télécharger
              </a>
            </li>
          </ul>
          <BackButton />
          <Footer />
        </>
      )}
    </div>
  );
};

export default BookDetails;
