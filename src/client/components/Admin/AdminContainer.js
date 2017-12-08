import '../../styles/Admin';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import AdminHeader from './AdminHeader';
import Sidebar from './Sidebar/Sidebar';
import AdminDashboard from './Dashboard/Dashboard';

import requireAdmin from '../hocs/requireAdmin';

class AdminContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isDashLayout: true
		};
	}

	componentDidMount() {
		if (this.props.location.pathname.indexOf('/admin/dialog') !== -1) {
			this.setState({ isDashLayout: false });
		}
	}

	render() {
		return this.state.isDashLayout ? (
			<div className="page">
				<div className="dashboard">
					<AdminHeader {...this.props} />
					<Sidebar />
					<div className="container main">
						{renderRoutes(this.props.route.routes)}
					</div>
				</div>
			</div>
		) : (
			<div />
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(requireAdmin(AdminContainer));
