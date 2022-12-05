import React, { useState } from "react";
import { useParams } from "react-router-dom";
import service from "../../api/apiHandler";

const FormAddFav = ({ id, isFaved, setFoundBook }) => {
  const handleClick = (e) => {
    e.preventDefault();
    console.log(id);

    service[isFaved ? "delete" : "post"](`/api/auth/me/favorites/${id}`).then(
      (response) => {
        console.log(response.status);
        setFoundBook((currentValue) => {
          return { ...currentValue, isFaved: response.status === 201 };
        });
      }
    );
  };

  return (
    <button onClick={handleClick}>
      {isFaved ? (
        <img
          className="fav"
          src="../../../images/fav.png"
          alt="icone favori rempli"
        />
      ) : (
        <img
          className="fav"
          src="../../../images/fav-empty.png"
          alt="icone favori vide"
        />
      )}
    </button>
  );
};

export default FormAddFav;
