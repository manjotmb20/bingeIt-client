import React, { useState } from "react";
import "./profile.css";
import FavoriteList from "../details-page/FavoriteList";

const ProfilePage = () => {
  const [name, setName] = useState("John Doe");
  const [image, setImage] = useState("https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png");
  const [phoneNumber, setPhoneNumber] = useState("123-456-7890");
  const [address, setAddress] = useState("123 Main St, Anytown USA");
  const [membershipInfo, setMembershipInfo] = useState("Basic");

  const [editMode, setEditMode] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleMembershipInfoChange = (event) => {
    setMembershipInfo(event.target.value);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Account</h1>
        <button className="btn-edit" onClick={handleEdit}>Edit</button>
      </div>
      <div className="profile-info">
        <img className="profile-image" src={image} alt="Profile" />
        {editMode ? (
          <div>
            <label className="profile-label">Name: </label>
            <input className="profile-input" type="text" value={name} onChange={handleNameChange} />
            <br />
            <label className="profile-label">Image URL: </label>
            <input className="profile-input" type="text" value={image} onChange={handleImageChange} />
            <br />
            <label className="profile-label">Phone Number: </label>
            <input className="profile-input" type="text" value={phoneNumber} onChange={handlePhoneNumberChange} />
            <br />
            <label className="profile-label">Address: </label>
            <input className="profile-input" type="text" value={address} onChange={handleAddressChange} />
            <br />
            <label className="profile-label">Membership Information: </label>
            <select className="profile-select" value={membershipInfo} onChange={handleMembershipInfoChange}>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="Gold">Gold</option>
            </select>
            <br />
            <button className="btn-save" onClick={handleSave}>Save</button>
          </div>
        ) : (
          <div>
            <h2 className="profile-name">{name}</h2>
            <p className="profile-text">Phone Number: {phoneNumber}</p>
            <p className="profile-text">Address: {address}</p>
            <p className="profile-text">Membership Information: {membershipInfo}</p>
          </div>
        )}
      </div>
      <div className="profile-favorites">
        <FavoriteList />
      </div>
    </div>
  );
};

export default ProfilePage;
