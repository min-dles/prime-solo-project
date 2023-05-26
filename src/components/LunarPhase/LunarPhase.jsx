import React from 'react';
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
        <>
            <p>Current Phase: {phase}</p>
            <div className={`moon ${classString}`}></div>
            <p>Today's Date: {dateString}</p>
        </>
    )
}

export default LunarPhase;