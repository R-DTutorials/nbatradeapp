import React , { Component } from 'react';
import './App.css';

const getTeamsDropdown = (teams) => {
    return teams && teams.map(team => <option value={team.fullName}>{team.fullName}</option>)
};

class App extends Component {
    constructor() {
        super();
        this.state = {
            teams: [],
            team1: '',
            team2: ''
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
    }

    getPlayersOnTeam(team) {
        const players = [];
        const teamEndpoint = `http://data.nba.net/data/10s/prod/v1/2019/teams/${team}/roster.json`;
        fetch(teamEndpoint)
            .then((res) => res.json())
            .then((data) => {
                players.push(data.league.standard.players);
            });

        // if (players.length) {
        //     players.map(({ personId }) => {
        //         const playerEndpoint = `http://data.nba.net/data/10s/prod/v1/2019/players/${personId}_profile.json`;
        //         fetch(playerEndpoint)
        //             .then((res) => res.json())
        //             .then((data) => {
        //                 players.push(data);
        //             })
        //     });
        // }
        //
        // this.setState({
        //     players: players
        // });
    }

    setTeam(e, team) {
        this.setState({ [team]: e.target.value });
    }

    render() {
        const { teams, players } = this.state;
        if (teams.length) {
            this.getPlayersOnTeam(teams[0].urlName);
            console.log("players", players);
        }
        return (
            <div className="App">
                <header className="App-header">NBA Trade App</header>
                <select name="team1" id="team1" onChange={ (e) => this.setTeam(e, 'team1') } value={this.state.team1}>
                    { getTeamsDropdown(this.state.teams.filter(team => team.fullName !== this.state.team2)) }
                </select>
                <select name="team2" id="team2" onChange={ (e) => this.setTeam(e, 'team2') } value={this.state.team2}>
                    { getTeamsDropdown(this.state.teams.filter(team => team.fullName !== this.state.team1)) }
                </select>
            </div>
        )
    }
}

export default App;
