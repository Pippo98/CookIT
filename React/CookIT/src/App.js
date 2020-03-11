// UI Kitten

import React, { createContext, Component } from 'react';
import RNFetchBlob from 'react-native-fetch-blob'
import { styles } from "./Theme"
import { FloatingAction } from 'react-native-floating-action'
import CardView from 'react-native-cardview'
import Icon from "react-native-vector-icons/FontAwesome5"

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
      item: ""
    }
  }

  cllbck(mainClass, ret) {
    const data = ret
    mainClass.setState({ data })
  }

  componentDidMount() {
    ro.setRecipeType(this.state.itemList[this.state.itemIndex])
    ro.fillFuture(this, this.cllbck)
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor={colors.pallette2.c4} />
        <View style={styles.screen}>
          <Picker
            style={styles.picker}
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
            <CardView style={styles.imageContainer}
              cardElevation={4}
              cardMaxElevation={4}
              cornerRadius={8}
              attrs={graphicsAttributes.imageContainer} onTouchStart={() => {
                const data = ro.getNextRecipe()
                if (data) {
                  this.setState({ data })
                }
              }}>
              <Image
                source={{ uri: this.state.data ? this.state.data.image : "" }}
                style={styles.image}
                resizeMode="contain" />
              <Text style={styles.title1}>
                {this.state.data ? this.state.data.name : ""}
              </Text>
            </CardView>

            <CardView style={styles.card}
              cardElevation={4}
              cardMaxElevation={4}
              cornerRadius={8}
              attrs={graphicsAttributes.imageContainer}>

              <View style={{ marginTop: 8, marginBottom: 8 }} />
              <Divider borderColor={colors.cardBackground} textStyle={styles.divider} orientation="center" padding={10}>Porzioni</Divider>

              <Text style={styles.title2}>
                {this.state.data.recipeYield ? this.state.data.recipeYield.toString() : ""}
              </Text>

              <View style={{ marginTop: 8, marginBottom: 8 }} />
              <Divider borderColor={colors.cardBackground} textStyle={styles.divider} orientation="center" padding={10}>Tempo</Divider>

              <Text style={styles.title2}>
                {this.state.data.prepTime ? (this.state.data.prepTime + this.state.data.cookTime).toString() + " Minuti" : ""}
              </Text>

              <View style={{ marginTop: 8, marginBottom: 8 }} />

            </CardView>
            <CardView style={styles.card}
              cardElevation={4}
              cardMaxElevation={4}
              cornerRadius={8}
              attrs={graphicsAttributes.imageContainer}>
              <Divider borderColor={colors.cardBackground} textStyle={styles.divider} orientation="center" padding={10}>Instructions</Divider>
              <View style={{ marginTop: 8, marginBottom: 8 }} />
              <Text
                style={styles.paragraph1}>
                {this.state.data.recipeInstructions ? this.state.data.recipeInstructions : ""}
              </Text>
            </CardView>
          </ScrollView>
        </View>
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