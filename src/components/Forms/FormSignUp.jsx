import useForm from "../../hooks/useForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiHandler from "../../api/apiHandler";

const FormSignUp = () => {
  const [values, handleChange] = useForm({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    apiHandler
      .signup(values)
      .then(() => {
        navigate("/signin");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };
  return (
    <div className="signup">
      <h2>S'enregistrer</h2>
      <p>
        Enregistrez-vous puis connectez-vous pour ajouter des ebooks parmi vos
        favoris !
      </p>
      <form className="form-signup" onSubmit={handleSubmit}>
        <label htmlFor="name">Nom :</label>
        <input
          onChange={handleChange}
          value={values.name}
          type="text"
          id="name"
          name="name"
        />
        <label htmlFor="email">Email :</label>
        <input
          onChange={handleChange}
          value={values.email}
          type="email"
          id="email"
          name="email"
        />
        <label htmlFor="password">Mot de passe :</label>
        <input
          onChange={handleChange}
          value={values.password}
          type="password"
          id="password"
          name="password"
        />
        <button className="button-validate">Valider</button>
        {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
      </form>
    </div>
  );
};

export default FormSignUp;
