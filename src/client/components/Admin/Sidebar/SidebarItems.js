import React from 'react';
import { Link } from 'react-router-dom';

export default ({ items }) => {
	const renderItems = () => {
		return items.map(({ name, icon, path }, index) => {
			return (
				<li key={index} className={index === 0 ? 'active' : ''}>
					<Link to={path}>
						{name} &nbsp;
						<span
							style={{ fontSize: '16px' }}
							className={`pull-right hidden-xs showopacity ${
								icon
							}`}
						/>
					</Link>
				</li>
			);
		});
	};

	return <ul className="nav navbar-nav">{renderItems()}</ul>;
};
