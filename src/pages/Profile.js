import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  return (
    <>
      <header>
        <Header title="Profile" searchIcon={ false } />
      </header>
      <Footer />
    </>
  );
}

export default Profile;
