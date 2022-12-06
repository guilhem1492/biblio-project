import React from "react";

import "../styles/Profile.css";
import useAuth from "../auth/useAuth";
import { Link } from "react-router-dom";

const Profile = () => {
  const { isLoggedIn, currentUser, removeUser } = useAuth();
  return (
    <div className="profile-page">

      <h2>Profile de {currentUser.name}</h2>
      <p>Email : {currentUser.email}</p>

      <Link to={`/profile/${currentUser._id}/edit`}>Changer mon mot de passe</Link>

    </div >
  );
};

export default Profile;
