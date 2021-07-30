import React, { Component } from 'react';
import Axios from 'axios';

//PlayerStat component is used to render table row data
class PlayerStat extends Component {
	render() {
		return (
			<tr>
				<td>{this.props.stat.playerName}</td>
				<td>{this.props.stat.goals}</td>
				<td>{this.props.stat.assists}</td>
				<td>{this.props.stat.redCards}</td>
				<td>{this.props.stat.yellowCards}</td>
				<td>
					<button>Edit</button>
					<button>Delete</button>
				</td>
				<td>
					<button>View</button>
				</td>
			</tr>
		);
	}
}

export class StatsList extends Component {
	constructor(props) {
		super(props);

		this.state = { stats: [] };
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
				<h3>Soccer Stats</h3>
				<table className="table">
					<thead className="thead-light">
						<tr>
							<th>Player</th>
							<th>Goals</th>
							<th>Assists</th>
							<th>Red Cards</th>
							<th>Yellow Cards</th>
							<th>Actions</th>
							<th>Info</th>
						</tr>
					</thead>
					<tbody>{this.statsList()}</tbody>
				</table>
			</div>
		) : (
			<div>{'loading stats or no stats available'}</div>
		);
	}
}
