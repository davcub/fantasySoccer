import React, { Component } from 'react';
import Axios from 'axios';

export class EditStatForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gotStats: false,
			id: '',
			playerName: '',
			goals: 0,
			assists: 0,
			redCards: 0,
			yellowCards: 0,
		};

		this.handleGoalsChange = this.handleGoalsChange.bind(this);
		this.handleAssistsChange = this.handleAssistsChange.bind(this);
		this.handleRedCardsChange = this.handleRedCardsChange.bind(this);
		this.handleYellowCardsChange = this.handleYellowCardsChange.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
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
		Axios.post(`http://localhost:5000/stats/update/${this.state.id}`, {
			statKey: this.props.statKey,
			playerName: this.state.playerName,
			goals: this.state.goals,
			assists: this.state.assists,
			redCards: this.state.redCards,
			yellowCards: this.state.yellowCards,
		}).then(() => {
			console.log('stats change');
			window.location.reload();
		});
	}

	componentDidMount() {
		Axios.get(`http://localhost:5000/stats/find/${this.props.statKey}`)
			.then((response) => {
				let stat = response.data[0];
				this.setState({
					gotStats: true,
					id: stat._id,
					playerName: stat.playerName,
					goals: stat.goals,
					assists: stat.assists,
					redCards: stat.redCards,
					yellowCards: stat.yellowCards,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return this.state.gotStats ? (
			<form onSubmit={this.handleSubmit}>
				<label>Goals</label>
				<input
					type="number"
					value={this.state.goals}
					onChange={this.handleGoalsChange}
				></input>
				<br />
				<label>Assists</label>
				<input
					type="number"
					value={this.state.assists}
					onChange={this.handleAssistsChange}
				></input>
				<br />
				<label>Red Cards</label>
				<input
					type="number"
					value={this.state.redCards}
					onChange={this.handleRedCardsChange}
				></input>
				<br />
				<label>Yellow Cards</label>
				<input
					type="number"
					value={this.state.yellowCards}
					onChange={this.handleYellowCardsChange}
				></input>
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
			<div>Getting Stats</div>
		);
	}
}
