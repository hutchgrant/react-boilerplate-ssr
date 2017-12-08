import '../styles/Navigation';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = ({ auth, location, logoutUser, history }) => {
	const logout = () => {
		logoutUser(history);
	};

	const renderAdminNav = () => {
		if (auth.admin) {
			return (
				<li>
					<Link to="/admin/dashboard">Admin</Link>
				</li>
			);
		}
	};

	const renderContent = () => {
		if (auth !== null) {
			switch (auth.loggedIn) {
				case false:
					return (
						<li>
							<a href="/user/login">Login</a>
						</li>
					);
				default:
					return (
						<li key="2">
							<a
								className="dropdown-toggle"
								id="dropdownMenu1"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="true"
							>
								<i className="fa fa-user-o" aria-hidden="true">
									{' '}
								</i>
								{auth.username}
								<span className="caret" />
							</a>
							<ul
								className="dropdown-menu"
								aria-labelledby="dropdownMenu1"
							>
								<li>
									<Link to="/user/dashboard">Dashboard</Link>
								</li>
								<li>
									<Link to="/user/settings">Settings</Link>
								</li>
								{renderAdminNav()}
								<li role="separator" className="divider" />
								<li>
									<a
										className="cursorPointer"
										onClick={logout.bind(this)}
									>
										Logout
									</a>
								</li>
							</ul>
						</li>
					);
			}
		}
		return;
	};

	const path = location.pathname;
	if (
		path !== '/user/login' &&
		path !== '/user/signup' &&
		path.substring(0, 6) !== '/admin'
	) {
		return (
			<nav className="navbar navbar-default navbar-static-top">
				<div className="container">
					<div className="navbar-header">
						<button
							type="button"
							className="navbar-toggle collapsed"
							data-toggle="collapse"
							data-target="#bs-example-navbar-collapse-1"
							aria-expanded="false"
						>
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar" />
							<span className="icon-bar" />
							<span className="icon-bar" />
						</button>
						<Link to="/" className="navbar-brand">
							React Boilerplate
						</Link>
					</div>
					<div
						className="collapse navbar-collapse"
						id="bs-example-navbar-collapse-1"
					>
						<ul className="nav navbar-nav" />
						<ul className="nav navbar-nav navbar-right">
							{renderContent()}
						</ul>
					</div>
				</div>
			</nav>
		);
	} else {
		return <div> </div>;
	}
};

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(withRouter(Header));
