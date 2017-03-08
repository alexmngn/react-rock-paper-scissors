import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.scss';
import Modes from './components/Modes';
import Choices from './components/Choices';
import ChoiceIcon from './components/ChoiceIcon';

const choices = {
	rock: {
		wins: ['scissors'],
	},
	paper: {
		wins: ['rock'],
	},
	scissors: {
		wins: ['paper'],
	},
};

const modes = {
	vs: {
		label: 'Player vs Computer',
		winnerMap: ['Tie', 'Player', 'Computer'],
	},
	simulate: {
		label: 'Computer vs Computer',
		winnerMap: ['Tie', 'Computer 1', 'Computer 2'],
	}
};

const modeKeys = Object.keys(modes);

const getRandomChoice = () => {
	const keys = Object.keys(choices);
	return keys[ keys.length * Math.random() << 0];
};

const getWinner = (choice1, choice2) => {
	if (choice1 === choice2) return 0;
	return choices[choice1].wins.some(wins => wins === choice2) ? 1 : 2;
};

const renderResultChoice = (icon, label) => {
	return (
		<div className="result-choice">
			<ChoiceIcon
				icon={icon}
			/><br />
			<span className="label">{label}</span>
		</div>
	)
}

const initialState = {
	mode: modeKeys[0],
	choices: {
		player1: null,
		player2: null,
	},
	winner: null,
};

class Game extends Component {

	state = initialState

	changeMode(mode) {
		this.reset();
		this.setState({ mode });
	}

	play(choice) {
		this.setWinner(choice || getRandomChoice(), getRandomChoice());
	}

	setWinner(player1, player2) {
		const winner = getWinner(player1, player2);
		this.setState({ choices: { player1, player2 }, winner });
	}

	reset() {
		this.setState(initialState);
	}

	renderResult() {
		return (
			<div className="result-wrapper">
				{renderResultChoice(this.state.choices.player1, modes[this.state.mode].winnerMap[1])}
				<div className="result">
					<span>
						{modes[this.state.mode].winnerMap[this.state.winner]}
						{[null, 0].indexOf(this.state.winner) === -1 && ' wins'}
					</span>
					<div className="reset">
						<button
							onClick={() => this.state.mode === modeKeys[0] ? this.reset() : this.play()}
						>
							Play {this.state.winner !== null && 'again'}
						</button>
					</div>
				</div>
				{renderResultChoice(this.state.choices.player2, modes[this.state.mode].winnerMap[2])}
			</div>
		)
	}

	renderVsMode() {
		return (
			<div className="vs-mode">
				<Choices
					choices={choices}
					onClickChoice={choice => this.play(choice)}
				/>
			</div>
		);
	}

	render() {
		return (
			<div styleName="Game">
				<Modes
					modes={modes}
					onChange={mode => this.changeMode(mode)}
					selected={this.state.mode}
				/>
				{this.state.winner === null && this.state.mode === modeKeys[0] && this.renderVsMode()}
				{(this.state.winner !== null || this.state.mode === modeKeys[1]) && this.renderResult()}
			</div>
		);
	}
}

export default CSSModules(Game, styles);
