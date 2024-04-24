import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import { persistConfig } from "./persistance";
import createSagaMiddleware from 'redux-saga'

import createRecuer from "./reducers";
import rootSaga from "./rootSaga";

const initialState = {};

const sagaMiddleware = createSagaMiddleware()

const configuringStore = (initState = {}) => {
  const allReducers = persistReducer(persistConfig, createRecuer());
    const middlewares = [sagaMiddleware];


    const store = configureStore({
        reducer: allReducers , 
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares),
        preloadedState: initState,
        devTools: import.meta.NODE_ENV === 'production'? false : true,
    });

      sagaMiddleware.run(rootSaga);

    return store;
}

const store = configuringStore(initialState);

export default store;
export const persistor = persistStore(store);