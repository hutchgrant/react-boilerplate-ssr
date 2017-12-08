import { FETCH_USER, LOGOUT_USER, INIT_FORM } from '../actions/authTypes';

export default function(state = null, { type, payload }) {
	switch (type) {
		case FETCH_USER:
			return payload;
		case INIT_FORM:
			return { ...state, error: null };
		case LOGOUT_USER:
			return payload;
		default:
			return state;
	}
}
