import React , { useState } from 'react';
import PlayerCard from "./PlayerCard";
import data from './data';
import './App.css';

const playerName = ({ first_name, last_name }) => `${first_name} ${last_name}`;

const getTeamsDropdown = (teams) => (
    teams && teams.map(({ team }) =>
        <option key={team.team_code} value={team.team_code}>{`${team.team_city} ${team.team_nickname}`}</option>
));

const replacePlayer = (roster, tradingAway, tradingFor) => {
    roster.players = roster.players.map(player => (
        player.person_id === tradingAway.person_id ? tradingFor : player
    ));
};

const executeTrade = (allTeams, team1, team2, left, right, setAllTeams) => {
    let elementIndex1 = null;
    let elementIndex2 = null;
    allTeams.forEach((franchise, index) => {
        if (franchise.team.team_code === team1) {
            elementIndex1 = index;
        }
        if (franchise.team.team_code === team2) {
            elementIndex2 = index;
        }
    });
    let updatedTeams = [...allTeams];
    replacePlayer(updatedTeams[elementIndex1], left, right);
    replacePlayer(updatedTeams[elementIndex2], right, left);
    setAllTeams(updatedTeams);
}

const renderTradeButton = (allTeams, team1, team2, left, right, setAllTeams) => {
    if (left && right) {
        return (
            <div
                className="trade-button"
                onClick={() => executeTrade(allTeams, team1, team2, left, right, setAllTeams)}
            >
                <span className="trade-symbol">&#8594;</span>
            </div>
        )
    }
}

const App2 = () => {
    const [allTeams, setAllTeams]  = useState(data);

    const [team1, setTeam1]  = useState('warriors');
    const [team2, setTeam2]  = useState('clippers');

    const [left, selectPlayerLeft]  = useState('');
    const [right, selectPlayerRight]  = useState('');

    const selectPlayer = (player, side) => side === 'left' ? selectPlayerLeft(player) : selectPlayerRight(player);

    const renderPlayers = (team, side) => {
        console.log('rendering players ...');
        return (
            <div className="card-container">
                {allTeams.filter((franchise) => franchise.team.team_code === team)[0].players.map((player) => (
                    <PlayerCard
                        player={player}
                        selected={[side].person_id === player.person_id ? 'selected' : ''}
                        selectPlayer={() => selectPlayer(player, side)}
                        tradeButton={() => renderTradeButton(allTeams, team1, team2, left, right, setAllTeams)}
                    />
                ))}
            </div>
        )
    }

    return (
        <div className="App">
            <header className="App-header">NBA Trade Simulator: Analyze and create customized trade scenarios for NBA teams and players.</header>
            <div className="select-container">
                <select name="team1" id="team1" onChange={ (e) => setTeam1(e.target.value) } value={team1}>
                    {getTeamsDropdown(allTeams.filter(franchise => franchise.team.team_code !== team2))}
                </select>
                <select name="team2" id="team2" onChange={ (e) => setTeam2(e.target.value) } value={team2}>
                    {getTeamsDropdown(allTeams.filter(franchise => franchise.team.team_code !== team1))}
                </select>
            </div>
            {renderPlayers(team1, 'left')}
            {renderPlayers(team2, 'right')}
        </div>
    )
}

export default App2;
