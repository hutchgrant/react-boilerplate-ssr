import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default (ChildComponent, loggedIn) => {
	class RequireAuth extends Component {
		render() {
			switch (this.props.auth.loggedIn) {
				case false:
					return loggedIn ? (
						<Redirect to="/" />
					) : (
						<ChildComponent {...this.props} />
					);
				case null:
					return <div>Loading...</div>;
				default:
					return loggedIn ? (
						<ChildComponent {...this.props} />
					) : (
						<Redirect to="/user/dashboard" />
					);
			}
		}
	}

	function mapStateToProps({ auth }) {
		return { auth };
	}

	return connect(mapStateToProps)(RequireAuth);
};
