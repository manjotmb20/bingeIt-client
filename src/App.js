import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route}  from 'react-router-dom';
//components
import Nav from './navigation-bar'
import HomeComponent from './home';
import Movie from './details-page/detailspage';
import FavoriteList from './details-page/FavoriteList';
import PersonDetail from './details-page/PersonDetail';
import ProfilePage from './profile-page/profilePage';
import ProviderPage from './provider-list';

import ProfileDetail from './details-page/ProfileDetail';

import {useEffect, useContext, useState} from 'react';
//components


import { useDispatch, useSelector } from 'react-redux';
import { fetchUserByIdThunk } from './services/user-thunks';

import SearchPage from './search-page'
import BrowsePage  from './browse-page';

import UsersList from "./users/adminComponent";
import Register from './users/register'
import Login from "./users/login";

function App() {
const [loading, setLoading] = useState(false);
  const [user, setCurrentUser] = useState(null);

  useEffect(() => {
    const getUserFromLocalStorage = () => {
      const cuser = localStorage.getItem("user");
      if (user) {
        setCurrentUser(JSON.parse(cuser));
      }
    };

    getUserFromLocalStorage();
  }, []);

  return (
    <>
    {loading ? (
              <p>Loading...</p>
            ) : (
      <Router>
      <Nav/>
        <Routes>
            <Route path="/" element={<HomeComponent/>} />
            <Route path="/about" element={<h1>About</h1>} />
            <Route path="/favorites" element={<FavoriteList/>} />
            <Route path="/person/:id" element={<PersonDetail/>} />
            <Route path="/details/:id" element={<Movie />} />
            <Route path="/search" element={<SearchPage/>} />
            <Route path="/browse" element={<BrowsePage/>} />
            <Route path="/profile" element={<ProfilePage/>} />
            <Route path="/provider" element={<ProviderPage/>} />
            <Route path="/profile/:id" element={<ProfileDetail/>} />
                     <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/adminShow" element={<UsersList/>}/>
        </Routes>
        </Router>
        )}
    </>  
  );
}

export default App;