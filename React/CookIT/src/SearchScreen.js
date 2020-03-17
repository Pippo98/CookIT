import * as React from 'react';
import { Button, View, Text } from 'react-native';

import SearchPage from "./SearchPage"

function SearchScreen({ navigation }) {
    return (
        <>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('SearchScreen')}
            />
            <SearchPage></SearchPage>
        </>
    );
}
