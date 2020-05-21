import React , { Component } from 'react';
import './App.css';

const getTeamsDropdown = (teams) => {
    return teams && teams.map(team => <option value={team.teamId}>{team.fullName}</option>)
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
        const teamEndpoint = 'http://data.nba.net/data/10s/prod/v1/2019/teams.json';
        fetch(teamEndpoint)
            .then((res) => res.json())
            .then((data) => {
                const teams = data.league.standard.filter((team) => team.isNBAFranchise);
                this.setState({ teams });
            });
    }

    setTeam(e, team) {
        this.setState({ [team]: e.target.value });
    }

    render() {
        console.log(this.state)
        return (
            <div className="App">
                <header className="App-header">NBA Trade App</header>
                <div>
                    <select name="team1" id="team1" onChange={ (e) => this.setTeam(e, 'team1') }>
                        { getTeamsDropdown(this.state.teams.filter(team => team.teamId !== this.state.team2)) }
                    </select>
                    <select name="team2" id="team2" onChange={ (e) => this.setTeam(e, 'team2') }>
                        { getTeamsDropdown(this.state.teams.filter(team => team.teamId !== this.state.team1)) }
                    </select>
                </div>
            </div>
        )
    }
}

export default App;
