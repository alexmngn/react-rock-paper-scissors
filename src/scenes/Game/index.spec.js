/* eslint-disable no-unused-expressions */

import 'babel-polyfill';
import React from 'react';
import { shallow } from 'enzyme';
import Game, { getRandomWeapon, getWinner } from 'scenes/Game';

describe('Game', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<Game />);
	});

	it('should return random weapon', () => {
		const weapons = ['rock', 'paper', 'scissors'];
		let weaponFound = [];
		let valid = false;

		// Loop multiple times and expect all weapons to show up at least once.
		for (let i = 0, end = 20; i < end; i++) {
			const weapon = getRandomWeapon();
			if (weapons.indexOf(weapon) > -1 && weaponFound.indexOf(weapon) === -1) weaponFound.push(weapon);
			if (weaponFound.length === weapons.length) {
				valid = true;
				i = end;
			}
		}

		expect(valid).to.be.true;
	})

	it ('should determine winner', () => {
		let winner = getWinner('paper', 'rock');
		expect(winner).to.be.equal(1);
		winner = getWinner('rock', 'paper');
		expect(winner).to.be.equal(2);
		winner = getWinner('rock', 'scissors');
		expect(winner).to.be.equal(1);
		winner = getWinner('scissors', 'rock');
		expect(winner).to.be.equal(2);
		winner = getWinner('scissors', 'paper');
		expect(winner).to.be.equal(1);
		winner = getWinner('paper', 'scissors');
		expect(winner).to.be.equal(2);
	})

	it('should render weapon list', () => {
		expect(wrapper.text()).to.contain('WeaponList');
		wrapper.setState({ winner: 1 });
		expect(wrapper.text()).to.not.contain('WeaponList');
		wrapper.setState({ winner: null, player1: { loading: true } });
		expect(wrapper.text()).to.not.contain('WeaponList');
		wrapper.setState({ player1: { loading: false }, player2: { loading: true } });
		expect(wrapper.text()).to.not.contain('WeaponList');
		wrapper.setState({ player2: { loading: false }, mode: 'simulate' });
		expect(wrapper.text()).to.not.contain('WeaponList');
	});

	it('should render result', () => {
		wrapper.setState({ winner: null, player1: { loading: false }, player2: { loading: false }, mode: 'vs' });
		expect(wrapper.text()).to.not.contain('Result');
		wrapper.setState({ winner: 1 });
		expect(wrapper.text()).to.contain('Result');
		wrapper.setState({ winner: null, player1: { loading: true } });
		expect(wrapper.text()).to.contain('Result');
		wrapper.setState({ player1: { loading: false }, player2: { loading: true } });
		expect(wrapper.text()).to.contain('Result');
		wrapper.setState({ player2: { loading: false }, mode: 'simulate' });
		expect(wrapper.text()).to.contain('Result');
	});

	it('should run a new play round in vs mode', () => {
		const weapon = 'rock';
		wrapper.instance().play(weapon);
		let state = wrapper.state();
		expect(state.player1.loading).to.be.true;
		expect(state.player1.weapon).to.not.be.null;
		expect(state.player2.loading).to.be.false;
		expect(state.player2.weapon).to.be.equal(weapon);
	});


	it('should run a new play round in simulate mode', () => {
		wrapper.setState({ mode: 'simulate' });
		wrapper.instance().play();
		let state = wrapper.state();
		expect(state.player1.loading).to.be.true;
		expect(state.player1.weapon).to.not.be.null;
		expect(state.player2.loading).to.be.true;
		expect(state.player2.weapon).to.not.be.null;
	});

	it('should set result', () => {
		let state
		const test = (weapon1, weapon2) => {
			wrapper.setState({
				player1: { loading: true, weapon: weapon1, score: 0 },
				player2: { loading: true, weapon: weapon2, score: 0 },
			});
			wrapper.instance().setResult();
			state = wrapper.state();
			expect(state.winner).to.be.equal(getWinner(weapon1, weapon2));
			expect(state.player1.loading).to.be.false;
			expect(state.player2.loading).to.be.false;
		};
		test('rock', 'paper');
		expect(state.player1.score !== 0 || state.player2.score !== 0).to.be.true;
		test('rock', 'rock');
		expect(state.player1.score === 0 || state.player2.score === 0).to.be.true; // Tie
	});

	it('should reset weapons and winner', () => {
		wrapper.setState({
			player1: { weapon: 'rock' },
			player2: { weapon: 'paper' },
			winner: 1,
		});
		wrapper.instance().restart();
		const state = wrapper.state();
		expect(state.player1.weapon).to.be.null;
		expect(state.player2.weapon).to.be.null;
		expect(state.winner).to.be.null;
	});

	it('should toggle mode between "vs" and "simulate"', () => {
		let instance = wrapper.instance();
		instance.toggleMode();
		expect(wrapper.state().mode).to.equal('simulate');
		instance.toggleMode();
		expect(wrapper.state().mode).to.equal('vs');
	});
});
