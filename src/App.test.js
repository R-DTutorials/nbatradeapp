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
this.state ={
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


