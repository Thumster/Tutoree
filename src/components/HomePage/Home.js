import React from 'react';
import styles from './Home.css';
import SearchBar from './SearchBar/SearchBar';

function Home() {
    return (
      <div className="Home">
      <SearchBar style={{width:"75%"}}/>
      </div>
    );
  }
  
export default Home;