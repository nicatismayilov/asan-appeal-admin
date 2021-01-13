import { Reducer } from "react";

import { AuthReducerState, Action, ActionTypes } from "./types";

const initialState: AuthReducerState = {
	isAuthenticated: false,
	loading: false,
	error: "",
};

const reducer: Reducer<AuthReducerState, Action> = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.AUHTENTICATE_USER_START:
			return {
				...state,
				loading: true,
			};

		default:
			return state;
	}
};

export default reducer;
