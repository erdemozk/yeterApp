import React from 'react';
import { Home } from 'screens';
import { useTheme } from '@hooks';
import { StatusBar } from 'react-native';
import { NotifierWrapper } from 'react-native-notifier';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <NotifierWrapper>
      <StatusBar barStyle={useTheme() ? 'light-content' : 'dark-content'} />
      <Home />
    </NotifierWrapper>
  </GestureHandlerRootView>
);

export default App;
