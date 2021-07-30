import React, { Component } from 'react';
import Axios from 'axios';

export class Player extends Component {
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
