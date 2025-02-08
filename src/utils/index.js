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

const writeToAsyncStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    notifyError(null, error);
  }
};

export { notifyError, notifySuccess, notifyInfo, writeToAsyncStorage };
