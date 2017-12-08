import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import requireAuth from '../hocs/requireAuth';

class Settings extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		if (this.props.auth !== null) {
			return (
				<div>
					<Helmet>
						<title>User Settings</title>
						<meta property="og:title" content="User Settings" />
					</Helmet>
					<h2>Settings</h2>
					<h5>Welcome {this.props.auth.username}</h5>
				</div>
			);
		} else {
			return <div>loading... </div>;
		}
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(requireAuth(Settings, true));
