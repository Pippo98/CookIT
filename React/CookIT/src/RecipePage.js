

import React, { createContext, Component } from 'react';
import Icon from "react-native-vector-icons/FontAwesome"
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'
import Snackbar from 'react-native-snackbar';

// Custom
import { styles } from "./Res/Theme"
import { RecipeOperation } from "./RecipeOperation"
import { graphicsAttributes } from "./Res/Attrs"
import { colors } from './Res/Colors'
import Divider from './Components/Divider'

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
    Item,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { FlatList } from 'react-native-gesture-handler';

class RecipePage extends Component {
    constructor() {
        super()
        this.debug = ""
        this.ro = new RecipeOperation()
        this.state = {
            data: {
            },
            forceCallback: false,
            tableData: [],
            isSpecificRecipe: false,
            portions: [2, 4, 6, 8],
        }
    }

    cllbck(mainClass, ret) {
        mainClass.setState({ data: ret, forceCallback: false })
        mainClass.setIngredients()
    }

    setIngredients() {
        var tableData = []
        this.state.data.recipeIngredient.forEach(el => {
            tableData.push([el.type, el.quantity, el.unit])
        })
        this.setState({ tableData })
    }

    setPortions() {

    }

    nextRecipe() {
        const data = this.ro.getNextRecipe()
        this.ro.preloadImages()
        if (data) {
            this.setState({ data })
        }
        this.setIngredients()
    }

    previousRecipe() {
        const data = this.ro.getPreviousRecipe()
        if (data != null) {
            this.setState({ data })
        } else {
            Snackbar.show({
                text: 'Nessuna ricetta precedente',
                duration: Snackbar.LENGTH_SHORT,
            })
        }
    }

    componentDidMount() {
        if (this.props.route.params.isSpecificRecipe) {
            //this.props.navigation.setOptions({ title: this.props.route.params.recipe.name })
            this.props.navigation.setOptions({ title: "" })
            this.state.data = this.props.route.params.recipe
            this.setState({
                data: this.props.route.params.recipe,
                isSpecificRecipe: this.props.route.params.isSpecificRecipe
            })
            this.setIngredients()
        }
        else {
            this.ro.setRecipeType(this.props.route.params.type)
            if (this.ro.getQueueLen() >= 1) {
                console.log("setting force to true")
                this.ro.fillFuture(this, this.cllbck, true)
            } else {
                this.ro.fillFuture(this, this.cllbck, this.state.forceCallback)
            }
            this.ro.preloadImages()
        }
    }

    render() {
        return (
            <>
                <ScrollView style={styles.screen}>

                    {/*---------------------------------------- IMAGE ----------------------------------------*/}

                    <View style={styles.card}
                        onTouchEnd={() => {
                            if (!this.state.isSpecificRecipe) {
                                this.nextRecipe()
                            }
                        }}>
                        <Image
                            source={{ uri: this.state.data ? this.state.data.image : "" }}
                            style={styles.recipeImage}
                            resizeMode="contain"
                            fadeDuration={200} />
                        <Text style={styles.title1}>
                            {this.state.data ? this.state.data.name : ""}
                        </Text>
                    </View>


                    {/*---------------------------------------- INFO ----------------------------------------*/}


                    <View style={styles.card}>

                        {this.state.data.recipeYield != "" &&
                            <View>
                                <Divider borderColor={colors.cardBackground} textStyle={styles.divider} orientation="center" padding={10}>Porzioni</Divider>
                                {
                                    true &&
                                    <View style={{ alignItems: "center" }} >
                                        <FlatList
                                            data={this.state.portions}
                                            horizontal={true}
                                            keyExtractor={item => item.name}
                                            renderItem={(item) =>
                                                <>
                                                    <View
                                                        style={{
                                                            borderRadius: 8,
                                                            margin: 4,
                                                            backgroundColor: colors.pallette2.c2,
                                                            borderRadius: 2,
                                                            borderColor: item.item.toFixed() == this.state.data.recipeYield ? colors.pallette2.c3 : colors.pallette2.c2,
                                                        }}
                                                    >
                                                        <Text style={styles.portions}>
                                                            {item.item}
                                                        </Text>
                                                    </View>
                                                </>
                                            }
                                        />
                                    </View>
                                }

                                < Text style={styles.title2}>
                                    {this.state.data.recipeYield ? this.state.data.recipeYield.toString() : ""}
                                </Text>
                            </View>}

                        <Divider borderColor={colors.cardBackground} textStyle={styles.divider} orientation="center" padding={10}>Tempo</Divider>

                        <Text style={styles.title2}>
                            {this.state.data.prepTime ? (this.state.data.prepTime + this.state.data.cookTime).toString() + " Minuti" : ""}
                        </Text>

                    </View>


                    {/*---------------------------------------- INGREDIENTS ----------------------------------------*/}

                    <View style={styles.card}>
                        <Divider borderColor={colors.cardBackground} textStyle={styles.divider} orientation="center" padding={10}>Ingredienti</Divider>

                        <Table style={{ margin: 8 }} borderStyle={{ borderWidth: 1, borderColor: colors.cardBackground }}>
                            <Rows data={this.state.tableData} flexArr={[4, 1, 1]} textStyle={styles.ingredients} />
                        </Table>

                    </View>

                    {/*---------------------------------------- INSTRUCTIONS ----------------------------------------*/}


                    <View style={styles.card}>
                        <Divider borderColor={colors.cardBackground} textStyle={styles.divider} orientation="center" padding={10}>Istruzioni</Divider>
                        <Text
                            style={styles.paragraph1}>
                            {this.state.data.recipeInstructions ? this.state.data.recipeInstructions.replace(/\./g, ".\n") : ""}
                        </Text>
                    </View>
                </ScrollView>
                {
                    !this.state.isSpecificRecipe &&
                    <View style={styles.floatingView}>
                        <Icon name="thumbs-up" size={30} style={styles.likeIcon} onPress={() => {
                            this.ro.rateRec(5)
                        }} />
                        <Icon name="thumbs-down" style={styles.likeIcon} size={30} onPress={() => {
                            this.ro.rateRec(-5)
                        }} />

                        <TouchableOpacity
                            style={styles.floatingBtn}
                            activeOpacity={0.5}
                            onPress={() => {
                                this.previousRecipe()
                            }}>
                            <Icon name="arrow-left" size={30} style={styles.floatingIcon} />
                        </TouchableOpacity>


                    </View>
                }
            </>
        )
    }
}

export default RecipePage