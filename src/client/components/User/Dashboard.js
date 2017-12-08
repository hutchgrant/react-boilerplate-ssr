import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import requireAuth from '../hocs/requireAuth';

class Dashboard extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<Helmet>
					<title>Dashboard</title>
					<meta property="og:title" content="Dashboard" />
				</Helmet>
				<h2>Dashboard</h2>
				<h5>Welcome {this.props.auth.username}</h5>
			</div>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(requireAuth(Dashboard, true));
