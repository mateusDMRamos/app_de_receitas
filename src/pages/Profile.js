import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const emailFromLocalStorage = localStorage.getItem('user');
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
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
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
