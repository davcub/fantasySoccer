const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); //helps connect to mongDB database

//config so that we can have environment variables
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json()); //allow us to parse json

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB database connection established');
});

//require and use the route files
const playersRouter = require('./routes/players.js');
const statsRouter = require('./routes/stats.js');

app.use('/players', playersRouter);
app.use('/stats', statsRouter);

//it is what start the server
app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
