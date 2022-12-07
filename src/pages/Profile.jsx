import React from "react";
import "../styles/Profile.css";
import useAuth from "../auth/useAuth";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton/BackButton";

const Profile = () => {
  const { isLoggedIn, currentUser, removeUser } = useAuth();
  return (
    <div className="profile-page">
      <BackButton />
      <div className="profile">
        <h2>Profile de {currentUser.name}</h2>
        <p>
          <span className="email">Email :</span> {currentUser.email}
        </p>
        <p>
          <Link
            className="button-change"
            to={`/profile/${currentUser._id}/edit`}
          >
            Changer mon mot de passe
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Profile;
