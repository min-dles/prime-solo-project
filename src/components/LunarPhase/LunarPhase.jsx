import React from 'react';
import { Moon } from 'lunarphase-js';
import './LunarPhase.css';

function LunarPhase() {
    const phase = Moon.lunarPhase();
    console.log('PHASE:', phase);
    const classString = phase.toLowerCase().split(' ').join('-');
    console.log('um', classString);

    const moonClock = () => {
        switch (phase) {
            case "First Quarter":
                return "first-quarter";
            case "Full Moon":
                return "full";
            default:
                return "";
        }
    }

    return (
        <div className={`moon ${moonClock()}`}></div>
    )
}

export default LunarPhase;