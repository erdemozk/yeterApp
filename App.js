import React from 'react';
import {NotifierWrapper} from 'react-native-notifier';
import {StatusBar, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {Home} from './src/screens';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NotifierWrapper>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Home />
      </NotifierWrapper>
    </GestureHandlerRootView>
  );
};

export default App;
