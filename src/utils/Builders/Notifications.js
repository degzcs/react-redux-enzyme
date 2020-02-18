export default {
  success: (title, message) => (
    {
      title,
      message,
      type: 'success',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: { duration: 2000 },
      dismissable: { click: true },
    }
  ),
  danger: (title, message) => (
    {
      title,
      message,
      type: 'danger',
      insert: 'top',
      container: 'bottom-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: { duration: 2000 },
      dismissable: { click: true },
    }
  ),
};
