import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.scss';
import Choices from './components/Choices';

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

const getRandomChoice = () => {
	const keys = Object.keys(choices);
	return keys[ keys.length * Math.random() << 0];
};

const getWinnerChoice = (choice1, choice2) => {
	if (choice1 === choice2) return null;
	return choices[choice1].wins.some(wins => wins === choice2) ? choice1 : choice2;
};

class App extends Component {
	onClickChoice(choice) {
		const player1Choice = choice;
		const player2Choice = getRandomChoice();
		const winnerChoice = getWinnerChoice(player1Choice, player2Choice);
		console.log(player1Choice, player2Choice, winnerChoice);
	}
	render() {
		return (
			<div styleName="App">
				<Choices
					choices={choices}
					onClickChoice={choice => this.onClickChoice(choice)}
				/>
			</div>
		);
	}
}

export default CSSModules(App, styles);
