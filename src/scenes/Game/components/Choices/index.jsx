import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.scss';
import ChoiceIcon from '../ChoiceIcon';

class Choices extends Component {
	render() {
		return (
			<div styleName="Choices">
				<span>Choose a weapon:</span>
				<div className="choices">
					{Object.entries(this.props.choices).map(([ key ]) => (
						<button
							key={key}
							disabled={this.props.selected}
							onClick={() => this.props.onClickChoice(key)}
						>
							<ChoiceIcon
								icon={key}
							/>
						</button>
					))}
				</div>
			</div>
		);
	}
}

Choices.propTypes = {
	choices: PropTypes.object.isRequired,
	onClickChoice: PropTypes.func.isRequired,
};

export default CSSModules(Choices, styles);
