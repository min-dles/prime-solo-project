import React from 'react';
import '../Layouts/LoggedIn.css';
import picture from '../../util/full_moon_ama.jpeg';

function InfoPage() {

  return (
    <>
      <h3>What is Chore Cycle all about?</h3>
      <p>Everyone has chores, but it can be hard to get into a flow about
        when things need to get done:</p>

      <ul>
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

      <div className="customHr"></div>

      <h3>Technologies & Resources Used:</h3>
      <ul>
        <li>React</li>
        <li>Node.js</li>
        <li>PostreSQL</li>
        <li>CSS</li>
        <li>HTML</li>
        <li>JavaScript</li>
        <li>
          <a
            href="https://docs.astronomyapi.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Astronomy API
          </a>
        </li>
        <li>
          <a
            href="https://github.com/jasonsturges/lunarphase-js"
            target="_blank"
            rel="noopener noreferrer"
          >
            lunarphase-js
          </a>
        </li>
      </ul>

      <div className="customHr"></div>

      <h3>Acknowledgements:</h3>

      <p>This project was inspired by my friend (thank you, Elena!) and I'm beyond grateful to my peers,
        Prime instructors, mentors, friends & chosen family (shoutout to Kyle for the kickoff data,
        Alyssa for the beautiful moon pic, and Jason for telescope access!),
        and my wonderful wife for all the support and guidance in creating this app.</p>

      <p>Next steps and aspirations for Chore Cycle are to get deployed for online
        use, connect tasks more directly with Astronomy API, and further customize
        the styling elements (like integrating the moon emojis as cascading moon phases
        instead of traditional bullet points seen here).</p>

      <p>Thanks for checking it out!</p>
      <center><img src={picture}></img></center>
    </>
  );
}

export default InfoPage;
