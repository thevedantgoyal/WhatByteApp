import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import RootNavigator from './src/navigation';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
        <Toast />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
