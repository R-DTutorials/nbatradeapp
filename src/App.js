import React , { Component } from 'react';
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
        console.log(player)
        if (this.state[side].person_id === player.person_id) {
            this.setState({
                [side]: '',
            })
        }
        else {
            this.setState({
                [side]: player,
            });
        }
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
            tradeHistory: [...this.state.tradeHistory, `${playerName(left)} for ${playerName(right)}`]
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
        return (
            <div className="card-container">
                {franchise[0].players.map((player) => {
                    const {
                        first_name,
                        last_name,
                        jersey_number,
                        person_id,
                        height_ft,
                        height_in,
                        position_full,
                        weight_lbs,
                    } = player;
                    const selected = this.state[side].person_id === person_id ? 'selected' : '';
                    const tradeButton = selected && this.renderTradeButton();
                    return (
                        <div className={`player-card ${selected}`} onClick={() => this.selectPlayer(player, side)}>
                            <div className="player-name">{playerName(player)}</div>
                            {/* <div className="player-name">{`${first_name} ${last_name}`}</div> */}
                            <div className="player-specs">
                                <span>{`#${jersey_number}`}</span>
                                <span> &#8226; </span>
                                <span>{`${position_full}`}</span>
                            </div>
                            {/* <div className="player-jersey">{`Jersey #${jersey_number}`}</div> */}
                            {/* <div className="player-position">{`Position: ${position_full}`}</div> */}
                            <div className="player-height">{`Height: ${height_ft}"${height_in}`}</div>
                            <div className="player-weight">{`Weight: ${weight_lbs} lbs`}</div>
                            {tradeButton}
                        </div>
                    );
                })}
            </div>
        )
    }

    // getTradeHistory() {
    //     return (
    //         <div className="trade-history">
    //             { this.state.tradeHistory.map((trade) => <div className="trade">{trade}</div>) }
    //         </div>
    //     )
    // }

    render() {
        const { allTeams, team1, team2 } = this.state;
        const playerCards1 = this.renderPlayers(team1, 'left');
        const playerCards2 = this.renderPlayers(team2, 'right');
        console.log(this.state)
        return (
            <div className="App">
                <header className="App-header">NBA Trade Simulator: Analyze and create customized trade scenarios for NBA teams and players.</header>
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
