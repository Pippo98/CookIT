import {
    StyleSheet
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: "column",
        marginRight: 0,
        marginLeft: 0,
        marginTop: 8,
        marginBottom: 8,
        backgroundColor: Colors.lighter
    },
    imageContainer: {
        flex: 1,
        flexDirection: "column"
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
        marginTop: 16
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
        fontSize: 24,
        fontWeight: '600',
        color: Colors.grey,
        textAlign: "center"
    }
})