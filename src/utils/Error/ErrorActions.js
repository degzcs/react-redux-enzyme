import ErrorTypes from './ErrorTypes';

const clearMessageError = dispatch => dispatch({ type: ErrorTypes.BUSINESS_ERROR, data: false });

export default { clearMessageError };
