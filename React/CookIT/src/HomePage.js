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
                ["Random", "Primi"],
                ["Secondi", "Dolci"],
                ["Lievitati", "Contorni"],
                ["Piatti Unici", "Antipasti"],
            ],
            imageList: [
                [require("./Res/Images/Home/Random.jpg"), require("./Res/Images/Home/Primi.jpg")],
                [require("./Res/Images/Home/Secondi.jpg"), require("./Res/Images/Home/Dolci.jpg")],
                [require("./Res/Images/Home/Lievitati.jpg"), require("./Res/Images/Home/Contorni.jpg")],
                [require("./Res/Images/Home/Piatti-Unici.jpg"), require("./Res/Images/Home/Antipasti.jpg")],
            ],
            itemIndex: 0,
            item: "Primi",
            headerMode: "none",
        }
    }

    componentDidMount() {
    }

    Home({ route, navigation }) {

        const element = (cellData, cellIndex) => {
            const backgorundImage = "./Res/Images/Home/" + cellData.replace(" ", "-") + ".jpg"
            console.log(backgorundImage)
            return (
                < TouchableOpacity
                    style={styles.homeCard}
                    onPress={() => {
                        route.params.mainClass.setState({ item: cellData })
                        navigation.navigate('Recipe', {
                            type: cellData != "Random" ? cellData : "",
                            mainClass: route.params.mainClass
                        })
                    }
                    }
                >
                    <View style={{
                        justifyContent: "center",
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        borderRadius: 16,
                    }}>
                        <Image
                            style={{
                                height: 170,
                                width: null,
                                resizeMode: "cover",
                                opacity: 0.7,
                                borderRadius: 16,
                            }}
                            source={route.params.mainClass.state.imageList[cellIndex[0]][cellIndex[1]]}
                        />
                    </View>
                    <Text style={{
                        fontSize: 54,
                        fontWeight: '600',
                        color: "white",
                        textAlign: "center",
                        textAlignVertical: "top",
                    }}>{cellData}</Text>
                </TouchableOpacity >
            )
        }

        return (
            <>
                <ScrollView style={{ paddingTop: 16, padding: 8, backgroundColor: colors.cardBackground }}>
                    <Table style={{ paddingVertical: 8 }} borderStyle={{ borderColor: 'transparent' }}>
                        {
                            route.params.mainClass.state.itemList.map((rowData, index) => (
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
                </ScrollView>
            </>
        )
    }

    render() {
        return (
            <>
                <NavigationContainer style={styles.screen}>
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen name="Home" component={this.Home} initialParams={{ mainClass: this }} options={{ headerShown: false }} />
                        <Stack.Screen name="Recipe" component={RecipePage} options={{ title: this.state.item, headerTintColor: "#fff", headerStyle: { backgroundColor: colors.pallette2.c1 } }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </>
        )
    }
}


export default HomePage