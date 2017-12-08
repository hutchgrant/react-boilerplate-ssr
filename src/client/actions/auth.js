import { FETCH_USER, LOGOUT_USER, INIT_FORM } from './authTypes';

export const initForm = () => dispatch => {
	dispatch({ type: INIT_FORM, payload: { error: null } });
};

export const createUser = (values, history) => async (
	dispatch,
	getState,
	api
) => {
	try {
		const res = await api({
			url: '/auth/signup',
			method: 'post',
			data: values
		});
		dispatch({ type: FETCH_USER, payload: res.data });
		if (res.data.error === null) {
			history.push('/dashboard');
		}
	} catch (err) {
		console.log(err);
	}
};

export const loginUser = (values, history) => async (
	dispatch,
	getState,
	api
) => {
	try {
		const res = await api({
			url: '/auth/login',
			method: 'post',
			data: values
		});
		dispatch({ type: FETCH_USER, payload: res.data });
	} catch (e) {
		console.log(e);
	}
};

export const logoutUser = history => async (dispatch, getState, api) => {
	try {
		const res = await api({
			url: '/auth/logout'
		});
		dispatch({ type: LOGOUT_USER, payload: res.data });
		history.push('/');
	} catch (err) {
		console.log(err);
	}
};

export const fetchUser = () => async (dispatch, getState, api) => {
	try {
		const res = await api({
			url: '/auth/current_user'
		});
		dispatch({ type: FETCH_USER, payload: res.data });
	} catch (err) {
		console.log(err);
	}
};
