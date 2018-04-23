import {StyleSheet} from 'react-native';
import {theme} from '../../../appConfig';

const padding = 10;

export default StyleSheet.create({
	slider: {

	},
	durationContainer: {
		alignItems: 'center'
	},
	durationText: {
		fontSize: 18,
		color: theme.textColor
	},
	dialogButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
});