import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        height: 24,
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 6
    },
    line: {
        height: 24,
        borderBottomWidth: 1,
    },
    shortWidth: {
        width: 20
    },
    dashed: {
        borderStyle: 'dashed'
    },
    text: {
        paddingHorizontal: 24,
        fontSize: 16,
        fontWeight: '900'
    }
});

class Divider extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        dashed: PropTypes.bool,
        color: PropTypes.string,
        borderColor: PropTypes.string,
        orientation: PropTypes.oneOf(['left', 'center', 'right']),
        padding: PropTypes.number,
        textStyle: PropTypes.any
    };

    static defaultProps = {
        dashed: false,
        orientation: 'left',
        color: 'rgba(0,0,0,.85)',
        borderColor: '#e8e8e8',
        padding: 10,
        textStyle: styles.text
    };

    render() {
        const props = this.props;
        return (
            <View style={styles.container}>
                <View
                    style={[
                        styles.line,
                        {
                            marginRight: props.padding,
                            borderColor: props.borderColor,
                            transform: [{ translateY: -props.textStyle.fontSize / 3 }]
                        },
                        props.dashed && styles.dashed,
                        props.orientation === 'left' ? styles.shortWidth : { flex: 1 }
                    ]}
                />
                <Text style={[props.textStyle]}>{props.children}</Text>
                <View
                    style={[
                        styles.line,
                        {
                            marginLeft: props.padding,
                            borderColor: props.borderColor,
                            transform: [{ translateY: -props.textStyle.fontSize / 3 }]
                        },
                        props.dashed && styles.dashed,
                        props.orientation === 'right' ? styles.shortWidth : { flex: 1 }
                    ]}
                />
            </View>
        );
    }
}

export default Divider;
