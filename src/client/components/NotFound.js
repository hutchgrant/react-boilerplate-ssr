import React from 'react';
import { Helmet } from 'react-helmet';

const NotFound = ({ staticContext = {} }) => {
	staticContext.notFound = true;
	return (
		<div>
			<Helmet>
				<title>Page Not Found</title>
				<meta property="og:title" content="Page Not Found" />
			</Helmet>
			<h1>Oops, route not found. </h1>;
		</div>
	);
};

export default {
	component: NotFound
};
