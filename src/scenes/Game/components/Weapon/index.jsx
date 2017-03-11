import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

import Loading from 'components/Loading';

const Weapon = ({ icon, loading }) => (
	<span
		styleName="Weapon"
		className={!loading && icon ? `fa fa-hand-${icon}-o` : 'empty'}
	>
		{!loading && !icon && '?'}
		{loading && <Loading />}
	</span>
);

Weapon.propTypes = {
	icon: PropTypes.string,
};

export default CSSModules(Weapon, styles);
