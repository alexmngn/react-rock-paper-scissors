import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

import Weapon from '../Weapon';

const WeaponList = ({ weapons, onClickWeapon }) => (
	<ul styleName="WeaponList">
		{weapons.map(weapon => (
			<li key={weapon}>
				<button
					onClick={() => onClickWeapon(weapon)}
				>
					<Weapon
						icon={weapon}
					/>
				</button>
			</li>
		))}
	</ul>
);

export default CSSModules(WeaponList, styles);
