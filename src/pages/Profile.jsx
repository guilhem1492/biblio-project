import React from "react";

import "../styles/Profile.css";
import useAuth from "../auth/useAuth";

const Profile = () => {
  const { isLoggedIn, currentUser, removeUser } = useAuth();
  return (
    <div className="profile-page">
      <h2>Profile de {currentUser.name}</h2>
    </div>
  );
};

export default Profile;
