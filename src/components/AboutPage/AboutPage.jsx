import React from 'react';
import '../Styling/LoggedOut.css';
import Nav from '../Nav/Nav';

function AboutPage() {
  return (
    <div className="page-container">
      <div className="content-background"></div>
      <div className="content-a">
        <p>This about page is for anyone to read!</p>
      </div>
      <div className="content-b">
        <Nav />
      </div>
      <div className="blank-space"></div>
    </div>
  );
}

export default AboutPage;
