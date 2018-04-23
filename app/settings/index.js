import React, {Component} from 'react';
import {View} from 'react-native';
import {changeHeaderColor} from "../../header/actions";
import {changeSettings} from './actions';
import {connect} from 'react-redux';
import SettingsItem from './settings-item';
import HorizontalLine from '../../shared/horizontal-line';
import AmountControl from './amount-control';

class Settings extends Component {
    componentDidMount() {
        this.props.navigation.dispatch(changeHeaderColor('#777777'));
    }

    componentWillUnmount() {
        this.props.navigation.dispatch(changeHeaderColor('#03A9F4'));
    }

    render() {
        const {
            pomodoroLength, breakLength, pomodorosPerDay,
            setPomodoroLength, setBreakLength, setPomodorosPerDay
        } = this.props;

		return (
            <View>
                <SettingsItem name="Pomodoro duration" description="Set the duration of your work period">
                    <AmountControl
                        min={1}
                        max={60}
                        multiplier={60 * 1000}
                        step={1}
                        prefix="minutes"
                        value={pomodoroLength}
                        onValueChange={setPomodoroLength}
                    />
                </SettingsItem>
                <HorizontalLine />
                <SettingsItem name="Break duration" description="Set the duration of your break period">
                    <AmountControl
                        min={1}
                        max={20}
                        multiplier={60 * 1000}
                        step={1}
                        prefix="minutes"
                        value={breakLength}
                        onValueChange={setBreakLength}
                    />
                </SettingsItem>
                <HorizontalLine />
                <SettingsItem name="Pomodoros per day" description="Choose amount of pomodoros you wish to accomplish per day">
                    <AmountControl
                        min={1}
                        max={20}
                        step={1}
                        prefix="pomodoro(s)"
                        value={pomodorosPerDay}
                        onValueChange={setPomodorosPerDay}
                    />
                </SettingsItem>
            </View>
        );
    }
}

const mapStateToProps = ({settings}) => settings;

const mapDispatchToProps = dispatch => ({
    setPomodoroLength: pomodoroLength => dispatch(changeSettings({pomodoroLength})),
    setBreakLength: breakLength => dispatch(changeSettings({breakLength})),
    setPomodorosPerDay: pomodorosPerDay => dispatch(changeSettings({pomodorosPerDay}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);