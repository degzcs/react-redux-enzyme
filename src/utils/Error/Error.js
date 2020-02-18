import Swal from 'sweetalert2';
import ErrorActions from './ErrorActions';

export default (errorMessage, dispatch) => (
  Swal.fire({
    type: 'error',
    title: 'Unexpected error...',
    text: errorMessage,
    onClose: () => ErrorActions.clearMessageError(dispatch),
  })
);
