import { combineReducers } from "@reduxjs/toolkit";
import { mapWithPersistor } from "./persistance";
import clientReducer, {persistedKey} from "./containers/ClientContainer/reducer";

// * reducers that will stored to localStorage
const storedReducers = {
	client: { reducer: clientReducer, whitelist: persistedKey },
};

const temporaryReducers = {
};

export default function createRecuer(injectedReducer = {}) {
	return combineReducers({
		...mapWithPersistor(storedReducers),
		...temporaryReducers,
		...injectedReducer,
	});
}