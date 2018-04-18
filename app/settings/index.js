import React, {Component} from 'react';
import {View} from 'react-native';
import {changeHeaderColor} from "../../header/actions";
import {changeSettings} from './actions';
import {connect} from 'react-redux';
import SettingsItem from './settings-item';
import HorizontalLine from '../../shared/horizontal-line';
import DurationControl from './duration-control';

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
                <SettingsItem name="Pomodoro duration" description="Set the duration of your work period">
                    <DurationControl
                        min={1}
                        max={60}
                        duration={pomodoroLength}
                        onValueChange={setPomodoroLength}
                    />
                </SettingsItem>
                <HorizontalLine />
                <SettingsItem name="Break duration" description="Set the duration of your break period">
                    <DurationControl
                        min={1}
                        max={20}
                        duration={breakLength}
                        onValueChange={setBreakLength}
                    />
                </SettingsItem>
                <HorizontalLine />
            </View>
        );
    }
}

const mapStateToProps = ({settings}) => settings;

const mapDispatchToProps = dispatch => ({
    setPomodoroLength: length => dispatch(changeSettings({
        pomodoroLength: length
	})),
    setBreakLength: length => dispatch(changeSettings({
        breakLength: length
	}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);