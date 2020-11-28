import React from 'react';
import PropTypes from 'prop-types';

import {GameTimer} from "../index";
import classNames from 'classnames';


const GameControl = (props) => {
    const {
        changeTime,
        isPlaying,
        start,
        time,
        stop
    } = props;

    const click = isPlaying ? () => stop(true) : start;
    const btnStyles = classNames({'game__control-btn--stop': isPlaying});

    return (
        <div className='game__control'>
            <GameTimer
                changeTime={changeTime}
                isPlaying={isPlaying}
                time={time}
            />

            <button className={`game__control-btn ${btnStyles}`}
                    onClick={click}
            >
                {
                    !isPlaying ?
                    <span>Старт</span> :
                    <span>Стоп</span>
                }
            </button>
        </div>
    );
};

GameControl.propTypes = {
    changeTime: PropTypes.func.isRequired,
    start:      PropTypes.func.isRequired,
    stop:       PropTypes.func.isRequired,

    isPlaying: PropTypes.bool.isRequired,
    time:      PropTypes.object.isRequired
};

export default GameControl;
