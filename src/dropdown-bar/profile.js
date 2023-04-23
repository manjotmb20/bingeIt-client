import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

const ProfileDropdown = () => {
const [isOpen, setIsOpen] = useState(false);
const navigate = useNavigate();

const handleButtonClick = () => {
setIsOpen(!isOpen);
};

const handleSignOut = () => {
console.log("Sign out clicked");
};

const handleAccount = () => {
navigate("/profile");
setIsOpen(false);
};

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