import React , { Component } from 'react';
import PlayerCard from "./PlayerCard";
import './App.css';

const getTeamsDropdown = (teams) => {
    return teams && teams.map(team => <option key={team.teamId} value={team.urlName}>{team.fullName}</option>)
};

class App extends Component {
    constructor() {
        super();
        this.state = {
            teams: [],
            team1: '',
            team2: '',
        }
    }

    componentDidMount() {
        const teamsEndpoint = 'http://data.nba.net/data/10s/prod/v1/2019/teams.json';
        fetch(teamsEndpoint)
            .then((res) => res.json())
            .then((data) => {
                const teams = data.league.standard.filter((team) => team.isNBAFranchise);
                this.setState({ teams });
            });
        this.getPlayersOnTeam('team1players', 'hawks');
        this.getPlayersOnTeam('team2players', 'hawks');
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextState)
        if (nextState.team1 !== this.state.team1) {
            this.getPlayersOnTeam('team1players', nextState.team1);
        }
        if (nextState.team2 !== this.state.team2) {
            this.getPlayersOnTeam('team2players', nextState.team2);
        }
        return true;
    }

    getPlayersOnTeam(choice, team) {
        const teamEndpoint = `http://data.nba.net/json/cms/noseason/team/${team}/roster.json`;
        fetch(teamEndpoint)
            .then((res) => res.json())
            .then((data) => {
                console.log("i", data)
                this.setState({
                    [choice]: data.sports_content.roster.players.player,
                });
            });
    }

    setTeam(e, team) {
        this.setState({ [team]: e.target.value });
    }

    renderPlayers(players) {
        return (
            <div className="card-container">
                {players.map((player) => {
                    const { first_name, last_name, jersey_number } = player;
                    return (
                        <div className="player-card">
                            <span className="player-name">{`${first_name} ${last_name}`}</span>
                            <span className="player-jersey">{`#${jersey_number}`}</span>
                        </div>
                    );
                })}
            </div>
        )
    }

    render() {
        const { teams, team1players, team2players } = this.state;
        let playerCards1, playerCards2 = null;
        if (team1players && team2players) {
            playerCards1 = this.renderPlayers(team1players);
            playerCards2 = this.renderPlayers(team2players);
        }
        return (
            <div className="App">
                <header className="App-header">NBA Trade App</header>
                <div className="select-container">
                    <select name="team1" id="team1" onChange={ (e) => this.setTeam(e, 'team1') } value={this.state.team1}>
                        { getTeamsDropdown(teams.filter(team => team.urlName !== this.state.team2)) }
                    </select>
                    <select name="team2" id="team2" onChange={ (e) => this.setTeam(e, 'team2') } value={this.state.team2}>
                        { getTeamsDropdown(teams.filter(team => team.urlName !== this.state.team1)) }
                    </select>
                </div>
               {playerCards1}
               {playerCards2}
            </div>
        )
    }
}

export default App;
