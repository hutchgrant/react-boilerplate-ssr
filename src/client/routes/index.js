export default async type => {
	if (type === 'guest') {
		const Routes = await import('./Client').then(res => {
			return res.default;
		});
		return Routes;
	} else {
		const RoutesAdmin = await import('./Admin').then(res => {
			return res.default();
		});
		return RoutesAdmin;
	}
};
