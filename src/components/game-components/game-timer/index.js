import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {changeTimeFormat} from "../../../shared/helpers";

const GameTimer = (props) => {
    const {
        changeTime,
        isPlaying,
        time
    } = props;

    useEffect(() => {
        if (!isPlaying && time['sec'] === 0) return;

        const start =  setInterval(() => {
            changeTime();
        }, 1000);

        if (!isPlaying) {
            clearInterval(start);
            changeTime({min: 0, sec: 0});
        }
        return () => clearInterval(start);
    }, [isPlaying]);

    return (
        <div className='game__control-timer'>
            {changeTimeFormat(time['min'], time['sec'])}
        </div>
    );
};

GameTimer.propTypes = {
    changeTime: PropTypes.func.isRequired,
    isPlaying:  PropTypes.bool.isRequired,
    time:       PropTypes.object.isRequired
};

export default GameTimer;
