import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.scss';

class Play extends Component {
	render() {
		return (
			<div
				styleName="Play"
			>
				<button
					{...this.props}
				>
					Play
				</button>
			</div>
		);
	}
}

Play.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export default CSSModules(Play, styles);
