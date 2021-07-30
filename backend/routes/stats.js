const router = require('express').Router();
let Stat = require('../models/stat.model'); //mongoose model

//first endpoint
router.route('/').get((req, res) => {
	Stat.find() //mongoose method that get all the players in the mongoDB database
		.then((stats) => res.json(stats)) //return players in json format
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
	const statKey = req.body.statKey;
	const playerName = req.body.playerName;
	const goals = req.body.goals;
	const assists = req.body.assists;
	const redCards = req.body.redCards;
	const yellowCards = req.body.yellowCards;

	const newStat = new Stat({
		statKey,
		playerName,
		goals,
		assists,
		redCards,
		yellowCards,
	});

	newStat
		.save() // new stat is save to the database
		.then(() => res.json('Stats added!'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
	Stat.findById(req.params.id)
		.then((stat) => res.json(stat))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
	Stat.findByIdAndDelete(req.params.id)
		.then(() => res.json('Stat deleted'))
		.catch((err) => res.status(400).json('Error ' + err));
});

router.route('/update/:id').post((req, res) => {
	Stat.findById(req.params.id)
		.then((stat) => {
			stat.statKey = req.body.statKey;
			stat.name = req.body.playerName;
			stat.goals = Number(req.body.goals);
			stat.assists = Number(req.body.assists);
			stat.redCards = Number(req.body.redCards);
			stat.yellowCards = Number(req.body.yellowCards);

			stat
				.save()
				.then(() => res.json('Stat updated'))
				.catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Erro: ' + err));
});

//finding stat of certain player by statKey
router.route('/find/:statKey').get((req, res) => {
	Stat.find({ statKey: req.params.statKey })
		.then((stat) => res.json(stat)) //return player in json format
		.catch((err) => res.status(400).json('Error: ' + err));
});

//delete stat of certain player by statkey
router.route('/statKey/:statKey').delete((req, res) => {
	Stat.deleteOne({ statKey: req.params.statKey })
		.then(() => res.json('Stats deleted by statKey'))
		.catch((err) => res.status(400).json('Error ' + err));
});

module.exports = router;
