import {StyleSheet, Dimensions} from 'react-native';
import {theme} from '../../../appConfig';

const {width: screenWidth} = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		flexWrap: 'wrap',
		width: screenWidth,
		marginTop: 10,
		marginBottom: 10
	},
	iterationsContainer: {
	},
	iteration: {
		marginLeft: 5,
		marginRight: 5,
		fontSize: 24
	},
	iterationCompleted: {
		color: theme.mainColor,
	},
	iterationExpected: {
		color: theme.inactiveColor
	}
});