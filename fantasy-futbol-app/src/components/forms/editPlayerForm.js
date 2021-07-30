import React, { Component } from 'react';
import Axios from 'axios';

export class EditPlayerForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playerID: this.props.playerID,
			gotPlayerInfo: false,
			name: '',
			team: '',
			position: '',
			age: '',
			country: '',
			oldKey: '',
		};

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleTeamChange = this.handleTeamChange.bind(this);
		this.handlePositionChange = this.handlePositionChange.bind(this);
		this.handleAgeChange = this.handleAgeChange.bind(this);
		this.handleCountryChange = this.handleCountryChange.bind(this);
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

	componentDidMount() {
		Axios.get(`http://localhost:5000/players/${this.state.playerID}`)
			.then((response) => {
				let player = response.data;
				let oldK = player.name + player.team + player.position;
				this.setState({
					gotPlayerInfo: true,
					name: player.name,
					team: player.team,
					position: player.position,
					age: player.age,
					country: player.country,
					oldKey: oldK.replaceAll(/\s/g, ''),
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	handleSubmit(e) {
		e.preventDefault();
		Axios.post(`http://localhost:5000/players/update/${this.state.playerID}`, {
			name: this.state.name,
			team: this.state.team,
			position: this.state.position,
			age: this.state.age,
			country: this.state.country,
		}).then(() => {
			let newKey = this.state.name + this.state.team + this.state.position; //newKey is broken
			Axios.get(`http://localhost:5000/stats/find/${this.state.oldKey}`).then(
				(response) => {
					let stat = response.data[0];
					let id = stat._id;
					let goals = stat.goals;
					let assists = stat.assists;
					let redCards = stat.redCards;
					let yellowCards = stat.yellowCards;
					Axios.post(`http://localhost:5000/stats/update/${id}`, {
						statKey: newKey.replaceAll(/\s/g, ''), //the only thing thats changing
						goals: goals,
						assists: assists,
						redCards: redCards,
						yellowCards: yellowCards,
					}).then(() => {
						window.location.reload();
					});
				}
			);
		});
	}

	render() {
		return this.state.gotPlayerInfo ? (
			<form onSubmit={this.handleSubmit}>
				<h4>Editing {this.state.name}</h4>
				<br />
				<input
					type="text"
					placeholder={this.state.name}
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
					placeholder={this.state.country}
					value={this.state.country}
					onChange={this.handleCountryChange}
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
		) : (
			<div>Getting Players Info</div>
		);
	}
}
