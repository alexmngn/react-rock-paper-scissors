import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.scss';

class Modes extends Component {
	render() {
		return (
			<div styleName="Modes">
				{Object.entries(this.props.modes).map(([ key, value ]) => {
					const inputId = `mode-${key}`;
					return (
						<span
							key={key}
						>
							<input
								id={inputId}
								value={key}
								type="radio"
								name="mode"
								checked={this.props.selected === key}
								onChange={() => this.props.onChange(key)}
							/>
							<label htmlFor={inputId}>
								{value.label}
							</label>{' '}
						</span>
					);
				})}
			</div>
		);
	}
}

Modes.propTypes = {
	selected: PropTypes.string.isRequired,
	modes: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default CSSModules(Modes, styles);
