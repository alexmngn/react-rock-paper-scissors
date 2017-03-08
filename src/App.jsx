import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css';
import 'normalize.css/normalize.css';

import './styles.scss';
import Game from './scenes/Game';

class App extends Component {
	render() {
		return (
			<Game />
		);
	}
}

export default App;
