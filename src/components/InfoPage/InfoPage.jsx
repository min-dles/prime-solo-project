import React from 'react';
import '../Layouts/LoggedIn.css';

// Import Components:
import Nav from '../Nav/Nav';
import LunarClock from '../LunarPhase/LunarClock';
import LunarBtns from '../LunarPhase/LunarBtns';
import ChoreCategories from '../ChoreCategories/ChoreCategories';

function InfoPage() {
  return (
    <div className="page-layout">

      <div className="nav-options">
        <Nav />
      </div>

      <div className="lunar-clock">
        <LunarClock />
      </div>

      <div className="lunar-btns">
        <LunarBtns />
      </div>

      <div className="sidebar">
        <ChoreCategories />
      </div>

      <div className="page-content">
        <p>Everyone has chores, but it can be hard to get into a flow about
          when things need to get done:</p><ul>

          <li>Washing the windows?</li>
          <li>Cleaning the toaster? </li>
          <li>Sweeping the garage?</li>
        </ul>
        <p>A reminder on your phone can feel stressful or even boring.</p>
        <p><b>But what if you could look to the moon instead for guidance on when
          these things need to get done?</b> </p>

        <p>Chore Cycle is an opportunity to sync your chore list with the moon
          phases so you are more connected to the rhythms of nature. It’s a
          gentle reminder that these simple tasks are essential parts of our lives,
          and that getting into cycles can be incredibly helpful and empowering
          when forming positive habits.</p>
      </div>
    </div>
  );
}

export default InfoPage;
