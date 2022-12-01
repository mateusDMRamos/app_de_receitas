import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const emailFromLocalStorage = JSON.parse(localStorage.getItem('user')).email;
  return (
    <>
      <header>
        <Header title="Profile" searchIcon={ false } />
      </header>
      <div>
        <p
          data-testid="profile-email"
        >
          {emailFromLocalStorage}
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
        <button
          type="button"
          data-testid="profile-logout-btn"
        >
          Logout
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
