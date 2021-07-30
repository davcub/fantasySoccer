import React, { Component } from 'react';
import Axios from 'axios';

import { AddPlayerForm } from './forms/addPlayerForm';
import { EditPlayerForm } from './forms/editPlayerForm';
import { EditStatForm } from './forms/editStatForm';
import { Player } from './player';

import { StatsList } from './statsList';

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
			statView: false,
		};

		this.unrenderAddPlayerForm = this.unrenderAddPlayerForm.bind(this);
		this.renderEditPlayerForm = this.renderEditPlayerForm.bind(this);
		this.unrenderEditPlayerForm = this.unrenderEditPlayerForm.bind(this);
		this.renderStat = this.renderStat.bind(this);
		this.unrenderStat = this.unrenderStat.bind(this);
		this.unrenderAllStats = this.unrenderAllStats.bind(this);
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

	unrenderAllStats() {
		this.setState({
			statView: false,
		});
	}

	render() {
		let players = this.state.players;
		//have to check if players array is empty because it will have an error when rendering
		return players.length !== 0 ? (
			<div>
				<h3>Soccer Players</h3>
				{/* view table or (editForm or StatView) */}
				{this.state.changingView ? (
					//in here either edit form or view stat
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
					<div>
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
						{this.state.statView ? (
							<StatsList unrender={this.unrenderAllStats} />
						) : (
							<div>
								<button
									onClick={() => {
										this.setState({
											statView: true,
										});
									}}
								>
									Compare Stats
								</button>
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
							</div>
						)}
					</div>
				)}
			</div>
		) : (
			<div>
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
				<div>loading players or not players</div>
			</div>
		);
	}
}
