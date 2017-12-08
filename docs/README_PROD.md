# Production

React Boilerplate SSR is meant primarily as a starter project, however if you
plan to put a modified version of this in production you will probably want to
use a better session store such as Redis. The default express-session store is
meant primarily for development.

You may also wish to create seperate configurations for production as each of
the APIs this software utilizes requires unique configurations for each
environment/domain. By default, the production configuration file (
<strong>./API/config/prod.js</strong> ) is setup to use environment variables so
that it works with heroku. You'll need to add those variables manually in your
environment if you wish to use something else.

You can launch the API in production with:

```
npm start --prefix API
```

If you move the API folder to a server by itself, you won't need the --prefix
API.

You can build and run the Client with:

```
npm start
```

## Scaling

The API is deliberately kept seperate from the client renderer so if you wish
you can move and scale them on another server. If you do this, you'll need to
edit the configuration redirect and api domain properties.

edit <strong>./API/config/dev.js</strong> with domain credentials

```
redirectDomain: 'http://localhost:3000',
apiDomain: 'http://localhost:5000'
```

You will also need to edit the proxy in the Client Renderer

edit <strong>./src/server/index.js</strong> with domain credentials

```
app.use(
	'/api',
	proxy('http://localhost:5000', {
		proxyReqOptDecorator(opts) {
			opts.headers['x-forwarded-host'] = 'localhost:3000';
			return opts;
		}
	})
);
```
