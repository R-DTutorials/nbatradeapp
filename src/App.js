// (1)
// Start with create-react-app, remove defaults, add custom stylesheet
import React , { Component } from 'react';
import SelectTeam from "./components/SelectTeam";
import Roster from "./components/Roster";
// (2)
// Get data from nba git repo, created league w/ teams + players
import data from './data';
// (3)
// Custom Stylesheet
import './App.css';

// Find the player we are trading away, and replace them with the new player
const replacePlayer = (roster, tradingAway, tradingFor) => {
    roster.players = roster.players.map(player => (
        player.person_id === tradingAway.person_id ? tradingFor : player
    ));
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
            tradeHistory: []
        }
        this.selectPlayer = this.selectPlayer.bind(this);
    }

    // take the event which is given from 'onChange' of the team-select, to set either "team1" || "team2"
    setTeam(e, team) {
        this.setState({ [team]: e.target.value });
    }

    selectPlayer(player, side) {
        const currentPlayerId = this.state[side].person_id;
        this.setState({
            [side]: currentPlayerId !== player.person_id ? player : '',
        });
    }

    executeTrade() {
        const { allTeams, team1, team2, left, right } = this.state;
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
        this.setState({
            allTeams: updatedTeams,
            left: '',
            right: ''
        });
    }

    renderTradeButton() {
        const { left, right } = this.state;
        if (left && right) {
          return (
              <div className="trade-button" onClick={() => this.executeTrade()}>
                  <span className="trade-symbol">&#8594;</span>
              </div>
          )
        }
    }

    render() {
        const { allTeams, team1, team2 } = this.state;
        const eligible = this.state.left !== '' && this.state.right !== '';
        return (
            <div className="App">
                <header className="App-header">NBA Trade Simulator: Analyze and create customized trade scenarios for NBA teams and players.</header>
                <div className="select-container">
                    <SelectTeam
                        id="team1"
                        availableTeams={allTeams.filter(franchise => franchise.team.team_code !== this.state.team2)}
                        setTeam={(e) => this.setTeam(e, 'team1')}
                        team={team1}
                    />
                    <SelectTeam
                        id="team2"
                        availableTeams={allTeams.filter(franchise => franchise.team.team_code !== this.state.team1)}
                        setTeam={(e) => this.setTeam(e, 'team2')}
                        team={team2}
                    />
                </div>
                <Roster
                    eligible={eligible ? 'eligible' : ''}
                    franchise={this.state.allTeams.filter((franchise) => franchise.team.team_code === team1)}
                    side={this.state.left}
                    selectPlayer={(player) => this.selectPlayer(player,"left")}
                    getTradeButton={() => this.renderTradeButton()}
                />
                <Roster
                    eligible={eligible ? 'eligible' : ''}
                    franchise={this.state.allTeams.filter((franchise) => franchise.team.team_code === team2)}
                    side={this.state.right}
                    selectPlayer={(player) => this.selectPlayer(player,"right")}
                    getTradeButton={() => this.renderTradeButton()}
                />
            </div>
        )
    }
}

export default App;
