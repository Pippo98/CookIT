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
    statBar: {
        color: colors.pallette3.c3
    },
    screen: {
        flex: 1,
        flexDirection: "column",
        marginTop: 8,
        marginHorizontal: 8,
    },
    card: {
        flex: 1,
        marginHorizontal: 8,
        marginVertical: 8,
        backgroundColor: colors.cardBackground,
        shadowColor: colors.pallette3.c1,
        padding: 8,
        borderRadius: 8,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 3, // Android
    },
    recipeImage: {
        height: 270,
        width: null,
        borderRadius: 4,
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
    title: {
        fontSize: 40,
        fontWeight: '900',
        color: colors.pallette3.c3,
        textAlign: "center",
        marginHorizontal: 8,
        margin: 8
    },
    portions: {
        fontSize: 32,
        fontWeight: '600',
        color: Colors.black,
        textAlign: "center",
        marginHorizontal: 8,
        marginVertical: 4,
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
    resultsText: {
        fontSize: 15,
        fontWeight: '600',
        color: "grey",
        textAlign: "center",
        opacity: 0.8
    },
    picker: {
        color: colors.pallette3.c1,
    },
    pickerItem: {
        textAlign: "center",
        fontSize: 50,
        backgroundColor: colors.pallette3.c1,
    },
    divider: {
        fontSize: 36,
        fontWeight: '900',
        color: colors.pallette3.c3,
        textAlign: "center"
    },
    floatingBtn: {
        backgroundColor: colors.pallette3.c1,
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.9,
        width: 60,
        height: 60,
        borderRadius: 60
    },
    floatingIcon: {
        color: colors.pallette3.c3,
        margin: 0,
    },
    likeIcon: {
        opacity: 0.9,
        marginBottom: 4,
        color: colors.pallette3.c3
    },
    floatingView: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 16,
        right: 16,
        flex: 1,
    },
    searchTextInput: {
        borderRadius: 8,
        borderWidth: 2,
        borderColor: colors.pallette3.c1,
        margin: 8,
        padding: 8,
    },
    searchListItem: {
        flex: 1,
        marginHorizontal: 8,
        marginVertical: 8,
        backgroundColor: colors.cardBackground,
        padding: 8,
        borderRadius: 8,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 6, // Android
    },
    searchListImage: {
        height: 80,
        flex: 2,
        borderRadius: 8,
    },
    homeCard: {
        backgroundColor: "black",
        shadowColor: colors.pallette3.c1,
        margin: 8,
        padding: 4,
        borderRadius: 16,
        height: 170,
        justifyContent: "center",
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 6, // Android
    },
    backgroundIcon: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        resizeMode: "contain",
        opacity: 0.04
    },
    ingredientItemCard: {
        flexDirection: "row",
        marginHorizontal: 8,
        marginVertical: 8,
        backgroundColor: colors.cardBackground,
        shadowColor: colors.pallette3.c1,
        padding: 8,
        borderRadius: 8,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 6, // Android
    },
    m_8: {
      margin: 8
    }
})
