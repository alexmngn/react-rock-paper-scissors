import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

const Player = ({ label, weapon }) => (
	<div styleName="Player">
		<span>{label}</span>
		<span>{weapon}</span>
	</div>
);

export default CSSModules(Player, styles);
