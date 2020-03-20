// UI Kitten

import React, { createContext, Component } from 'react';

import { BottomNavigation, Text } from 'react-native-paper';

import HomePage from './HomePage'
import RecipePage from './RecipePage'
import SearchPage from './SearchPage'
import IngredientPage from './IngredientPage'

import { colors } from './Res/Colors';

import { StatusBar } from 'react-native'
import { styles } from './Res/Theme';

export default class app extends Component {

  state = {
    index: 0,
    routes: [
      { key: 'home', title: 'Home', icon: 'shuffle', color: colors.pallette2.c1 },
      { key: 'search', title: 'Search', icon: 'magnify', color: colors.pallette2.c3 },
      { key: 'ingredient', title: 'Ingredient', icon: 'magnify', color: colors.pallette2.c4 },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    home: HomePage,
    search: SearchPage,
    ingredient: IngredientPage,
  });

  render() {
    return (
      <>
        <StatusBar backgroundColor={this.state.routes[this.state.index].color}></StatusBar>
        <BottomNavigation
          navigationState={this.state}
          onIndexChange={this._handleIndexChange}
          renderScene={this._renderScene}
          shifting={true}
        />
      </>
    );
  }
}