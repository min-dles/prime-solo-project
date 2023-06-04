import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './LunarPhase.css';
import '../ChoreCategories/ChoreCategories.css';
import { moonPhases } from '../../util/constants';

function LunarBtns() {

  let { selectedPhase } = useParams();

  return (
    <div className="phase-btns-container">
      {moonPhases.map(moonPhase => {
        return (
          <Link key={moonPhase.id} to={`/user/phase/${moonPhase.id}`}>
            <button
              className="btn-styling navLink"
              disabled={Number(selectedPhase) === moonPhase.id}
            >
              {moonPhase.phase} Moon
            </button>
          </Link>
        )
      })}
    </div>
  )
}

export default LunarBtns;