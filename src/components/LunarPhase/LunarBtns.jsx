import React from 'react';
import './LunarPhase.css';

function LunarBtns() {

    return (
        <div className="moon-btns">
                <button className="navLink">New Moon</button>
                <button className="navLink">Waxing Crescent</button>
                <button className="navLink">First Quarter</button>
                <button className="navLink">Waxing Gibbous</button>
                <button className="navLink">Full Moon</button>
                <button className="navLink">Waning Gibbous</button>
                <button className="navLink">Last Quarter</button>
                <button className="navLink">Waning Crescent</button>
        </div>
    )
}

export default LunarBtns;