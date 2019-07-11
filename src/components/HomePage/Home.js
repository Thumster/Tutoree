import React from 'react';
import NavbarHome from '../Nav/NavSearched';
import './Home.css';
import SearchBar from './SearchBar/SearchBar';

function Home() {
    return (
      <div className="Home">
      <NavbarHome/>
      <SearchBar style={{width:"75%"}}/>
      </div>
    );
  }
  
export default Home;