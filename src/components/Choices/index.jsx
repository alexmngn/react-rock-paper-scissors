import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.scss';

class Choices extends Component {
	render() {
		return (
			<div styleName="Choices">
				{Object.entries(this.props.choices).map(([ key ]) => (
					(!this.props.selected || this.props.selected === key) && (
						<button
							key={key}
							disabled={this.props.selected}
							onClick={() => this.props.onClickChoice(key)}
						>
							{key}
						</button>
					)
				))}
				--
				<button onClick={this.props.onClickReset}>Reset</button>
			</div>
		);
	}
}

Choices.propTypes = {
	selected: PropTypes.string,
	choices: PropTypes.object.isRequired,
	onClickChoice: PropTypes.func.isRequired,
	onClickReset: PropTypes.func.isRequired,
};

export default CSSModules(Choices, styles);
