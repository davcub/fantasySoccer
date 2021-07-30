const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerSchema = new Schema(
	{
		name: { type: String, required: true },
		team: { type: String, required: false },
		position: { type: String, required: false },
		age: { type: Number, required: false },
		country: { type: String, required: false },
	},
	{
		timestamps: true,
	}
);

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
