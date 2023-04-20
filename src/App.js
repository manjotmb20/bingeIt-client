import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route}  from 'react-router-dom';
//components
import Nav from './navigation-bar'
import HomeComponent from './home';
import Movie from './details-page/detailspage';
import FavoriteList from './details-page/FavoriteList';
import PersonDetail from './details-page/PersonDetail';

import SearchPage from './search-page'
import BrowsePage  from './browse-page';

function App() {
  return (
    <>
      <Router>
      <Nav/>
        <Routes>
            <Route path="/" element={<HomeComponent/>} />
            <Route path="/about" element={<h1>About</h1>} />
            <Route path="/details/:id" element={<Movie />} />
            <Route path="/favorites" element={<FavoriteList/>} />
            <Route path="/person/:id" element={<PersonDetail/>} />
            <Route path="/details/:id" element={<div className="movie-wrapper"><Movie /></div>} />
            <Route path="/search" element={<SearchPage/>} />
            <Route path="/browse" element={<BrowsePage/>} />
        </Routes>
        </Router>
    </>  
  );
}

export default App;