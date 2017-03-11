import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import Button from 'components/Button';

const Result = ({ winner, player1Label, player2Label, onClickPlay }) => (
	<div styleName="Result">
		{winner !== null && (
			<div className="winner">
				<span>{winner === 1 ? player1Label : player2Label} {winner !== 'TIE' && 'WINS'}</span>
			</div>
		)}
		<div className="play">
			<Button onClick={onClickPlay}>PLAY {winner !== null && 'AGAIN'}</Button>
		</div>
	</div>
);

export default CSSModules(Result, styles);
