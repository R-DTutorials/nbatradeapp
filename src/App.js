import React , { Component } from 'react';
import PlayerCard from "./PlayerCard";
import data from './data';
import './App.css';

const getTeamsDropdown = (teams) => {
    return teams && teams.map(franchise => <option key={franchise.team.team_code} value={franchise.team.team_code}>{franchise.team.team_code}</option>)
};

class App extends Component {
    constructor() {
        super();
        this.state = {
            team1: 'warriors',
            team2: 'clippers',
            left: '',
            right: '',
            allTeams: data,
        }
        this.selectPlayer = this.selectPlayer.bind(this);
    }

    setTeam(e, team) {
        this.setState({ [team]: e.target.value });
    }

    selectPlayer(player, side) {
        console.log(player)
        this.setState({
            [side]: player,
        });
    }

    renderPlayers(team, side) {
        const franchise = this.state.allTeams.filter((franchise) => franchise.team.team_code === team);
        return (
            <div className="card-container">
                {franchise[0].players.player.map((player) => {
                    const { first_name, last_name, jersey_number, person_id } = player;
                    const selected = this.state[side].person_id === person_id ? 'selected' : '';
                    return (
                        <div className={`player-card ${selected}`} onClick={() => this.selectPlayer(player, side)}>
                            <span className="player-name">{`${first_name} ${last_name}`}</span>
                            <span className="player-jersey">{`#${jersey_number}`}</span>
                        </div>
                    );
                })}
            </div>
        )
    }

    render() {
        const { allTeams, team1, team2 } = this.state;
        const playerCards1 = this.renderPlayers(team1, 'left');
        const playerCards2 = this.renderPlayers(team2, 'right');
        console.log(this.state)
        return (
            <div className="App">
                <header className="App-header">NBA Trade App</header>
                <div className="select-container">
                    <select name="team1" id="team1" onChange={ (e) => this.setTeam(e, 'team1') } value={this.state.team1}>
                        {getTeamsDropdown(allTeams.filter(franchise => franchise.team.team_code !== this.state.team2))}
                    </select>
                    <select name="team2" id="team2" onChange={ (e) => this.setTeam(e, 'team2') } value={this.state.team2}>
                        {getTeamsDropdown(allTeams.filter(franchise => franchise.team.team_code !== this.state.team1))}
                    </select>
                </div>
               {playerCards1}
               {playerCards2}
            </div>
        )
    }
}

export default App;
