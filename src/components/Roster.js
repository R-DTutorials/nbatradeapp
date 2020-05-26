import React from 'react';
import PlayerCard from "./PlayerCard";

const Roster = ({ franchise, side, ...otherProps }) => (
    <div className="card-container">
        {franchise[0].players.map((player) => {
            return (
                <PlayerCard
                    player={player}
                    selected={side.person_id === player.person_id ? 'selected' : ''}
                    { ...otherProps }
                />
            );
        })}
    </div>
);

export default Roster;
