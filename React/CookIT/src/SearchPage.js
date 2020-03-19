

import React, { createContext, Component } from 'react';
import CardView from 'react-native-cardview'

import { styles } from "./Res/Theme"
import { RecipeOperation } from "./RecipeOperation"
import RecyclerItem from './Components/recyclerItem'
import Page from './HomePage'

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

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

class SearchPage extends Component {
    constructor() {
        super()
        this.state = {
            firstFocus: true,
            searchText: "Inserisci Ricetta",
            recipes: [],
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <>
                <CardView style={styles.card}>
                    <TextInput style={styles.searchTextInput}
                        defaultValue={this.state.searchText}
                        onFocus={() => {
                            if (this.state.firstFocus) {
                                this.setState({ firstFocus: false, searchText: "" })
                            }
                        }}
                        onSubmitEditing={async (obj) => {
                            var route = "recipe/byName"
                            var params = {
                                name: obj.nativeEvent.text,
                                shrink: "true",
                            }
                            var ret = await ro.apiReqParam(route, params)
                            if (ret.length > 20) {
                                ret = ret.slice(0, 20)
                            }
                            this.setState({ recipes: ret })
                            console.log(this.props.navigation)
                        }}
                        clearButtonMode='always'>
                    </TextInput>

                    <FlatList
                        data={this.state.recipes}
                        renderItem={(item) => <RecyclerItem navigation={this.props.navigation} recipe={item.item} />}
                        keyExtractor={item => item.name}
                        onEndReached={() => { }}
                    />


                </CardView>
            </>
        )
    }
}

export default SearchPage