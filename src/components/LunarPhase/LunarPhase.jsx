import React from 'react';
import { Link } from 'react-router-dom';
import { Moon } from 'lunarphase-js';
import './LunarPhase.css';

// NOTE: will need to consider integrating the Date with 
// react (useEffect, useState) for more reactive accuracy 
function LunarPhase() {
    const date = new Date();
    const phase = Moon.lunarPhase(date);
    // Need to convert Date obj to a string for rendering
    // on the DOM:
    const dateString = date.toDateString();

    // translate phase to a class name for rendering:
    // i.e. "First Quarter" --> "first-quarter"
    const classString = phase.toLowerCase().split(' ').join('-');

    return (
        <div className="nav">
            <Link to="/home">
                <p className="navLink">Current Phase: {phase}</p>
                <div className={`moon ${classString}`}></div>
                <p className="navLink">Today's Date: {dateString}</p>
            </Link>
            <div>
                <button className="navLink">New Moon</button>
                <button className="navLink">Waxing Crescent</button>
                <button className="navLink">First Quarter</button>
                <button className="navLink">Waxing Gibbous</button>
                <button className="navLink">Full Moon</button>
                <button className="navLink">Waning Gibbous</button>
                <button className="navLink">Last Quarter</button>
                <button className="navLink">Waning Crescent</button>
            </div>
        </div>
    )
}

export default LunarPhase;