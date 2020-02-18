import types from './ErrorTypes';

const initialState = {
  messageError: null,
};

const reducers = (state, action) => {
  const reducer = new Map();
  reducer.set(types.BUSINESS_ERROR, {
    ...state,
    messageError: action.data,
  });
  return reducer;
};

export default { reducers, initialState };
