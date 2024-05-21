import { Notifier, NotifierComponents } from 'react-native-notifier';

const notifyError = (title = 'An error occurred', description) =>
  Notifier.showNotification({
    title: title,
    description: description || null,
    Component: NotifierComponents.Alert,
    componentProps: {
      alertType: 'error',
    },
  });

const notifySuccess = (title = 'Success', description) =>
  Notifier.showNotification({
    title: title,
    description: description || null,
    Component: NotifierComponents.Alert,
    componentProps: {
      alertType: 'success',
    },
  });

const notifyInfo = (title = 'Information', description) =>
  Notifier.showNotification({
    title: title,
    description: description || null,
    Component: NotifierComponents.Alert,
    componentProps: {
      alertType: 'info',
    },
  });

export { notifyError, notifySuccess, notifyInfo };
