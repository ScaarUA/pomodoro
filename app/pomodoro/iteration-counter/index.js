import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import {View, Text} from 'react-native';
import styles from './styles';

const IterationCounter = ({amountOfIterations, pomodorosPerDay}) => {
	const iterations = new Array(Math.max(amountOfIterations, pomodorosPerDay)).fill('');
	const isCompeted = index => index < amountOfIterations;

	return (
	<View style={styles.container}>
			{iterations.map((item, index) => (
				<FontAwesome
					key={index}
					style={[styles.iteration, isCompeted(index) ? styles.iterationCompleted : styles.iterationExpected]}
				>
					{Icons.checkCircleO}
				</FontAwesome>
			))}
	</View>
	)
};

IterationCounter.propTypes = {
	amountOfIterations: PropTypes.number.isRequired,
	pomodorosPerDay: PropTypes.number.isRequired
};

export default IterationCounter;