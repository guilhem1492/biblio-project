import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)}>
      <img
        style={{ width: "30px" }}
        src="../../../images/back.png"
        alt="bouton retour"
      />
    </button>
  );
};

export default BackButton;
