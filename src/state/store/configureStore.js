import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { initialState } from './initialState';
import rootReducer from '../reducers/rootReducer';

const configureStore = () => {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}

export default configureStore;
