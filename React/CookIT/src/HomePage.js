import React, { createContext, Component } from 'react';
import CardView from 'react-native-cardview'
import Icon from "react-native-vector-icons/FontAwesome"
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'

// Custom
import { styles } from "./Res/Theme"
import { RecipeOperation } from "./RecipeOperation"
import { colors } from './Res/Colors'
import Divider from './Components/Divider'
import RecipePage from './RecipePage'

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

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
    ColorPropType,
    FlatList,
    SplashScreen,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

class HomePage extends Component {
    constructor() {
        super()
        this.state = {
            data: {
            },
            itemList: [
                "Primi",
                "Secondi",
                "Contorni",
                "Dolci",
                "Antipasti"
            ],
            itemIndex: 0,
            item: "",
            tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
            tableData: [
                ['1', '2', '3', '4'],
                ['a', 'b', 'c', 'd'],
                ['1', '2', '3', '4'],
                ['a', 'b', 'c', 'd']
            ]
        }
    }

    componentDidMount() {
    }

    onTouch(item) {
        this.setState({ item: item })
    }

    Home({ navigation }) {
        // console.log(params.route.params)
        var itemList = [
            "Primi",
            "Secondi",
            "Contorni",
            "Dolci",
            "Antipasti"
        ]
        return (
            <>
                <View style={{ margin: 8, padding: 8 }}>
                    <FlatList
                        data={itemList}
                        renderItem={(item) =>
                            <>
                                <CardView
                                    style={{
                                        marginHorizontal: 16,
                                        marginVertical: 8,
                                        backgroundColor: colors.pallette2.c1,
                                        shadowColor: colors.pallette2.c1,
                                        padding: 8,
                                        paddingVertical: 16
                                    }}
                                    cardElevation={16}
                                    cardMaxElevation={16}
                                    cornerRadius={8}
                                    onTouchEnd={() => {
                                        navigation.navigate('Recipe', {
                                            type: item.item
                                        })
                                    }}
                                >
                                    <Text style={styles.paragraph1}>{item.item}</Text>
                                </CardView>
                            </>
                        }
                    />
                </View>
            </>
        )
    }

    render() {
        var state = this.state
        return (
            <>
                <NavigationContainer >
                    <Stack.Navigator headerMode="none" initialRouteName="Home">
                        <Stack.Screen name="Home" initialParams={this}>
                            {this.Home}
                        </Stack.Screen>
                        <Stack.Screen name="Recipe" component={RecipePage} />
                    </Stack.Navigator>
                </NavigationContainer>
            </>
        )
        {
            //{"_reactInternalFiber": {"_debugHookTypes": null, "_debugID": 20163, "_debugIsCurrentlyTiming": false, "_debugNeedsRemount": false, "_debugOwner": null, "_debugSource": null, "actualDuration": 4, "actualStartTime": 1584729223638, "alternate": null, "child": {"_debugHookTypes": [Array], "_debugID": 20165, "_debugIsCurrentlyTiming": false, "_debugNeedsRemount": false, "_debugOwner": [Circular], "_debugSource": [Object], "actualDuration": 2, "actualStartTime": 1584729223642, "alternate": null, "child": [FiberNode], "childExpirationTime": 0, "dependencies": null, "effectTag": 517, "elementType": [Object], "expirationTime": 0, "firstEffect": null, "index": 0, "key": null, "lastEffect": null, "memoizedProps": [Object], "memoizedState": [Object], "mode": 8, "nextEffect": null, "pendingProps": [Object], "ref": null, "return": [Circular], "selfBaseDuration": 2, "sibling": null, "stateNode": null, "tag": 11, "treeBaseDuration": 0, "type": [Object], "updateQueue": [Object]}, "childExpirationTime": 0, "dependencies": null, "effectTag": 7, "elementType": [Function HomePage], "expirationTime": 0, "firstEffect": null, "index": 0, "key": null, "lastEffect": null, "memoizedProps": {"jumpTo": [Function anonymous], "route": [Object]}, "memoizedState": {"data": [Object], "item": "", "itemIndex": 0, "itemList": [Array], "tableData": [Array], "tableHead": [Array]}, "mode": 8, "nextEffect": null, "pendingProps": {"jumpTo": [Function anonymous], "route": [Object]}, "ref": null, "return": {"_debugHookTypes": null, "_debugID": 16381, "_debugIsCurrentlyTiming": false, "_debugNeedsRemount": false, "_debugOwner": [FiberNode], "_debugSource": [Object], "actualDuration": 0, "actualStartTime": 1584729223638, "alternate": [FiberNode], "child": [Circular], "childExpirationTime": 1073741823, "dependencies": null, "effectTag": 0, "elementType": [Function SceneComponent], "expirationTime": 0, "firstEffect": [FiberNode], "index": 0, "key": "home", "lastEffect": [FiberNode], "memoizedProps": [Object], "memoizedState": null, "mode": 8, "nextEffect": null, "pendingProps": [Object], "ref": null, "return": [FiberNode], "selfBaseDuration": 1, "sibling": null, "stateNode": [SceneComponent], "tag": 1, "treeBaseDuration": 92, "type": [Function SceneComponent], "updateQueue": null}, "selfBaseDuration": 4, "sibling": null, "stateNode": {"_reactInternalFiber": [Circular], "_reactInternalInstance": [Object], "context": [Object], "props": [Object], "refs": [Object], "state": [Object], "updater": [Object]}, "tag": 1, "treeBaseDuration": 0, "type": [Function HomePage], "updateQueue": null}, "_reactInternalInstance": {}, "context": {}, "props": {"jumpTo": [Function anonymous], "route": {"color": "#1eb2a6", "icon": "shuffle", "key": "home", "title": "Home"}}, "refs": {}, "state": {"data": {}, "item": "", "itemIndex": 0, "itemList": ["Primi", "Secondi", "Contorni", "Dolci", "Antipasti"], "tableData": [[Array], [Array], [Array], [Array]], "tableHead": ["Head", "Head2", "Head3", "Head4"]}, "updater": {"enqueueForceUpdate": [Function enqueueForceUpdate], "enqueueReplaceState": [Function enqueueReplaceState], "enqueueSetState": [Function enqueueSetState], "isMounted": [Function isMounted]}}
        }
    }
}


export default HomePage