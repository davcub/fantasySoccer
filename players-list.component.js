import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import Axios from 'axios';

const Player = (props) => {
	<tr>
		<td>{props.player.name}</td>
		<td>{props.player.team}</td>
		<td>{props.player.position}</td>
		<td>{props.player.age}</td>
		<td>{props.player.country}</td>
	</tr>;
};

export default class PlayersList extends Component {
	constructor(props) {
		super(props);

		this.state = { players: [] };
	}

	componentDidMount() {
		Axios.get('http:localhost:5000/players/')
			.then((response) => {
				this.setState({ players: response.data });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	playerList() {
		return this.state.players.map((currentPlayer) => {
			return <Player player={currentPlayer} key={currentPlayer._id} />;
		});
	}

	render() {
		Axios.get('http:localhost:5000/players/')
			.then((response) => {
				this.setState({ players: response.data });
			})
			.catch((error) => {
				console.log(error);
			});
		return (
			<div>
				<h3>Players</h3>
				<table className="table">
					<thead className="thead-light">
						<tr>
							<th>Name</th>
							<th>Team</th>
							<th>Position</th>
							<th>Age</th>
							<th>Country</th>
						</tr>
					</thead>
					<tbody>{this.playerList()}</tbody>
				</table>
			</div>
		);
	}
}
