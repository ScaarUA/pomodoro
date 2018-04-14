import React, {Component} from 'react';
import {Picker, Text, View} from 'react-native';
import {changeHeaderColor} from "../../header/actions";
import {changeSettings} from './actions';
import {connect} from 'react-redux';

const pomodoroLengths = [25, 30, 35, 40, 45];
const breakLengths = [5, 7.5, 10];

class Settings extends Component {
    componentDidMount() {
        this.props.navigation.dispatch(changeHeaderColor('#777777'));
    }

    componentWillUnmount() {
        this.props.navigation.dispatch(changeHeaderColor('#03A9F4'));
    }

    render() {
        const {
            pomodoroLength, breakLength,
            setPomodoroLength, setBreakLength
        } = this.props;

        return (
            <View>
                <Picker
                    onValueChange={setPomodoroLength}
                    selectedValue={pomodoroLength}
                    style={{width: 150}}
                    prompt="Pomodoro length"
                >
					{pomodoroLengths.map(length => (
                        <Picker.Item key={length} label={`${length} minutes`} value={length} />
					))}
                </Picker>
                <Picker
                    onValueChange={setBreakLength}
                    selectedValue={breakLength}
                    style={{width: 150}}
                    prompt="Break length"
                >
					{breakLengths.map(length => (
                        <Picker.Item key={length} label={`${length} minutes`} value={length} />
					))}
                </Picker>
            </View>
        );
    }
}

const mapStateToProps = ({settings}) => settings;

const mapDispatchToProps = dispatch => ({
    setPomodoroLength: (length) => dispatch(changeSettings({
        pomodoroLength: length
	})),
    setBreakLength: (length) => dispatch(changeSettings({
        breakLength: length
	}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);