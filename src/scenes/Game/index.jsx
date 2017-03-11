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
		label: 'PLAYER VS COMPUTER',
		player1Label: 'COMPUTER',
		player2Label: 'PLAYER',
	},
	simulate: {
		label: 'COMPUTER VS COMPUTER',
		player1Label: 'COMPUTER 1',
		player2Label: 'COMPUTER 2',
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
		score: 0,
	},
	player2: {
		weapon: null,
		score: 0,
	},
	winner: null,
};

class Game extends Component {

	state = initialState

	play(weapon) {
		const weapon1 = getRandomWeapon();
		const weapon2 = weapon || getRandomWeapon();
		const winner = getWinner(weapon1, weapon2);

		this.setState({
			player1: {
				...this.state.player1,
				weapon: weapon1,
				...((winner === 1) ? { score: this.state.player1.score + 1 } : {}),
			},
			player2: {
				...this.state.player2,
				weapon: weapon2,
				...((winner === 2) ? { score: this.state.player2.score + 1 } : {}),
			},
			winner,
		});
	}

	restart() {
		this.setState({
			player1: {
				...this.state.player1,
				weapon: initialState.player1.weapon,
			},
			player2: {
				...this.state.player2,
				weapon: initialState.player2.weapon,
			},
			winner: initialState.winner,
		});
	}

	reset() {
		this.setState(initialState);
	}

	toggleMode() {
		this.reset();
		this.setState({ mode: this.state.mode === modeKeys[0] ? modeKeys[1] : modeKeys[0] });
	}

	render() {
		const { player1Label, player2Label } = modes[this.state.mode];
		return (
			<div styleName="Game">
				<h1>
					ROCK, PAPER, SCISSORS
				</h1>

				<div className="modes">
					<Modes
						onClickMode={() => this.toggleMode()}
						label={modes[this.state.mode].label}
					/>
				</div>

				<div className="challenge">
					<Challenge
						player1={{ ...this.state.player1, label: player1Label }}
						player2={{ ...this.state.player2, label: player2Label }}
					/>
				</div>

				<div className="footer">
					{this.state.winner === null && this.state.mode === modeKeys[0] && (
						<WeaponList
							weapons={weaponKeys}
							onClickWeapon={weapon => this.play(weapon)}
						/>
					)}

					{(this.state.winner !== null || this.state.mode === modeKeys[1]) && (
						<Result
							player1Label={player1Label}
							player2Label={player2Label}
							winner={this.state.winner}
							onClickPlay={() => this.state.mode === modeKeys[1] ?
								this.play() : this.restart()
							}
						/>
					)}
				</div>
			</div>
		);
	}
}

export default CSSModules(Game, styles);
