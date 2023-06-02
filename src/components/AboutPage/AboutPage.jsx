import React from 'react';
import { Moon } from 'lunarphase-js';
import '../Layouts/LoggedOut';
import Nav from '../Nav/Nav';

function AboutPage() {

  const phaseEmoji = Moon.lunarPhaseEmoji();

  return (
    <div className="page-container">
      <div className="content-background"></div>
      <center className="content-a">
        <p>Use Chore Cycle to sync your recurring tasks with the phases of the moon! Get more in tune with your monthly rituals and the rhythms of nature.</p>
        <p>{phaseEmoji}</p>
      </center>
      <div className="content-b">
        <Nav />
      </div>
      <div className="blank-space"></div>
    </div>
  );
}

export default AboutPage;
