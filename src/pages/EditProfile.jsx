import React, { useState } from "react";
import service from "../api/apiHandler";
import useAuth from "../auth/useAuth";
import BackButton from "../components/BackButton/BackButton";
import "../styles/EditProfile.css";

const EditProfile = () => {
  const { removeUser } = useAuth();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await service.patch("/api/me", formData);
      console.log("DATA", data);
      removeUser();
    } catch (error) {
      //console.log(error.response.data.message)
      setError(error.response.data.message);
    }
  };
  const { password, newPassword } = formData;

  return (
    <div className="edit-profile">
      <BackButton />
      <form className="change-password" onSubmit={handleSubmit}>
        <label htmlFor="password">Mot de passe :</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
        />

        <label htmlFor="newPassword">Nouveau mot de passe :</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={newPassword}
          onChange={handleChange}
        />

        <button className="button-save">Enregistrer</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default EditProfile;
