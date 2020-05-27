import React from 'react';
import PlayerCard from "./PlayerCard";

const Roster = ({ franchise, selected, ...otherProps }) => (
    <div className="card-container">
        {franchise[0].players.map((player) => { // render playercards for selected franchise
            return (
                <PlayerCard
                    key={player.person_id}
                    teamAbbreviation={franchise[0].team.team_abbrev}
                    player={player}
                    selected={selected.person_id === player.person_id ? 'selected' : ''}
                    { ...otherProps }
                />
            );
        })}
    </div>
);

export default Roster;
