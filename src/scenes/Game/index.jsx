import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.scss';
import Modes from './components/Modes';
import Challenge from './components/Challenge';
import WeaponList from './components/WeaponList';
import Result from './components/Result';

const weapons = {
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
		player1Label: 'Computer',
		player2Label: 'Player',
	},
	simulate: {
		label: 'Computer vs Computer',
		player1Label: 'Computer 1',
		player2Label: 'Computer 2',
	}
};

const modeKeys = Object.keys(modes);
const weaponKeys = Object.keys(weapons);

const getRandomWeapon = () => {
	return weaponKeys[ weaponKeys.length * Math.random() << 0];
};

const getWinner = (weapon1, weapon2) => {
	if (weapon1 === weapon2) return false;
	return weapons[weapon1].wins.some(wins => wins === weapon2) ? 1 : 2;
}

const initialState = {
	mode: modeKeys[0],
	player1: {
		weapon: null,
	},
	player2: {
		weapon: null,
	},
	winner: null,
};

class Game extends Component {

	state = initialState

	play(weapon) {
		const weapon1 = getRandomWeapon();
		const weapon2 = weapon || getRandomWeapon();

		this.setState({
			player1: {
				weapon: weapon1,
			},
			player2: {
				weapon: weapon2,
			},
			winner: getWinner(weapon1, weapon2),
		});
	}

	restart() {
		this.setState({
			player1: {
				weapon: initialState.player1.weapon,
			},
			player2: {
				weapon: initialState.player2.weapon,
			},
			winner: initialState.winner,
		});
	}

	reset() {
		this.setState(initialState);
	}

	changeMode(mode) {
		this.reset();
		this.setState({ mode });
	}

	render() {
		return (
			<div styleName="Game">
				<Modes
					modes={modes}
					onChange={mode => this.changeMode(mode)}
					selected={this.state.mode}
				/>
				<Challenge
					player1={this.state.player1}
					player2={this.state.player2}
				/>
				{this.state.winner === null && this.state.mode === modeKeys[0] && (
					<WeaponList
						weapons={weaponKeys}
						onClickWeapon={weapon => this.play(weapon)}
					/>
				)}

				{(this.state.winner !== null || this.state.mode === modeKeys[1]) && (
					<Result
						player1Label={modes[this.state.mode].player1Label}
						player2Label={modes[this.state.mode].player2Label}
						winner={this.state.winner}
						onClickPlay={() => this.state.mode === modeKeys[1] ?
							this.play() : this.restart()
						}
					/>
				)}
			</div>
		);
	}
}

export default CSSModules(Game, styles);
