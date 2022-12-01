import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  return (
    <>
      <header>
        <Header title="Profile" searchIcon={ false } />
      </header>
      <body>
        <p
          data-testid="profile-email"
        >
          Email
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
      </body>
      <Footer />
    </>
  );
}

export default Profile;
