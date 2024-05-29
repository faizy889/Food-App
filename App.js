import * as React from 'react';
import * as Native from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import GetStartedScreen from './Screens/GetStartedScreen';
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';
import CartScreen from './Screens/CartScreen';
import GlobalContext from './Context/GlobalContext';
import ItemDetailScreen from './Screens/ItemDetailScreen';
import FeatureUnderDev from './Screens/FeatureUnderDev';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GlobalContext>
      <Native.StatusBar
        animated={true}
        backgroundColor='transparent'
        hidden={false}
        translucent={true}
        barStyle='dark-content'
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='GetStartedScreen'
          screenOptions={{
            animation: 'slide_from_right',
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen
            name="GetStartedScreen"
            component={GetStartedScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="FeatureUnderDev"
            component={FeatureUnderDev}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="CartScreen"
            component={CartScreen}
            options={{
              headerShown: false,
              animation: 'none'
            }}
          />
          <Stack.Screen
            name="ItemDetailScreen"
            component={ItemDetailScreen}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>

    </GlobalContext>

  );
}