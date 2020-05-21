import React , { Component } from 'react';
import './App.css';

class App extends Component {
    componentDidMount() {

    }
    render() {
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
