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

    // when clicking on player card, set the player's ID to the state under corresponding side ('left' or 'right')
    // if player ID is already in state and clicked again then deselect this player from the state (set to empty string '')
    selectPlayer(player, side) {
        const currentPlayerId = this.state[side].person_id;
        this.setState({
            [side]: currentPlayerId !== player.person_id ? player : '',
        });
    }

    // loop through data and find the indexs of the 2 player objects that eligible for a trade
    // swap the player objects to their new corresponding teams and update the 'allTeams' data property in the state
    // reset the selected teams in the state to an empty string (left and right) since the trade has been completed
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

    // show trade button if a two player cards are selected (if left and right are both not empty strings)
    // onClick will execute the trade function to swap the players (this.executeTrade)
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
        const eligible = this.state.left !== '' && this.state.right !== ''; // true if a player is selected on left and right
        return (
            <div className="app">
                <header className="header">NBA Trade Simulator: Analyze and create customized trade scenarios for NBA teams and players.</header>
                <div className="select-container">
                    <SelectTeam
                        id="team1"
                        availableTeams={allTeams.filter(franchise => franchise.team.team_code !== this.state.team2)} // renders all teams except the team that is shown on the other side
                        setTeam={(e) => this.setTeam(e, 'team1')} // when clicking on team in dropdown this func sets the team value in the state under 'team1' porperty or 'team2' property
                        team={team1} // prop that is a string that is the team currently selected in the dropdown
                    />
                    <SelectTeam
                        id="team2"
                        availableTeams={allTeams.filter(franchise => franchise.team.team_code !== this.state.team1)} // renders all teams except the team that is shown on the other side
                        setTeam={(e) => this.setTeam(e, 'team2')}// when clicking on team in dropdown this func sets the team value in the state under 'team1' porperty or 'team2' property
                        team={team2} // prop that is a string that is the team currently selected in the dropdown
                    />
                </div>
                <Roster
                    eligible={eligible ? 'eligible' : ''}
                    franchise={this.state.allTeams.filter((franchise) => franchise.team.team_code === team1)} // filters all teams to only pass the selected teams data in order to render the player cards for that team
                    side={this.state.left} // this prop passes down the player object info from the corresponding side to PlayerCard to render certain player
                    selectPlayer={(player) => this.selectPlayer(player,"left")} // func that selects player (sets player object in state) which is called when user clicks on the PlayerCard
                    getTradeButton={() => this.renderTradeButton()}
                />
                <Roster
                    eligible={eligible ? 'eligible' : ''}
                    franchise={this.state.allTeams.filter((franchise) => franchise.team.team_code === team2)} // filters all teams to only pass the selected teams data in order to render the player cards for that team
                    side={this.state.right} // this prop passes down the player object info from the corresponding side to PlayerCard to render certain player
                    selectPlayer={(player) => this.selectPlayer(player,"right")} // func that selects player (sets player object in state) which is called when user clicks on the PlayerCard
                    getTradeButton={() => this.renderTradeButton()}
                />
            </div>
        )
    }
}

export default App;
