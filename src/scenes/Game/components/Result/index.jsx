import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

const Result = ({ winner, player1Label, player2Label, onClickPlay }) => (
	<div styleName="Result">
		{winner !== null && (
			<div>
				<span>{winner === 1 ? player1Label : player2Label} {winner !== 'Tie' && 'wins'}</span>
			</div>
		)}
		<div>
			<button onClick={onClickPlay}>Play {winner !== null && 'again'}</button>
		</div>
	</div>
);

export default CSSModules(Result, styles);
