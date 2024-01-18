/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert, Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigatorScreenComponent from './MainNavigatorScreenComponent';
import EditBookScreenComponent from './EditBookScreenComponent';
import BookDetailsScreenComponent from './BookDetailsScreenComponent';
import styles from '../Utility/styles';
export type RootStackParamList = {
  EditBook: undefined;
    MainNavigator:undefined
    EdiitBook:undefined
    AllBooks:undefined
    DetailsBook:undefined
};


const Stack = createNativeStackNavigator<RootStackParamList>();


const AppNavigator: React.FC = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false, }}>
        <Stack.Screen name='MainNavigator' component={MainNavigatorScreenComponent} />
        <Stack.Screen  options={{ headerShown: true }} name='DetailsBook' component={BookDetailsScreenComponent} />
        <Stack.Screen  options={{ headerShown: true }} name='EditBook' component={EditBookScreenComponent} />
      </Stack.Navigator>
  );
};

export default AppNavigator;