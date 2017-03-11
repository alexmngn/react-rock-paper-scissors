import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import Player from './components/Player';

const Challenge = ({ player1, player2 }) => (
	<div styleName="Challenge">
		<Player
			{...player1}
		/>
		<span className="vs">vs</span>
		<Player
			{...player2}
		/>
	</div>
)

export default CSSModules(Challenge, styles);
