// UI Kitten


import React, { createContext, Component } from 'react';
import RNFetchBlob from 'react-native-fetch-blob'
import { styles } from "./Styles"

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
  Picker
} from 'react-native';

import Divider from 'react-native-divider';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class app extends Component {

  async apiReq() {
    this.debug = "njcdfskjnm"
    var ret = await RNFetchBlob.config({
      trusty: true
    }).fetch('GET', 'https://cookit-server.herokuapp.com/randomRecipe' + this.state.recipeOption)

    ret = await JSON.parse(ret.data)
    const data = ret
    this.setState({ data })
    //Vibration.vibrate(40)
  }

  constructor() {
    super()
    this.debug = ""
    this.state = {
      data: {
      },
      recipeOption: "",
      itemList: [
        "Primi",
        "Secondi",
        "Contorni",
        "Dolci",
        "Antipasti"
      ],
      selectedItem: 1,
    }
  }

  componentDidMount() {
    this.apiReq()
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <View style={styles.screen}>
          <ScrollView>
            <Picker
              selectedValue={this.state.recipeOption}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ recipeOption: itemValue })
              }>
              {this.state.itemList.map((value, i) => (
                <Picker.Item label={value} value={"/" + value} />
              ))}
            </Picker>

            <View style={styles.imageContainer} onTouchStart={() => { this.apiReq() }}>
              <Image
                source={{ uri: this.state.data ? this.state.data.image : "" }}
                style={styles.image}
                resizeMode="contain" />
            </View>
            <Text style={styles.title1}>
              {this.state.data ? this.state.data.name : ""}
            </Text>

            <View style={{ marginTop: 8, marginBottom: 8 }} />
            <Divider borderColor="#000" textStyle={styles.divider} orientation="center" padding={10}>Porzioni</Divider>

            <Text style={styles.title2}>
              {this.state.data.name ? this.state.data.recipeYield.toString() : ""}
            </Text>

            <View style={{ marginTop: 8, marginBottom: 8 }} />
            <Divider borderColor="#000" textStyle={styles.divider} orientation="center" padding={10}>Tempo</Divider>

            <Text style={styles.title2}>
              {this.state.data.name ? (this.state.data.prepTime + this.state.data.cookTime).toString() + " Minuti" : ""}
            </Text>

            <View style={{ marginTop: 8, marginBottom: 8 }} />
            <Divider borderColor="#000" textStyle={styles.divider} orientation="center" padding={10}>Instructions</Divider>
            <View style={{ marginTop: 8, marginBottom: 8 }} />
            <Text
              style={styles.paragraph1}>
              {this.state.data ? this.state.data.recipeInstructions : ""}
            </Text>
          </ScrollView>
        </View>
      </>
    );
  }
}