import {StyleSheet} from 'react-native';
import {theme} from '../../appConfig';

export default StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: theme.backgroundColor,
		paddingTop: 20,
		paddingBottom: 20
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	subtitle: {
		fontSize: 14,
		color: theme.secondaryTextColor
	}
});