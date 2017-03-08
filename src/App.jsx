import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from 'styles.scss';

class App extends Component {
	render() {
		return (
			<div styleName="App">
				It works
			</div>
		);
	}
}

export default CSSModules(App, styles);
