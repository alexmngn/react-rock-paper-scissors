import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

class ChoiceIcon extends Component {
	render() {
		return (
			<span
				styleName="ChoiceIcon"
				className={this.props.icon ? `fa fa-hand-${this.props.icon}-o` : 'empty'}
			/>
		);
	}
}

ChoiceIcon.propTypes = {
	icon: PropTypes.string,
}

export default CSSModules(ChoiceIcon, styles);
