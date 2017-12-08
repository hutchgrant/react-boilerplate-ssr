import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

class Home extends Component {
	renderBottom() {
		let bottomHeadings = [];
		for (let x = 0; x < 3; x++) {
			bottomHeadings[x] = (
				<div key={x} className="col-md-4">
					<h2>Heading</h2>
					<p>
						Donec id elit non mi porta gravida at eget metus. Fusce
						dapibus, tellus ac cursus commodo, tortor mauris
						condimentum nibh, ut fermentum massa justo sit amet
						risus. Etiam porta sem malesuada magna mollis euismod.
						Donec sed odio dui.
					</p>
					<p>
						<a className="btn btn-default" href="/" role="button">
							View details »
						</a>
					</p>
				</div>
			);
		}
		return bottomHeadings;
	}

	render() {
		return (
			<div>
				<Helmet>
					<title>React Boilerplate SSR</title>
					<meta property="og:title" content="React Boilerplate SSR" />
				</Helmet>
				<div className="jumbotron text-center">
					<h1>React Boilerplate SSR</h1>
					<p>
						React, Redux, Express, Mongo, Sass, Bootstrap,
						Server-Side Rendering, Basic Authentication,
					</p>
					<p>
						<a
							className="btn btn-primary btn-lg"
							href="https://github.com/hutchgrant/react-boilerplate-ssr"
							role="button"
						>
							Learn more
						</a>
					</p>
				</div>
				<div className="container">
					<div className="row">{this.renderBottom()}</div>
				</div>
			</div>
		);
	}
}

export default Home;
