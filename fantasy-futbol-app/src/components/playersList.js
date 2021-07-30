import React, { Component } from 'react';
import Axios from 'axios';

import { AddPlayerForm } from './forms/addPlayerForm';
import { EditPlayerForm } from './forms/editPlayerForm';
import { EditStatForm } from './forms/editStatForm';

//Player component is used to render table row data
class Player extends Component {
	constructor(props) {
		super(props);

		this.handleRemove = this.handleRemove.bind(this);
	}

	handleRemove() {
		Axios.delete(`http://localhost:5000/players/${this.props.player._id}`)
			.then(() => {
				//delete player's stats here
				let statKey =
					this.props.player.name +
					this.props.player.team +
					this.props.player.position;
				Axios.delete(
					`http://localhost:5000/stats/statKey/${statKey.replaceAll(/\s/g, '')}`
				).then(() => {
					window.location.reload();
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		let statKey =
			this.props.player.name +
			this.props.player.team +
			this.props.player.position;
		return (
			<tr>
				<td>{this.props.player.name}</td>
				<td>{this.props.player.team}</td>
				<td>{this.props.player.position}</td>
				<td>{this.props.player.age}</td>
				<td>{this.props.player.country}</td>
				<td>
					<button
						onClick={() => {
							this.props.renderEditForm(this.props.player._id);
						}}
					>
						Edit
					</button>
					<button
						onClick={() => {
							this.handleRemove();
						}}
					>
						Remove
					</button>
				</td>
				<td>
					<button
						onClick={() => {
							this.props.renderStat(statKey.replaceAll(/\s/g, ''));
						}}
					>
						View
					</button>
				</td>
			</tr>
		);
	}
}

export class PlayersList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			players: [],
			addPlayerForm: false,
			editPlayerForm: false,
			editingPlayerById: '',
			viewStat: false,
			changingView: false,
			editingStatByKey: '',
		};

		this.unrenderAddPlayerForm = this.unrenderAddPlayerForm.bind(this);
		this.renderEditPlayerForm = this.renderEditPlayerForm.bind(this);
		this.unrenderEditPlayerForm = this.unrenderEditPlayerForm.bind(this);

		this.renderStat = this.renderStat.bind(this);
		this.unrenderStat = this.unrenderStat.bind(this);
	}

	//will make axios call after the first render
	componentDidMount() {
		Axios.get('http://localhost:5000/players')
			.then((response) => {
				this.setState({ players: response.data });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	playersList() {
		return this.state.players.map((currentPlayer) => {
			return (
				<Player
					key={currentPlayer._id}
					player={currentPlayer}
					renderEditForm={this.renderEditPlayerForm}
					renderStat={this.renderStat}
				/>
			);
		});
	}

	unrenderAddPlayerForm() {
		this.setState({
			addPlayerForm: false,
		});
	}

	renderEditPlayerForm(id) {
		this.setState({
			changingView: true,
			editPlayerForm: true,
			editingPlayerById: id,
		});
	}

	unrenderEditPlayerForm() {
		this.setState({
			changingView: false,
			editPlayerForm: false,
		});
	}

	renderStat(statKey) {
		//console.log(statKey);
		this.setState({
			editingStatByKey: statKey,
			changingView: true,
		});
	}

	unrenderStat() {
		this.setState({
			changingView: false,
		});
	}

	render() {
		let players = this.state.players;
		//have to check if players array is empty because it will have an error when rendering
		return players.length !== 0 ? (
			<div>
				<h3>Soccer Players</h3>
				{this.state.addPlayerForm ? (
					<AddPlayerForm unrender={this.unrenderAddPlayerForm} />
				) : (
					<button
						onClick={() => {
							this.setState({
								addPlayerForm: true,
							});
						}}
					>
						Add Player
					</button>
				)}
				{/* view table or (editForm or StatView) */}

				{this.state.changingView ? (
					//in here either edit form or stat
					this.state.editPlayerForm ? (
						<EditPlayerForm
							playerID={this.state.editingPlayerById}
							unrender={this.unrenderEditPlayerForm}
						/>
					) : (
						<EditStatForm
							statKey={this.state.editingStatByKey}
							unrender={this.unrenderStat}
						/>
					)
				) : (
					<table className="table">
						<thead className="thead-light">
							<tr>
								<th>Name</th>
								<th>Team</th>
								<th>Position</th>
								<th>Age</th>
								<th>Country</th>
								<th>Actions</th>
								<th>Stats</th>
							</tr>
						</thead>
						<tbody>{this.playersList()}</tbody>
					</table>
				)}
			</div>
		) : (
			<div>{'loading players'}</div>
		);
	}
}
