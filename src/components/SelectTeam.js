import React from 'react';

const SelectTeam = (props) => {
    // id = "team1" || "team2"
    // availableTeams => filter out the team on the other side of the trade
    // setTeam => when you select a new team from the dropdown, 'onChange' will call setTeam to set new team to state
    // value => this will get passed into the 'onChange' event for us to set into state, example => 'kings' || 'nets'
    const {id, availableTeams, setTeam, team} = props;
    return (
        <select name={id} id={id} onChange={setTeam} value={team}>
            {availableTeams.map(({ team }) => <option key={team.team_code} value={team.team_code}>{`${team.team_city} ${team.team_nickname}`}</option>)}
        </select>
    );
};

export default SelectTeam;
