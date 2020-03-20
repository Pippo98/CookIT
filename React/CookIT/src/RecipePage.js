

import React, { createContext, Component } from 'react';
import CardView from 'react-native-cardview'
import Icon from "react-native-vector-icons/FontAwesome"
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'

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

class RecipePage extends Component {
    constructor() {
        super()
        this.debug = ""
        this.ro = new RecipeOperation()
        this.state = {
            data: {
            },
            forceCallback: false,
            tableData: []
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

    componentDidMount() {
        console.log("NewMount " + this.ro.getQueueLen() + this.props.route.params.type)
        this.ro.setRecipeType(this.props.route.params.type)
        if (this.ro.getQueueLen() >= 1) {
            console.log("setting force to true")
            this.ro.fillFuture(this, this.cllbck, true)
        } else {
            this.ro.fillFuture(this, this.cllbck, this.state.forceCallback)
        }
        this.ro.preloadImages()
    }

    render() {
        return (
            <>
                <Animated.View style={styles.screen}>
                    <ScrollView>

                        {/*--------------------------------------------------------------------------------*/}

                        <CardView style={styles.card}
                            cardElevation={4}
                            cardMaxElevation={4}
                            cornerRadius={8}
                            attrs={graphicsAttributes.imageContainer}
                            onTouchEnd={() => {
                                const data = this.ro.getNextRecipe()
                                this.ro.preloadImages()
                                if (data) {
                                    this.setState({ data })
                                }
                                this.setIngredients()
                            }}>
                            <Image
                                source={{ uri: this.state.data ? this.state.data.image : "" }}
                                style={styles.image}
                                resizeMode="contain"
                                fadeDuration={200} />
                            <Text style={styles.title1}>
                                {this.state.data ? this.state.data.name : ""}
                            </Text>
                        </CardView>


                        {/*--------------------------------------------------------------------------------*/}


                        <CardView style={styles.card}
                            cardElevation={4}
                            cardMaxElevation={4}
                            cornerRadius={8}
                            attrs={graphicsAttributes.imageContainer}>

                            <Divider borderColor={colors.cardBackground} textStyle={styles.divider} orientation="center" padding={10}>Porzioni</Divider>

                            <Text style={styles.title2}>
                                {this.state.data.recipeYield ? this.state.data.recipeYield.toString() : ""}
                            </Text>

                            <Divider borderColor={colors.cardBackground} textStyle={styles.divider} orientation="center" padding={10}>Tempo</Divider>

                            <Text style={styles.title2}>
                                {this.state.data.prepTime ? (this.state.data.prepTime + this.state.data.cookTime).toString() + " Minuti" : ""}
                            </Text>

                        </CardView>


                        {/*--------------------------------------------------------------------------------*/}

                        <CardView style={styles.card}
                            cardElevation={16}
                            cardMaxElevation={16}
                            cornerRadius={8}>
                            <Divider borderColor={colors.cardBackground} textStyle={styles.divider} orientation="center" padding={10}>Ingredienti</Divider>

                            <Table style={{ margin: 8 }} borderStyle={{ borderWidth: 1, borderColor: colors.cardBackground }}>
                                <Rows data={this.state.tableData} flexArr={[4, 1, 1]} textStyle={styles.ingredients} />
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
                                {this.state.data.recipeInstructions ? this.state.data.recipeInstructions : ""}
                            </Text>
                        </CardView>

                        {/*--------------------------------------------------------------------------------*/}
                        <View style={{ marginVertical: 8 }}></View>
                    </ScrollView>
                </Animated.View>

                <View style={styles.floatingView}>
                    <Icon name="thumbs-up" size={30} style={styles.likeIcon} onPress={() => {
                        this.ro.rateRec(5)
                    }} />
                    <Icon name="thumbs-down" style={styles.likeIcon} size={30} onPress={() => {
                        this.ro.rateRec(-5)
                    }} />

                    <TouchableOpacity style={styles.floatingBtn} onPress={() => {
                        const data = this.ro.getPreviousRecipe()
                        if (data != null) {
                            this.setState({ data })
                        }
                    }}>
                        <Icon name="arrow-left" size={30} style={styles.floatingIcon} />
                    </TouchableOpacity>


                </View>
            </>
        )
    }
}

export default RecipePage