import React from 'react';
import { Link } from 'react-router-dom';
import { Moon } from 'lunarphase-js';
import './LunarPhase.css';

// NOTE: will need to consider integrating the Date with 
// react (useEffect, useState) for more reactive accuracy 
function LunarClock() {
    const date = new Date();
    const phase = Moon.lunarPhase(date);
    // Need to convert Date obj to a string for rendering
    // on the DOM:
    const dateString = date.toDateString();

    // translate phase to a class name for rendering:
    // i.e. "First Quarter" --> "first-quarter"
    const classString = phase.toLowerCase().split(' ').join('-');

    return (
        <div className="lunarnav-layout">
            <div className="moon-clock">
                <Link to="/home">
                    <p className="navLink">Current Phase: {phase}</p>
                    <p className="navLink">Today's Date: {dateString}</p>
                    <div className={`moon ${classString}`}></div>
                </Link>
            </div>
            
        </div >
    )
}

export default LunarClock;