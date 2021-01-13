import { combineReducers } from "redux";

const rootReducer = combineReducers({});

export type StoreState = ReturnType<typeof rootReducer>;

export default rootReducer;
