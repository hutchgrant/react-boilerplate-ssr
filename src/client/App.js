import styles from './styles/App';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import Header from './components/Header';
import Footer from './components/Footer';
import * as actions from './actions/auth';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoadingUserToken: true
		};
	}

	componentDidMount() {
		this.props.fetchUser();
		if (this.props.auth !== null) {
			this.setState({ isLoadingUserToken: false });
		}
	}

	render() {
		if (this.props.auth !== null) {
			return (
				<div className="page">
					<Header {...this.props} />
					{renderRoutes(this.props.route.routes)}
					<Footer />
				</div>
			);
		} else {
			return <div />;
		}
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps, actions)(App);
