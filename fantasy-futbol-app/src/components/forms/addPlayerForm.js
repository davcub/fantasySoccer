import React, { Component } from 'react';
import Axios from 'axios';

export class AddPlayerForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			team: 'Arsenal',
			position: 'Forward',
			age: 0,
			country: '',
			goals: 0,
			assists: 0,
			redCards: 0,
			yellowCards: 0,
		};

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleTeamChange = this.handleTeamChange.bind(this);
		this.handlePositionChange = this.handlePositionChange.bind(this);
		this.handleAgeChange = this.handleAgeChange.bind(this);
		this.handleCountryChange = this.handleCountryChange.bind(this);

		this.handleGoalsChange = this.handleGoalsChange.bind(this);
		this.handleAssistsChange = this.handleAssistsChange.bind(this);
		this.handleRedCardsChange = this.handleRedCardsChange.bind(this);
		this.handleYellowCardsChange = this.handleYellowCardsChange.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleNameChange(e) {
		this.setState({
			name: e.target.value,
		});
	}

	handleTeamChange(e) {
		this.setState({
			team: e.target.value,
		});
	}

	handlePositionChange(e) {
		this.setState({
			position: e.target.value,
		});
	}

	handleAgeChange(e) {
		this.setState({
			age: e.target.value,
		});
	}

	handleCountryChange(e) {
		this.setState({
			country: e.target.value,
		});
	}

	handleGoalsChange(e) {
		this.setState({
			goals: e.target.value,
		});
	}

	handleAssistsChange(e) {
		this.setState({
			assists: e.target.value,
		});
	}

	handleRedCardsChange(e) {
		this.setState({
			redCards: e.target.value,
		});
	}

	handleYellowCardsChange(e) {
		this.setState({
			yellowCards: e.target.value,
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		Axios.post('http://localhost:5000/players/add', {
			name: this.state.name,
			team: this.state.team,
			position: this.state.position,
			age: this.state.age,
			country: this.state.country,
		}).then((response) => {
			//console.log(response.data);
			let k = this.state.name + this.state.team + this.state.position;
			Axios.post('http://localhost:5000/stats/add', {
				statKey: k.replaceAll(/\s/g, ''),
				playerName: this.state.name,
				goals: this.state.goals,
				assists: this.state.assists,
				redCards: this.state.redCards,
				yellowCards: this.state.yellowCards,
			}).then((response) => {
				//console.log(response.data);
				window.location.reload();
			});
		});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<h4>Add A Player</h4>
				<br />
				<input
					type="text"
					placeholder="Name"
					value={this.state.name}
					onChange={this.handleNameChange}
				/>
				<br />
				<label>Team</label>
				<select value={this.state.team} onChange={this.handleTeamChange}>
					<option>Arsenal</option>
					<option>Aston Villa</option>
					<option>Brentford</option>
					<option>Brighton and Hove Albion</option>
					<option>Burnley</option>
					<option>Chelsea</option>
					<option>Crystal Palace</option>
					<option>Everton</option>
					<option>Leeds United</option>
					<option>Leicester City</option>
					<option>Liverpool</option>
					<option>Manchester City</option>
					<option>Manchester United</option>
					<option>Newcastle United</option>
					<option>Norwich City</option>
					<option>Southhampton</option>
					<option>Tottenham Hotspur</option>
					<option>Watford</option>
					<option>West Ham United</option>
					<option>Wolverhampton Wanderers</option>
				</select>
				<br />
				<label>Position</label>
				<select
					value={this.state.position}
					onChange={this.handlePositionChange}
				>
					<option>Forward</option>
					<option>Midfielder</option>
					<option>Defender</option>
					<option>Goalkeeper</option>
				</select>
				<br />
				<label>Age</label>
				<input
					type="number"
					value={this.state.age}
					onChange={this.handleAgeChange}
				/>
				<br />
				<input
					type="text"
					placeholder="Country"
					value={this.state.country}
					onChange={this.handleCountryChange}
				/>
				<br />
				<label>Goals</label>
				<input
					type="number"
					value={this.state.goals}
					onChange={this.handleGoalsChange}
				/>
				<br />
				<label>Assists</label>
				<input
					type="number"
					value={this.state.assists}
					onChange={this.handleAssistsChange}
				/>
				<br />
				<label>Red Cards</label>
				<input
					type="number"
					value={this.state.redCards}
					onChange={this.handleRedCardsChange}
				/>
				<br />
				<label>Yellow Cards</label>
				<input
					type="number"
					value={this.state.yellowCards}
					onChange={this.handleYellowCardsChange}
				/>
				<br />
				<input type="submit" />
				<br />
				<button
					onClick={() => {
						//cancels the form submission
						this.props.unrender();
					}}
				>
					Cancel
				</button>
			</form>
		);
	}
}
