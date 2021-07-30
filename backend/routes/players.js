const router = require('express').Router();
let Player = require('../models/player.model'); //mongoose model

//first endpoint
router.route('/').get((req, res) => {
	Player.find() //mongoose method that get all the players in the mongoDB database
		.then((players) => res.json(players)) //return players in json format
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
	const name = req.body.name;
	const team = req.body.team;
	const position = req.body.position;
	const age = req.body.age;
	const country = req.body.country;

	const newPlayer = new Player({ name, team, position, age, country });

	newPlayer
		.save() // new player is save to the database
		.then(() => res.json('Player Added'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
	Player.findById(req.params.id)
		.then((player) => res.json(player))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
	Player.findByIdAndDelete(req.params.id)
		.then(() => res.json('Player deleted'))
		.catch((err) => res.status(400).json('Error ' + err));
});

router.route('/update/:id').post((req, res) => {
	Player.findById(req.params.id)
		.then((player) => {
			player.name = req.body.name;
			player.team = req.body.team;
			player.position = req.body.position;
			player.age = Number(req.body.age);
			player.country = req.body.country;

			player
				.save()
				.then(() => res.json('Player updated'))
				.catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Erro: ' + err));
});

module.exports = router;
