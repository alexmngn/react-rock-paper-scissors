import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

const Loading = () => (
	<span styleName="loading" />
);

export default CSSModules(Loading, styles);
