import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CallScreen from '../screens/CallScreen';
import ContactScreen from '../screens/ContactScreen';
import CallingScreen from '../screens/CallingScreen';
import IncomingCallScreen from '../screens/IncomingCallScreen';
import LoginScreen from '../screens/LoginScreen';
const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="ContactScreen" component={ContactScreen} />
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="CallScreen" component={CallScreen} />
          <Stack.Screen name="CallingScreen" component={CallingScreen} />
          <Stack.Screen
            name="IncomingCallScreen"
            component={IncomingCallScreen}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
