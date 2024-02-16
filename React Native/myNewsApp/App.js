import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux'; 
import { configureStore } from '@reduxjs/toolkit';
import reducers from './src/redux';
import Splash from './src/screens/Splash';
import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Policy from './src/screens/Policy';
import Promotion from './src/screens/Promotion';
import RegisterFinalStep from './src/screens/RegisterFinalStep';
import TabsNavigator from './src/screens/TabsNavigator';
import Settings from './src/screens/Settings';
import PersonalSettings from './src/screens/PersonalSettings';
import Complaints from './src/screens/Complaints';
import ChangeUsername from './src/screens/ChangeUsername';
import ChangeEmail from './src/screens/ChangeEmail';
import ChangePassword from './src/screens/ChangePassword';
import ChangeLanguage from './src/screens/ChangeLanguage';
import ChangeAbout from './src/screens/ChangeAbout';
import ChangeCategory from './src/screens/ChangeCategory';
import Comments from './src/screens/Comments';
import Saves from './src/screens/Saves';
import UserProfile from './src/screens/UserProfile';

const App = () => {
  const Stack = createNativeStackNavigator();
  const Store = configureStore({ reducer: reducers });

  return (
    <Provider store={Store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Splash">
            <Stack.Screen
              name="TabsNavigator"
              component={TabsNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Policy" component={Policy} />
            <Stack.Screen name="Promotion" component={Promotion} />
            <Stack.Screen name="RegisterFinalStep" component={RegisterFinalStep} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="PersonalSettings" component={PersonalSettings} />
            <Stack.Screen name="Complaints" component={Complaints} />
            <Stack.Screen name="ChangeUsername" component={ChangeUsername} />
            <Stack.Screen name="ChangeEmail" component={ChangeEmail} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} />
            <Stack.Screen name="ChangeAbout" component={ChangeAbout} />
            <Stack.Screen name="ChangeCategory" component={ChangeCategory} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="Comments" component={Comments} />
            <Stack.Screen name="Saves" component={Saves} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
