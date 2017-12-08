import universal from 'react-universal-component';

import App from '../App';
import NotFound from '../components/NotFound';
import * as actions from '../actions/auth';

const UniversalLanding = universal(() => import(`../components/Landing`));
const UniversalLogin = universal(() => import(`../components/Auth/LoginForm`));
const UniversalSignup = universal(() =>
	import(`../components/Auth/SignupForm`)
);

const UniversalDash = universal(() => import(`../components/User/Dashboard`));
const UniversalSettings = universal(() =>
	import(`../components/User/Settings`)
);

export default [
	{
		component: App,
		prefetch: actions.fetchUser(),
		routes: [
			{
				component: UniversalLanding,
				path: '/',
				exact: true
			},
			{
				component: UniversalLogin,
				path: '/user/login'
			},
			{
				component: UniversalSignup,
				path: '/user/signup'
			},
			{
				component: UniversalDash,
				path: '/user/dashboard'
			},
			{
				component: UniversalSettings,
				path: '/user/settings'
			},
			{
				...NotFound
			}
		]
	}
];
