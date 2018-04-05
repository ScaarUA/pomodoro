import {StyleSheet} from 'react-native';

import {theme} from '../appConfig';

export default StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        flexDirection: 'row',
        height: 60,
        backgroundColor: theme.headerColor,
        elevation: 3
    },

    title: {
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 24,
        color: theme.textColor
    }
});