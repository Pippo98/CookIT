import {
    StyleSheet

} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
} from 'react-native/Libraries/NewAppScreen';

import { colors } from "./Colors"

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: "column",
    },
    card: {
        flex: 1,
        marginHorizontal: 16,
        marginVertical: 8,
        backgroundColor: colors.cardBackground,
        shadowColor: colors.pallette2.c1,
        padding: 8
    },
    image: {
        height: 270,
        width: null,
    },
    title1: {
        fontSize: 40,
        fontWeight: '600',
        color: Colors.black,
        textAlign: "center",
        marginHorizontal: 8,
    },
    title2: {
        fontSize: 32,
        fontWeight: '600',
        color: Colors.black,
        textAlign: "center",
        marginHorizontal: 8,
        marginTop: 8
    },
    ingredients: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.black,
        textAlign: "left",
        margin: 4,
    },
    paragraph1: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
        marginHorizontal: 8,
        textAlign: "center"
    },
    link: {
        fontSize: 20,
        fontWeight: '600',
        color: "blue",
        textAlign: "center"
    },
    picker: {
        fontSize: 40,
        alignItems: "center",
        textAlign: "center"
    },
    pickerItem: {
        textAlign: "center"
    },
    divider: {
        fontSize: 36,
        fontWeight: '900',
        color: colors.pallette2.c3,
        textAlign: "center"
    },
    floatingBtn: {
        borderWidth: 3,
        borderColor: colors.pallette2.c3,
        backgroundColor: colors.pallette2.c1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        opacity: 0.9,
        bottom: 15,
        right: 15,
        width: 60,
        height: 60,
        borderRadius: 100
    },
    floatingIcon: {
        color: colors.pallette2.c3
    }
})