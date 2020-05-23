import React , { Component } from 'react';
import SelectTeam from "./components/SelectTeam";
import PlayerCard from "./components/PlayerCard";
// import TradeHistory from "./TradeHistory";
import data from './data';
import './App.css';

const playerName = ({ first_name, last_name }) => `${first_name} ${last_name}`;

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

    setTeam(e, team) {
        this.setState({ [team]: e.target.value });
    }

    selectPlayer(player, side) {
        console.log('selected:',player)
        const currentPlayerId = this.state[side].person_id;
        this.setState({
            [side]: currentPlayerId !== player.person_id ? player : '',
        });
    }

    executeTrade() {
        const { allTeams, team1, team2, left, right } = this.state;
        console.log(`Trading ${playerName(left)} for ${playerName(right)}`)
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

    renderPlayers(team, side) {
        const franchise = this.state.allTeams.filter((franchise) => franchise.team.team_code === team);
        const eligible = this.state.left !== '' && this.state.right !== '';
        return (
            <div className="card-container">
                {franchise[0].players.map((player) => {
                    return (
                        <PlayerCard
                            player={player}
                            eligible={eligible ? 'eligible' : ''}
                            selected={this.state[side].person_id === player.person_id ? 'selected' : ''}
                            selectPlayer={() => this.selectPlayer(player,side)}
                            getTradeButton={() => this.renderTradeButton()}
                        />
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
                {playerCards1}
                {playerCards2}
                {/* <TradeHistory history={this.state.tradeHistory} /> */}
            </div>
        )
    }
}

export default App;
