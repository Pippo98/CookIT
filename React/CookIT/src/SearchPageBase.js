import React, { createContext, Component } from 'react';
import CardView from 'react-native-cardview'
import Snackbar from 'react-native-snackbar';
import Icon from "react-native-vector-icons/FontAwesome"

import { styles } from "./Res/Theme"
import { RecipeOperation } from "./RecipeOperation"
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

class SearchPageBase extends Component {
    constructor() {
        super()
        this.state = {
            firstFocus: true,
            searchText: "",
            recipes: [],
            selectedRecipe: {},
            recipeIsSelected: false,
            foundRecipes: false,
            searchMode: "nome",
            ingredientsList: []

        }
    }

    componentDidMount() {
        this.setState({ searchMode: this.props.route.params.searchMode })
    }

    render() {
        return (
            <>
                <CardView style={{ justifyContent: "center" }, styles.card}
                    cardElevation={4}
                    cardMaxElevation={4}
                    cornerRadius={8}>

                    <Text style={styles.title2}>{"Ricerca per " + this.state.searchMode}</Text>
                    <TextInput style={styles.searchTextInput}
                        defaultValue={this.state.searchText}
                        onFocus={() => {
                            if (this.state.firstFocus) {
                                this.setState({ firstFocus: false, searchText: "" })
                            }
                        }}
                        onSubmitEditing={async (obj) => {
                            var text = obj.nativeEvent.text
                            if (this.state.searchMode == "nome") {
                                var url_route = "recipe/byName"
                                var url_params = {
                                    name: text,
                                    shrink: "true",
                                    perfectMatch: "false"
                                }
                                var ret = await ro.apiReqParam(url_route, url_params)
                                var found = false
                                if (ret.length > 0) {
                                    found = true
                                } else {
                                    Snackbar.show({
                                        text: 'Oops... nessun risultato',
                                        duration: Snackbar.LENGTH_SHORT,
                                    })
                                }
                                this.setState({ recipes: ret, searchText: text, foundRecipes: found })
                            } else {
                                var list = this.state.ingredientsList
                                list.push(text)
                                this.setState({ ingredientsList: list })

                                var url_route = "recipe/byIngredient"
                                var ingredients = this.state.ingredientsList.join("#")
                                var url_params = {
                                    ingredient: ingredients,
                                    shrink: "true",
                                }
                                var ret = await ro.apiReqParam(url_route, url_params)
                                var found = false
                                if (ret.length > 0) {
                                    found = true
                                } else {
                                    Snackbar.show({
                                        text: 'Oops... nessun risultato',
                                        duration: Snackbar.LENGTH_SHORT,
                                    })
                                }
                                this.setState({ recipes: ret, searchText: text, foundRecipes: found })
                            }
                        }}>
                    </TextInput>

                    <Text style={styles.resultsText}>
                        {
                            (this.state.foundRecipes) ?
                                this.state.recipes.length == 1 ?
                                    ("trovata " + this.state.recipes.length + " ricetta")
                                    :
                                    ("trovate " + this.state.recipes.length + " ricette")
                                :
                                "nessun risultato"
                        }
                    </Text>

                    {this.state.searchMode == "ingredienti" &&
                        <FlatList
                            data={this.state.ingredientsList}
                            keyExtractor={item => item.name}
                            renderItem={(item) =>
                                <>
                                    <View style={styles.ingredientItemCard}>
                                        <Text style={{ flex: 1, margin: 0, textAlignVertical: "center" }} >{item.item}</Text>
                                        <TouchableOpacity onPress={() => {
                                            var list = this.state.ingredientsList
                                            const idx = list.indexOf(item.item)
                                            if (idx > -1) {
                                                list.splice(idx, 1)
                                            }
                                            this.setState({ ingredientsList: list })
                                        }}>
                                            <Icon name="close" style={{ flex: 1, color: "black", alignSelf: "flex-start" }} size={25} />
                                        </TouchableOpacity>
                                    </View>
                                </>
                            }>

                        </FlatList>
                    }

                    <FlatList
                        data={this.state.recipes}
                        renderItem={(item) =>
                            <>
                                <TouchableOpacity
                                    style={styles.searchListItem}
                                    cardElevation={4}
                                    cardMaxElevation={4}
                                    cornerRadius={8}
                                >
                                    <View
                                        onTouchEnd={async () => {
                                            this.setState({ selectedRecipe: item.item, recipeIsSelected: true })
                                            var route = "recipe/byName"
                                            var params = {
                                                name: item.item.name,
                                                shrink: "false",
                                                perfectMatch: "true"
                                            }
                                            var ret = await ro.apiReqParam(route, params)
                                            if (ret.length > 0) {
                                                ret = ret[0]
                                                this.setState({ selectedRecipe: ret, recipeIsSelected: true })
                                                this.props.navigation.navigate("recipePage", {
                                                    type: this.state.selectedRecipe.name,
                                                    isSpecificRecipe: true,
                                                    recipe: this.state.selectedRecipe
                                                })
                                            }
                                        }}
                                        style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                                        <Image
                                            source={{ uri: item.item.image }}
                                            style={styles.searchListImage}
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
}

export default SearchPageBase