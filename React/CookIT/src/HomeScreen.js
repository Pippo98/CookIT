import * as React from 'react';
import { Button, View, Text } from 'react-native';

import HomePage from "./HomePage"

function HomeScreen({ navigation }) {
    return (
        <>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('SearchScreen')}
            />
            <HomePage></HomePage>
        </>
    );
}
