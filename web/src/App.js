import React from 'react';

export default class App extends React.Component {
	constructor() {
		super();

		this.state = {
			message: ""
		};
	}

	async componentDidMount() {
		let response = await fetch("/ping");
		let text = await response.text();
		this.setState({
			message: text
		});
	}

	render() {
		return (
			<React.Fragment>
				<h1>Hub</h1>
				<p>{this.state.message}</p>
			</React.Fragment>
		);
	}
}