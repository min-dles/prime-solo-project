import React from 'react';
import { Moon } from 'lunarphase-js';
import '../Layouts/LoggedOut';

function AboutPage() {

  const phaseEmoji = Moon.lunarPhaseEmoji();

  return (
    <center>
      <p>Use Chore Cycle to sync your recurring tasks with the phases of the moon! Get more in tune with your monthly rituals and the rhythms of nature.</p>
      <p className="big-emoji">{phaseEmoji}</p>
    </center>
  );
}

export default AboutPage;
