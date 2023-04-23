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

import {useEffect, useContext, useState} from 'react';
//components


import { useDispatch, useSelector } from 'react-redux';
import { fetchUserByIdThunk } from './services/user-thunks';

import SearchPage from './search-page'
import BrowsePage  from './browse-page';

function App() {
const dispatch = useDispatch();
const [loading, setLoading] = useState(true);

  console.log('user');
    const { user } = useSelector((state) => state.user);
  useEffect(() => {
      const fetchUserData = async () => {
        const id = "6441a68499859e1107f4aff2"; // Replace this with a dynamic value when implementing authentication
        console.log('user2');
        const userData = await dispatch(fetchUserByIdThunk(id));
        console.log('user3');
        console.log(userData);
            setLoading(false); // Set loading to false after fetching the user data

        // Do something with userData, e.g., store it in the Redux store or local state
      };

      fetchUserData();
    }, [dispatch]);
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
        </Routes>
        </Router>
        )}
    </>  
  );
}

export default App;