import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

import Weapon from 'scenes/Game/components/Weapon';

const Player = ({ label, weapon }) => (
	<div styleName="Player">
		<span className="label">{label}</span>
		<Weapon
			icon={weapon}
		/>
	</div>
);

export default CSSModules(Player, styles);
