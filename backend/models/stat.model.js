const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statSchema = new Schema(
	{
		statKey: String,
		playerName: String,
		goals: { type: Number, required: false },
		assists: { type: Number, required: false },
		redCards: { type: Number, required: false },
		yellowCards: { type: Number, required: false },
	},
	{
		timestamps: true,
	}
);

const Stat = mongoose.model('Stat', statSchema);

module.exports = Stat;
