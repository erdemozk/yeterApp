import React, { useState, useEffect } from 'react';
import { useTheme } from '@hooks';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { Home, Welcome } from 'screens';
import { WELCOME_SHOWN_KEY } from '_constants';
import { NotifierWrapper } from 'react-native-notifier';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState('Welcome');
  const [initialLoading, setInitialLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const checkFirstOpen = async () => {
      try {
        const value = await AsyncStorage.getItem(WELCOME_SHOWN_KEY);
        if (value === 'true') {
          setInitialRoute('Home');
        }
      } catch (e) {}
      setInitialLoading(false);
    };
    checkFirstOpen();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NotifierWrapper>
        {initialLoading ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme ? '#161A1D' : '#fff',
            }}>
            <ActivityIndicator size="large" color={theme ? '#fff' : '#000'} />
          </View>
        ) : (
          <NavigationContainer>
            <StatusBar barStyle={theme ? 'light-content' : 'dark-content'} />
            <Stack.Navigator
              initialRouteName={initialRoute}
              screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </NotifierWrapper>
    </GestureHandlerRootView>
  );
};

export default App;
