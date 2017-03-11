import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

const Weapon = ({ icon }) => (
	<span
		styleName="Weapon"
		className={icon ? `fa fa-hand-${icon}-o` : 'empty'}
	>
		{!icon && '?'}
	</span>
);

Weapon.propTypes = {
	icon: PropTypes.string,
};

export default CSSModules(Weapon, styles);
