import React, { useState } from "react";
import "./index.css";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    console.log("Sign out clicked");
  };

  const handleAccount = () => {

  }

  return (
    <div className="profile-dropdown">
        <ul>
          <li>
            <div onClick={handleAccount}>Account</div>
          </li>
          <li>
            <div onClick={handleSignOut}>Sign Out</div>
          </li>
        </ul>
    </div>
  );
};

export default ProfileDropdown;
