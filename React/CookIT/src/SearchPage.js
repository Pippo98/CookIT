

import React, { createContext, Component } from 'react';
import CardView from 'react-native-cardview'
import Icon from "react-native-vector-icons/FontAwesome"
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'

import { styles } from "./Res/Theme"
import { RecipeOperation } from "./RecipeOperation"
import RecyclerItem from './Components/recyclerItem'
import Divider from './Components/Divider'
import { colors } from './Res/Colors'
import RecipePage from './RecipePage'
import SearchPageBase from './SearchPageBase'

var ro = new RecipeOperation()

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Button,
    StatusBar,
    Linking,
    Image,
    SectionList,
    Vibration,
    Animated,
    Picker,
    TouchableOpacity,
    TextInput,
    ColorPropType,
    FlatList,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Card } from 'react-native-paper';

import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

class SearchPage extends Component {
    constructor() {
        super()
        this.state = {}
    }

    componentDidMount() {
    }

    render() {

        return (
            <>
                <NavigationContainer style={styles.screen}>
                    <Stack.Navigator initialRouteName="mainPage">
                        <Stack.Screen name="mainPage" initialParams={{ mainClass: this }} options={{ headerShown: false }} component={SearchPageBase} />
                        <Stack.Screen name="recipePage" component={RecipePage} options={{ headerTintColor: "#fff", headerStyle: { backgroundColor: this.props.route.color } }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </>
        )
    }
}

export default SearchPage