// UI Kitten

import React, { createContext, Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomePage from './HomePage'
import SearchPage from './SearchPage'

const Stack = createStackNavigator();

export default class app extends Component {

  render() {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="HomePage"
              component={HomePage}
              options={{ title: 'HomePage' }}
            />
            <Stack.Screen
              name="SearchPage"
              component={SearchPage}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}