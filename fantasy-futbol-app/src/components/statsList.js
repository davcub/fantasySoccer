import React, { Component } from 'react';
import Axios from 'axios';

//PlayerStat component is used to render table row data
class PlayerStat extends Component {
	constructor(props) {
		super(props);

		this.state = {
			statKey: this.props.stat.statKey,
			reload: 0,
		};

		this.handleClear = this.handleClear.bind(this);
	}

	handleClear() {
		Axios.post(`http://localhost:5000/stats/update/${this.props.stat._id}`, {
			statKey: this.state.statKey,
			playerName: this.props.playerName,
			goals: 0,
			assists: 0,
			redCards: 0,
			yellowCards: 0,
		}).then(() => {
			window.location.reload();
		});
	}

	render() {
		return (
			<tr>
				<td>{this.props.stat.playerName}</td>
				<td>{this.props.stat.goals}</td>
				<td>{this.props.stat.assists}</td>
				<td>{this.props.stat.redCards}</td>
				<td>{this.props.stat.yellowCards}</td>
				<td>
					<button
						onClick={() => {
							this.handleClear();
						}}
					>
						Clear
					</button>
				</td>
			</tr>
		);
	}
}

export class StatsList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			stats: [],
		};
	}

	//will make axios call after the first render
	componentDidMount() {
		Axios.get('http://localhost:5000/stats')
			.then((response) => {
				this.setState({ stats: response.data });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	statsList() {
		return this.state.stats.map((currentStat) => {
			return <PlayerStat key={currentStat._id} stat={currentStat} />;
		});
	}

	render() {
		let stats = this.state.stats;
		//have to check if stats array is empty because it will have an error when rendering
		return stats.length !== 0 ? (
			<div>
				<h3>Stats</h3>
				<button
					onClick={() => {
						this.props.unrender();
					}}
				>
					Players' Info
				</button>
				<table className="table">
					<thead className="thead-light">
						<tr>
							<th>Player</th>
							<th>Goals</th>
							<th>Assists</th>
							<th>Red Cards</th>
							<th>Yellow Cards</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>{this.statsList()}</tbody>
				</table>
			</div>
		) : (
			<div>'loading stats or no stats available'</div>
		);
	}
}
