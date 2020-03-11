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
    imageContainer: {
        flex: 1,
        margin: 8,
        backgroundColor: colors.cardBackground
    },
    card: {
        flex: 1,
        margin: 8,
        backgroundColor: colors.cardBackground
    },
    image: {
        height: 270,
        margin: 8,
        width: null,
    },
    title1: {
        fontSize: 40,
        fontWeight: '600',
        color: Colors.black,
        textAlign: "center",
        marginBottom: 16
    },
    title2: {
        fontSize: 32,
        fontWeight: '600',
        color: Colors.black,
        textAlign: "center",
        marginTop: 8
    },
    paragraph1: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
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
        bottom: 10,
        right: 10,
        width: 70,
        height: 70,
        borderRadius: 100,
    },
    floatingIcon: {
        color: colors.pallette2.c3
    }
})