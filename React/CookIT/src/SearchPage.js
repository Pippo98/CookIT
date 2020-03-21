

import React, { createContext, Component } from 'react';
import CardView from 'react-native-cardview'
import Icon from "react-native-vector-icons/FontAwesome"
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'

import { styles } from "./Res/Theme"
import { RecipeOperation } from "./RecipeOperation"
import RecyclerItem from './Components/recyclerItem'
import Page from './RecipePage'
import Divider from './Components/Divider'
import { colors } from './Res/Colors'

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
        this.state = {
            firstFocus: true,
            searchText: "Inserisci Ricetta",
            recipes: [],
            selectedRecipe: {},
            recipeIsSelected: false,
            tableData: [],
        }
    }

    componentDidMount() {
    }

    setIngredients() {
        var tableData = []
        this.state.selectedRecipe.recipeIngredient.forEach(el => {
            tableData.push([el.type, el.quantity, el.unit])
        });
        this.setState({ tableData })
    }

    drawMainPage({ route, navigation }) {
        var recipes = []

        return (
            <>
                <CardView style={styles.card}
                    cardElevation={4}
                    cardMaxElevation={4}
                    cornerRadius={8}>
                    <TextInput style={styles.searchTextInput}
                        defaultValue={route.params.mainClass.state.searchText}
                        onFocus={() => {
                            if (route.params.mainClass.state.firstFocus) {
                                route.params.mainClass.setState({ firstFocus: false, searchText: "" })
                            }
                            console.log(route.params.mainClass.state)
                        }}
                        onSubmitEditing={async (obj) => {

                            var text = obj.nativeEvent.text
                            var url_route = "recipe/byName"
                            var url_params = {
                                name: text,
                                shrink: "true",
                                perfectMatch: "false"
                            }
                            var ret = await ro.apiReqParam(url_route, url_params)
                            if (ret.length > 20) {
                                ret = ret.slice(0, 20)
                            }
                            route.params.mainClass.setState({ recipes: ret, searchText: text, refresh: true })
                            recipes = ret
                        }}
                        clearButtonMode='always'>
                    </TextInput>

                    <FlatList
                        data={recipes}
                        renderItem={(item) =>
                            <>
                                <TouchableOpacity
                                    style={styles.card}
                                    cardElevation={4}
                                    cardMaxElevation={4}
                                    cornerRadius={8}
                                >
                                    <View
                                        onTouchEnd={async () => {
                                            route.params.mainClass.setState({ selectedRecipe: item.item, recipeIsSelected: true })
                                            var route = "recipe/byName"
                                            var params = {
                                                name: item.item.name,
                                                shrink: "false",
                                                perfectMatch: "true"
                                            }
                                            var ret = await ro.apiReqParam(route, params)
                                            console.log(ret)
                                            console.log(ret[0])
                                            if (ret.length > 0) {
                                                ret = ret[0]
                                                route.params.mainClass.setState({ selectedRecipe: ret, recipeIsSelected: true })
                                                navigation.navigate('recipePage', {
                                                    mainClass: route.params.mainClass
                                                })
                                            }
                                        }}
                                        style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                                        <Image
                                            source={{ uri: item.item.image }}
                                            style={{ height: 80, flex: 2 }}
                                            resizeMode="contain"
                                            fadeDuration={200} />
                                        <View
                                            style={{ flex: 3, flexDirection: "column", justifyContent: "flex-start" }}>
                                            <Text style={{ flex: 3 }}>
                                                {item.item.name}
                                            </Text>
                                            <Text style={{ flex: 3 }}>
                                                {item.item.prepTime} Minuti
                                        </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </>
                        }
                        keyExtractor={item => item.name}
                        onEndReached={() => { }}
                    />
                </CardView>
            </>
        )
    }

    drawRecipePage({ route, navigation }) {
        return (
            <>
                <Animated.View style={styles.screen}>
                    <ScrollView>

                        {/*--------------------------------------------------------------------------------*/}

                        <CardView style={styles.card}
                            cardElevation={4}
                            cardMaxElevation={4}
                            cornerRadius={8}>
                            <Image
                                source={{ uri: route.params.mainClass.state.selectedRecipe ? route.params.mainClass.state.selectedRecipe.image : "" }}
                                style={styles.image}
                                resizeMode="contain"
                                fadeDuration={200} />
                            <Text style={styles.title1}>
                                {route.params.mainClass.state.selectedRecipe ? route.params.mainClass.state.selectedRecipe.name : ""}
                            </Text>
                        </CardView>


                        {/*--------------------------------------------------------------------------------*/}


                        <CardView style={styles.card}
                            cardElevation={4}
                            cardMaxElevation={4}
                            cornerRadius={8}>

                            <Divider borderColor={colors.cardBackground} textStyle={styles.divider} orientation="center" padding={10}>Porzioni</Divider>

                            <Text style={styles.title2}>
                                {route.params.mainClass.state.selectedRecipe.recipeYield ? route.params.mainClass.state.selectedRecipe.recipeYield.toString() : ""}
                            </Text>

                            <Divider borderColor={colors.cardBackground} textStyle={styles.divider} orientation="center" padding={10}>Tempo</Divider>

                            <Text style={styles.title2}>
                                {route.params.mainClass.state.selectedRecipe.prepTime ? (route.params.mainClass.state.selectedRecipe.prepTime + route.params.mainClass.state.selectedRecipe.cookTime).toString() + " Minuti" : ""}
                            </Text>

                        </CardView>


                        {/*--------------------------------------------------------------------------------*/}

                        <CardView style={styles.card}
                            cardElevation={16}
                            cardMaxElevation={16}
                            cornerRadius={8}>
                            <Divider borderColor={colors.cardBackground} textStyle={styles.divider} orientation="center" padding={10}>Ingredienti</Divider>

                            <Table style={{ margin: 8 }} borderStyle={{ borderWidth: 1, borderColor: colors.cardBackground }}>
                                <Rows data={route.params.mainClass.state.tableData} flexArr={[4, 1, 1]} textStyle={styles.ingredients} />
                            </Table>

                        </CardView>

                        {/*--------------------------------------------------------------------------------*/}


                        <CardView style={styles.card}
                            cardElevation={16}
                            cardMaxElevation={16}
                            cornerRadius={8}>
                            <Divider borderColor={colors.cardBackground} textStyle={styles.divider} orientation="center" padding={10}>Istruzioni</Divider>
                            <Text
                                style={styles.paragraph1}>
                                {route.params.mainClass.state.selectedRecipe.recipeInstructions ? route.params.mainClass.state.selectedRecipe.recipeInstructions : ""}
                            </Text>
                        </CardView>

                        {/*--------------------------------------------------------------------------------*/}
                        <View style={{ marginVertical: 8 }}></View>
                    </ScrollView>
                </Animated.View>

                <View style={styles.floatingView}>

                    <TouchableOpacity style={styles.floatingBtn} onPress={() => {
                        route.params.mainClass.setState({ recipeIsSelected: false })
                    }}>
                        <Icon name="arrow-left" size={30} style={styles.floatingIcon} />
                    </TouchableOpacity>
                </View>
            </>
        )
    }


    render() {

        return (
            <>
                <NavigationContainer style={styles.screen}>
                    <Stack.Navigator initialRouteName="mainPage">
                        <Stack.Screen name="mainPage" initialParams={{ mainClass: this }} options={{ headerShown: false }} >
                            {this.drawMainPage}
                        </Stack.Screen>
                        <Stack.Screen name="recipePage" component={this.drawRecipePage} initialParams={{ mainClass: this }} options={{ title: this.state.selectedRecipe.name }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </>
        )
    }
}

export default SearchPage