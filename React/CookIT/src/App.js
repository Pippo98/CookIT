// UI Kitten

import React, { createContext, Component } from 'react';
import { styles } from "./Theme"
import CardView from 'react-native-cardview'
import Icon from "react-native-vector-icons/FontAwesome"
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'

// Custom
import { RecipeOperation } from "./RecipeOperation"
import { graphicsAttributes } from "./Attrs"
import { colors } from './Colors'
import Divider from './Components/Divider'


var ro = new RecipeOperation()

var next = true

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Linking,
  Image,
  SectionList,
  Vibration,
  Animated,
  Picker,
  TouchableOpacity,
  ColorPropType
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default class app extends Component {

  constructor() {
    super()
    this.debug = ""
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
      tableData: []
    }
  }

  cllbck(mainClass, ret) {
    const data = ret
    mainClass.setState({ data })
    mainClass.setIngredients()
  }

  setIngredients() {
    var tableData = []
    this.state.data.recipeIngredient.forEach(el => {
      tableData.push([el.type, el.quantity, el.unit])
    });
    this.setState({ tableData })
  }

  componentDidMount() {
    ro.setRecipeType(this.state.itemList[this.state.itemIndex])
    ro.fillFuture(this, this.cllbck)
    ro.preloadImages()
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor={colors.pallette2.c4} />
        <Animated.View style={styles.screen}>
          <Picker
            style={styles.picker}
            mode={"dialog"}
            selectedValue={this.state.itemList[this.state.itemIndex]}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({ itemIndex })
              ro.setRecipeType(itemValue)
              ro.reloadFuture()
            }}>
            {this.state.itemList.map((value, i) => (
              <Picker.Item key={i} label={value} value={value} />
            ))}
          </Picker>
          <ScrollView>

            {/*--------------------------------------------------------------------------------*/}

            <CardView style={styles.card}
              cardElevation={4}
              cardMaxElevation={4}
              cornerRadius={8}
              attrs={graphicsAttributes.imageContainer}
              onTouchEnd={
                () => {
                  const data = ro.getNextRecipe()
                  ro.preloadImages()
                  if (data) {
                    this.setState({ data })
                  }
                  this.setIngredients()
                }
              }>
              <Image
                source={{ uri: this.state.data ? this.state.data.image : "" }}
                style={styles.image}
                resizeMode="contain" />
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

        <TouchableOpacity style={styles.floatingBtn} onPress={() => {
          const data = ro.getPreviousRecipe()
          if (data != null) {
            this.setState({ data })
          }
        }}>
          <Icon name="arrow-left" size={30} style={styles.floatingIcon} />
        </TouchableOpacity>
      </>
    );
  }
}