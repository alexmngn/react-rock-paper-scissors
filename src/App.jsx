import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.scss';
import Modes from './components/Modes';
import Choices from './components/Choices';
import Play from './components/Play';

const choices = {
	rock: {
		wins: ['scissor'],
	},
	paper: {
		wins: ['rock'],
	},
	scissor: {
		wins: ['paper'],
	},
};

const modes = {
	vs: {
		label: 'You vs Computer',
	},
	simulate: {
		label: 'Computer vs Computer'
	}
};

const winnerMap = ['Tie', 'Player 1', 'Player 2'];

const getRandomChoice = () => {
	const keys = Object.keys(choices);
	return keys[ keys.length * Math.random() << 0];
};

const getWinner = (choice1, choice2) => {
	if (choice1 === choice2) return 0;
	return choices[choice1].wins.some(wins => wins === choice2) ? 1 : 2;
};

const initialState = {
	mode: Object.keys(modes)[0],
	choices: {
		player1: null,
		player2: null,
	},
	winner: null,
};

class App extends Component {

	state = initialState

	setWinner(player1, player2) {
		const winner = getWinner(player1, player2);
		this.setState({ choices: { player1, player2 }, winner });
	}

	onChangeMode(mode) {
		this.onClickReset();
		this.setState({ mode });
	}

	onClickChoice(choice) {
		this.setWinner(choice, getRandomChoice());
	}

	onClickPlay() {
		this.setWinner(getRandomChoice(), getRandomChoice());
	}

	onClickReset() {
		this.setState(initialState);
	}

	renderGame() {
		return this.state.mode === Object.keys(modes)[0] ? (
			<Choices
				choices={choices}
				onClickChoice={choice => this.onClickChoice(choice)}
				onClickReset={() => this.onClickReset()}
				selected={this.state.choices.player1}
			/>
		) : (
			<Play
				onClick={() => this.onClickPlay()}
			/>
		);
	}

	render() {
		return (
			<div styleName="App">
				<Modes
					modes={modes}
					onChange={mode => this.onChangeMode(mode)}
					selected={this.state.mode}
				/>
				{this.renderGame()}
				Player1: {this.state.choices.player1}<br />
				Player2: {this.state.choices.player2}<br />
				Winner: {winnerMap[this.state.winner]}<br /><br />
			</div>
		);
	}
}

export default CSSModules(App, styles);
