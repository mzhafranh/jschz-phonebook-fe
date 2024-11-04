import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { thunk}  from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // Middleware for async actions
);

export default store;
