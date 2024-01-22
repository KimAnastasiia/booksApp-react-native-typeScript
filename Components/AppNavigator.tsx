/* eslint-disable prettier/prettier */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigatorScreenComponent from './MainNavigatorScreenComponent';
import EditBookScreenComponent from './EditBookScreenComponent';
import BookDetailsScreenComponent from './BookDetailsScreenComponent';
import LoginComponent from './LoginComponent';

export type RootStackParamList = {
  EditBook: undefined;
    MainNavigator:undefined
    EdiitBook:undefined
    AllBooks:undefined
    DetailsBook:undefined
    Login:undefined
};


const Stack = createNativeStackNavigator<RootStackParamList>();


const AppNavigator: React.FC = () => {
  return (
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false, }}>
        <Stack.Screen name='Login' component={LoginComponent} />
        <Stack.Screen name='MainNavigator' component={MainNavigatorScreenComponent} />
        <Stack.Screen  options={{ headerShown: true }} name='DetailsBook' component={BookDetailsScreenComponent} />
        <Stack.Screen  options={{ headerShown: true }} name='EditBook' component={EditBookScreenComponent} />
      </Stack.Navigator>
  );
};

export default AppNavigator;