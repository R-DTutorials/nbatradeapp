import React , { Component } from 'react';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            teams: [],
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

    render() {
        console.log(this.state)
        return (
            <div className="App">
                <header className="App-header">NBA Trade App</header>
                <select name="team1" id="team1">
                    <option value="Golden State Warriors">Golden State Warriors</option>
                </select>
                <select name="team2" id="team2">
                    <option value="Los Angeles Clippers">Los Angeles Clippers</option>
                </select>
            </div>
        )
    }
}

export default App;
