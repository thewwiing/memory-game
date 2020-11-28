import React, {
    useEffect,
    useState
} from 'react';
import PropTypes from 'prop-types';

const GameTimeRemaining = (props) => {
    let [counter, setCounter] = useState(5);
    const {
        stop
    } = props;


    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(--counter);
        }, 1000);

        if (counter === 0) {
            clearInterval(interval);
            stop()
        }

        return () => clearInterval(interval);
    }, [counter]);

    return (
        <div className='game__time-remaining'>
            У вас осталось {counter} сек.
        </div>
    );
};

GameTimeRemaining.propTypes = {
    stop: PropTypes.func.isRequired
};

export default GameTimeRemaining;
