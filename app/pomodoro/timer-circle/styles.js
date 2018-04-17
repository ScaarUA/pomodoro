import {StyleSheet, Dimensions} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');

export const circleHeight = screenWidth - 120;

export default StyleSheet.create({
	container: {
		marginTop: 10,
		marginBottom: 10,
		height: circleHeight
	},
	innerText: {
		fontSize: 24
	}
});