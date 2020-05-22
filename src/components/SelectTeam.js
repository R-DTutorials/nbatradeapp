import React from 'react';
import './PlayerCard.css';

const SelectTeam = (props) => {
    const {id, availableTeams, setTeam, team} = props;
    return (
        <select name={id} id={id} onChange={ (e) => setTeam(e, 'team1') } value={team}>
            {
                availableTeams && availableTeams.map(({ team }) =>
                    <option key={team.team_code} value={team.team_code}>{`${team.team_city} ${team.team_nickname}`}</option>)
            }
        </select>
    );
};

export default SelectTeam;
