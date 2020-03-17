

import React, { createContext, Component } from 'react';
import { styles } from "./Res/Theme"
import CardView from 'react-native-cardview'
import Icon from "react-native-vector-icons/FontAwesome"
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'

var next = true

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
    ColorPropType
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

class SearchPage extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <>
                <Button
                    title="HomePage"
                    onPress={() =>
                        this.props.navigation.navigate('HomePage')
                    }
                />
            </>
        )
    }
}

export default SearchPage