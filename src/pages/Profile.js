import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
  return (
    <>
      <header>
        <Header title="Profile" searchIcon={ false } />
      </header>
      <div>
        <p
          data-testid="profile-email"
        >
          {userFromLocalStorage ? userFromLocalStorage.email : ''}
        </p>
        <Link to="/done-recipes">
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Done Recipes
          </button>
        </Link>
        <Link to="/favorite-recipes">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => localStorage.clear() }
          >
            Logout
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
