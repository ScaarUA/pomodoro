import {StyleSheet} from 'react-native';
import {theme} from '../../../appConfig';

export default StyleSheet.create({
	container: {
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 20,
		paddingBottom: 20
	},
	containerWithDescription: {
		paddingTop: 10,
		paddingBottom: 10
	},
	name: {
		fontSize: 18
	},
	description: {
		color: theme.secondaryTextColor
	}
});