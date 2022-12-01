import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import "../../styles/NavMain.css";

const NavMain = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [checked, setChecked] = useState(false);
  const { isLoggedIn, currentUser, removeUser } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const searchBy = checked ? `author` : `title`;
    navigate(`/search?${searchBy}=${searchQuery}`);
  }

  return (
    <nav className="NavMain">
      <NavLink className="logo" to="/">
        <h1> 🏡 </h1>
      </NavLink>
      {isLoggedIn && (
        <>
          <NavLink to="/profile">{currentUser && currentUser.email}</NavLink>
          <button onClick={removeUser}>Log-Out</button>
        </>
      )}
      {!isLoggedIn && (
        <>
          <NavLink to="/signin">Log in</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </>
      )}

      <form className="nav-search" onSubmit={handleSubmit}>
        <label htmlFor="searchTitle">
          <img
            className="magnifying-glass"
            src="/images/icon-search.png"
            alt="magnifying glass"
          />
        </label>
        <input
          type="checkbox"
          name="author"
          checked={checked}
          onChange={(e) => {
            setChecked(Boolean(e.target.checked));
          }}
        />
        <input
          className="input-height"
          type="search"
          name="searchTitle"
          placeholder="Chercher un livre"
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
          id="searchTitle"
        />

        <button className="search-btn">Chercher</button>
      </form>
    </nav>
  );
};

export default NavMain;
