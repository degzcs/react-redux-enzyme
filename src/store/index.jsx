import React, { createContext, useContext, useReducer } from 'react';
import { fromJS } from 'immutable';
import errorReducers from '../utils/Error/ErrorReducers';

const initialState = fromJS({
  loadButton: false,
});

export const StoreContext = createContext(initialState);

let reducers = null;

const reducer = (state, action) => {
  reducers = new Map([...errorReducers.reducers(state, action)]);
  if (action.fieldUpdate) {
    if (action.fieldUpdate instanceof Array) {
      return state.setIn(action.fieldUpdate, action.data);
    }
    return state.set(action.fieldUpdate, action.data);
  }
  const data = reducers.get(action.type);
  if (action.type === 'BUSINESS_ERROR') {
    return state.set('error', action.data);
  }
  if (data === null || data === undefined) {
    throw new Error('Not contain action '.concat(action.type));
  } else {
    return data;
  }
};

export const StoreContainer = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStateValue = () => useContext(StoreContext);
