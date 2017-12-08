import _ from 'lodash';
import React, { Component } from 'react';

import MyRoutes from '../../../routes';
import SidebarItems from './SidebarItems';
let ResizeSensor;
let EQ;

class Sidebar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			routes: []
		};
		this.renderMenuList();
	}
	async componentDidMount() {
		if (process.env.IS_BROWSER) {
			ResizeSensor = require('css-element-queries/src/ResizeSensor.js');
			EQ = require('css-element-queries/src/ElementQueries.js');

			EQ.init();
			this.updateWindow();
			new ResizeSensor($('.main'), () => {
				this.updateWindow();
			});
		}
	}

	updateWindow() {
		let height3 = $(window).height() - 51;
		let height1 = $('.nav').height();
		let height2 = $('.main').height();
		let width = $(window).width();

		if (height2 > height3) {
			$('.sidebar').height(Math.max(height1, height3, height2) + 10);
		} else {
			$('.sidebar').height(Math.max(height1, height3, height2));
		}
		if (width < 768) {
			$('.sidebar').removeAttr('style');
		}
	}

	async renderMenuList() {
		await MyRoutes('admin').then(res => {
			const rt = res[0].routes.find(route => {
				if (route.path === '/admin') {
					this.setState({ routes: route.routes });
				}
			});
		});
	}

	renderSideBar() {
		return (
			<nav className="navbar navbar-sidebar sidebar">
				<div className="container-fluid">
					<div
						className="collapse navbar-collapse"
						id="bs-sidebar-navbar-collapse-1"
					>
						<SidebarItems items={this.state.routes} />
					</div>
				</div>
			</nav>
		);
	}

	render() {
		return <div className="sidebar">{this.renderSideBar()}</div>;
	}
}

export default Sidebar;
