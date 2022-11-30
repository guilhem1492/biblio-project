import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import "../../styles/NavMain.css";

const NavMain = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoggedIn, currentUser, removeUser } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/search?books=${searchQuery}`);
  }
  return (
    <nav className="NavMain">
      <NavLink className="logo" to="/">
        <h1>Alexandria 🏡</h1>
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
        <label htmlFor="search">
          <img src="/images/icon-search.png" alt="magnifying glass" />
        </label>
        <input
          className="input-height"
          type="search"
          name="searchBooks"
          placeholder="Chercher un livre"
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
          id="search"
        />
        <button className="search-btn">Chercher</button>
      </form>
    </nav>
  );
};

export default NavMain;
