import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { PlayersList } from './components/playersList.js';
//import { StatsList } from './components/statsList.js';

function App() {
	return (
		<div className="App">
			<PlayersList />
		</div>
	);
}

export default App;
