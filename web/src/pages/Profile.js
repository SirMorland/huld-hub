import React from 'react';
import Cookies from 'js-cookie';

export default class Profile extends React.Component {
	constructor() {
		super();

		this.state = {
			user: null
		};
	}

	async componentDidMount() {
		let jwt = Cookies.get("hub-jwt");

		if(!jwt) {
			this.props.history.push("/");
		} else {
			let id = this.props.match.params.id;

			const url = `${process.env.REACT_APP_BACKEND_HOST}/users/${id}`;
			const response = await fetch(url, {
				headers: {
					"Authorization": `Bearer ${jwt}`
				}
			});
			
			if(response.status === 204) {	// User not found with given id
				this.setState({				// TODO: maybe redirect to actual 404 page
					user: false
				});
			} else {	
				const json = await response.json();
				
				if(json.statusCode >= 400 && json.statusCode < 500) {	// Not authorized or authenticated
					this.props.history.push("/");						// Redirect to login page
				} else {	
					this.setState({
						user: json
					});
				}
			}
		}
	}

	render() {
		let { user } = this.state;

		return (
			<React.Fragment>
				<h1>Hub</h1>
				<h2>{user === null ? "" : (user ? user.email : "404")}</h2>
			</React.Fragment>
		);
	}
}