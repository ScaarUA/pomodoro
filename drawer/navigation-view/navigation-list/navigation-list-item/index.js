import React from 'react';
import styles from './styles';
import FontAwesome from 'react-native-fontawesome';
import {View, Text, TouchableNativeFeedback} from 'react-native';

const NavigationListItem = ({onPress, children, icon}) => (
    <TouchableNativeFeedback onPress={onPress}>
        <View style={styles.listItemContainer}>
            <FontAwesome style={styles.icon}>{icon}</FontAwesome>
            <Text style={styles.listItem}>{children}</Text>
        </View>
    </TouchableNativeFeedback>
);

export default NavigationListItem;