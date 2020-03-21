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
    ImageBackground,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

class HomePage extends Component {
    constructor() {
        super()
        this.state = {
            data: {
            },
            itemList: [
                ["", "Primi"],
                ["", "Secondi"],
                ["", "Contorni"],
                ["", "Dolci"],
                ["", "Antipasti"],
            ],
            itemIndex: 0,
            item: "Primi",
            headerMode: "none",
        }
    }

    componentDidMount() {
    }

    Home({ route, navigation }) {

        var itemList = [
            ["Random"],
            ["Primi", "Secondi"],
            ["Dolci", "Contorni"],
            ["Piatti Unici", "Antipasti"],
        ]

        const element = (cellData, cellIndex) => (
            <TouchableOpacity
                style={{
                    backgroundColor: colors.homePage[cellIndex[0]][cellIndex[1]],
                    shadowColor: colors.pallette2.c1,
                    margin: 8,
                    padding: 4,
                    borderRadius: 16,
                    height: 170,
                    justifyContent: "center",
                }}
                onPress={() => {
                    route.params.mainClass.setState({ item: cellData })
                    navigation.navigate('Recipe', {
                        type: cellData,
                        mainClass: route.params.mainClass
                    })
                }}
            >
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                }}>
                    <Image
                        style={{
                            flex: 1,
                            resizeMode: "contain",
                            opacity: 0.0,
                        }}
                        source={{ uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" }}
                    />
                </View>
                <Text style={{
                    fontSize: 54,
                    fontWeight: '600',
                    color: "white",
                    textAlign: "center",
                    textAlignVertical: "top"
                }}>{cellData}</Text>
            </TouchableOpacity>
        )

        return (
            <>
                <View style={{ padding: 8 }}>
                    <Table borderStyle={{ borderColor: 'transparent' }}>
                        {
                            itemList.map((rowData, index) => (
                                <TableWrapper key={index} style={{ flexDirection: 'row' }}>
                                    {
                                        rowData.map((cellData, cellIndex) => (
                                            < Cell key={cellIndex} data={element(cellData, [index, cellIndex])} textStyle={styles.text} />
                                        ))
                                    }
                                </TableWrapper>
                            ))
                        }
                    </Table>
                </View>
            </>
        )
    }

    render() {
        return (
            <>
                <NavigationContainer style={styles.screen}>
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen name="Home" initialParams={{ mainClass: this }} options={{ headerShown: false }} >
                            {this.Home}
                        </Stack.Screen>
                        <Stack.Screen name="Recipe" component={RecipePage} options={{ title: this.state.item }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </>
        )
    }
}


export default HomePage