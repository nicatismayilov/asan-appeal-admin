export interface AuthReducerState {
	isAuthenticated: boolean;
	loading: boolean;
	error: string;
}

export enum ActionTypes {
	AUHTENTICATE_USER_START = "AUHTENTICATE_USER_START",
	AUHTENTICATE_USER_SUCCESS = "AUHTENTICATE_USER_SUCCESS",
	AUHTENTICATE_USER_FAILURE = "AUHTENTICATE_USER_FAILURE",

	LOGOUT_USER_START = "LOGOUT_USER_START",
	LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS",
	LOGOUT_USER_FAILURE = "LOGOUT_USER_FAILURE",
}

export interface testAction {
	type: typeof ActionTypes.AUHTENTICATE_USER_START;
	payload: string;
}

export type Action = testAction;
