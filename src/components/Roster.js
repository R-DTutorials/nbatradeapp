import React from 'react';
import PlayerCard from "./PlayerCard";

const Roster = ({ franchise, side, ...otherProps }) => (
    <div className="card-container">
        {franchise[0].players.map((player) => {
            return (
                <PlayerCard
                    key={player.person_id}
                    teamAbbreviation={franchise[0].team.team_abbrev}
                    player={player}
                    selected={side.person_id === player.person_id ? 'selected' : ''}
                    { ...otherProps }
                />
            );
        })}
    </div>
);

export default Roster;
