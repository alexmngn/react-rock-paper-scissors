import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.scss';

class Choices extends Component {
	render() {
		return (
			<div styleName="Choices">
				{Object.entries(this.props.choices).map(([ key ]) => (
					<button
						key={key}
						onClick={() => this.props.onClickChoice(key)}
					>
						{key}
					</button>
				))}
			</div>
		);
	}
}

Choices.propTypes = {
	choices: PropTypes.object.isRequired,
	onClickChoice: PropTypes.func.isRequired,
};

export default CSSModules(Choices, styles);
