// Start with create-react-app, remove defaults, add custom stylesheet
import React , { Component } from 'react';

// Custom Stylesheet
import './App.css';

// Construct state component
class App extends Component {
  constructor() {
      super();
      this.state = {

      }
  }
  render() {
    return (
      <div className="app">
          <header className="header">NBA Trade Simulator: Analyze and create customized trade scenarios for NBA teams and players.</header>
      </div>
    )
  }
}

// make data file (data.js) (source: INSERT API URL)

// Get data from nba git repo, created league w/ teams + players
import data from './data';

// set data to state variable called allTeams
this.state = {
  allTeams: data,
}

// make select container to hold the two select dropdown inputs for selecting teams
<div className="select-container">
  <SelectTeam
    id="team1"
    availableTeams={allTeams} // renders all teams except the team that is shown on the other side
  />
  <SelectTeam
    id="team2"
    availableTeams={allTeams} // renders all teams except the team that is shown on the other side
  />
</div>


// create folder 'components' and create SelectTeam Child component (SelectTeam.js)
import React from 'react';

const SelectTeam = (props) => {
    const { availableTeams } = props;
    return (
        <select>
            {
                availableTeams && availableTeams.map(({ team }) =>
                    <option key={team.team_code} value={team.team_code}>{`${team.team_city} ${team.team_nickname}`}</option>)
            }
        </select>
    );
};

export default SelectTeam;

// import SelectTeam in App.js and show page
import SelectTeam from "./components/SelectTeam";

// select default selected teams in the state (team1, team2)
this.state = {
  team1: 'warriors',
  team2: 'clippers',
  allTeams: data,
}

// pass prop team and show page to view default teams warriors and clippers
<SelectTeam
  id="team1"
  availableTeams={allTeams}
  team={team1} // prop that is a string that is the team currently selected in the dropdown
/>

// declare value in select
return (
  <select name={id} id={id} value={team}>
      {
          // return an <option> for each team, only excluding the team set on the opposite side of the trade
          availableTeams && availableTeams.map(({ team }) =>
              <option key={team.team_code} value={team.team_code}>{`${team.team_city} ${team.team_nickname}`}</option>)
      }
  </select>
);

// make function to set the selected team from each dropdown
// team ('team1', 'team2')
setTeam(e, team) {
  this.setState({ [team]: e.target.value });
}

// pass prop setTeam function
<SelectTeam
  id="team1"
  availableTeams={allTeams}
  setTeam={(e) => this.setTeam(e, 'team1')} // when clicking on team in dropdown this func sets the team value in the state under 'team1' porperty or 'team2' property
  team={team1} // prop that is a string that is the team currently selected in the dropdown
/>

// add onchange prop
return (
  <select name={id} id={id} onChange={setTeam} value={team}>
      {
          // return an <option> for each team, only excluding the team set on the opposite side of the trade
          availableTeams && availableTeams.map(({ team }) =>
              <option key={team.team_code} value={team.team_code}>{`${team.team_city} ${team.team_nickname}`}</option>)
      }
  </select>
);

// filter out the team on the other side
<SelectTeam
  id="team1"
  availableTeams={allTeams.filter(franchise => franchise.team.team_code !== this.state.team2)} // renders all teams except the team that is shown on the other side
  setTeam={(e) => this.setTeam(e, 'team1')} // when clicking on team in dropdown this func sets the team value in the state under 'team1' porperty or 'team2' property
  team={team1} // prop that is a string that is the team currently selected in the dropdown
/>

// We need 2 new roster components to show the players on both teams, pass the team
<Roster
  franchise={this.state.allTeams.filter((franchise) => franchise.team.team_code === team1)} // filters all teams to only pass the selected teams data in order to render the player cards for that team
/>

// create Roster Child component (Roster.js)
import React from 'react';

const Roster = ({ franchise }) => (
    <div className="card-container">
        {franchise[0].players.map((player) => { // render playercards for selected franchise
            return (
                <PlayerCard
                    key={player.person_id}
                    player={player}
                    teamAbbreviation={franchise[0].team.team_abbrev}
                />
            );
        })}
    </div>
);

export default Roster;

// create Player Card component (PlayerCard.js)
import React from 'react';

const experience = {
	0: 'Rookie',
	1: '1 year'
};

const PlayerCard = (props) => {
	const { player } = props;
	const {
		first_name,
		last_name,
		jersey_number,
		height_ft,
		height_in,
		position_full,
		weight_lbs,
		years_pro,
	} = player; // player object stats

	return (
		<div className="player-card">
      <div className="player-name">{`${first_name} ${last_name}`}</div>
			<div className="player-specs">{`${teamAbbreviation} | #${jersey_number} | ${position_full.toUpperCase()}`}</div>
			<div className="player-height">{`Height: ${height_ft}"${height_in}`}</div>
			<div className="player-weight">{`Weight: ${weight_lbs} lbs`}</div>
			<div className="player-exp">{`Experience: ${experience[years_pro] || years_pro + ' years'}`}</div>
		</div>
	);
}

export default PlayerCard;

// set empty values in the state that we will populate with the players select for trade (left, right)
this.state = {
  left: '',
  right: '',
  team1: 'warriors',
  team2: 'clippers',
  allTeams: data,
}

// Create function to select a player and pass it through to PlayerCard for 'onClick'
selectPlayer(player, side) {
  const currentPlayerId = this.state[side].person_id;
  this.setState({
      [side]: currentPlayerId !== player.person_id ? player : '', // add ability to unselect a player also
  });
}

// Pass the appropriate selected player to each roster so we can style it and show which player might have been selected
// Also pass the function selectPlayer so we can set a new player
<Roster
  franchise={this.state.allTeams.filter((franchise) => franchise.team.team_code === team1)} // filters all teams to only pass the selected teams data in order to render the player cards for that team
  side={this.state.right} // this prop passes down the player object info from the corresponding side to PlayerCard to render certain player
  selectPlayer={(player) => this.selectPlayer(player,"right")} // func that selects player (sets player object in state) which is called when user clicks on the PlayerCard
/>

// Pass chosen player and func to select player through to PlayerCard
const Roster = ({ franchise, side, ...otherProps }) => (
  <div className="card-container">
      {franchise[0].players.map((player) => { // render playercards for selected franchise
          return (
              <PlayerCard
                  key={player.person_id}
                  player={player}
                  selected={side.person_id === player.person_id ? 'selected' : ''}
                  { ...otherProps }
              />
          );
      })}
  </div>
);
