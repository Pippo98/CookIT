

import React, { createContext, Component } from 'react';
import CardView from 'react-native-cardview'

import { styles } from "./../Res/Theme"

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
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Card } from 'react-native-paper';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function RecyclerItem({ navigation, recipe }) {
    return (<>
        <CardView
            style={styles.card}
            cardElevation={4}
            cardMaxElevation={4}
            cornerRadius={8}
        >
            <View
                onTouchEnd={() => {
                    console.log(navigation)
                    navigation.navigate("HomePage")
                    console.log(recipe.name)
                }}
                style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                <Image
                    source={{ uri: recipe.image }}
                    style={{ height: 80, flex: 2 }}
                    resizeMode="contain"
                    fadeDuration={200} />
                <View
                    style={{ flex: 3, flexDirection: "column", justifyContent: "flex-start" }}>
                    <Text style={{ flex: 3 }}>
                        {recipe.name}
                    </Text>
                    <Text style={{ flex: 3 }}>
                        {recipe.prepTime} Minuti
                    </Text>
                </View>
            </View>
        </CardView>
    </>)
}