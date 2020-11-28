import React from 'react';
import PropTypes  from 'prop-types';
import classNames from 'classnames';

const GameCanvas = (props) => {
    const {
        currentSet,
        isPlaying,
        guessed,
        choose,
        cards
    } = props;

    return (
        <div className='game__canvas'>
            {
                cards.map((item, i) => {

                    const onCheck = currentSet.includes(i);
                    const isGuessed = guessed.includes(item['color']);

                    const classes = classNames({
                        'game__canvas-item--guessed': isGuessed,
                        'game__canvas-item--disabled': !isPlaying
                    });

                    return (
                        <div className={`game__canvas-item ${classes}`}
                             onClick={() => choose(i, item['color'])}
                             key={i}
                        >
                            {
                                !onCheck ?
                                    <div className="game__canvas-item-front">
                                        <span>X</span>
                                    </div>
                                    :

                                    <div className="game__canvas-item-back"
                                         style={{background: item['color']}}
                                    />
                            }
                        </div>
                    )
                    })
            }
        </div>
    );
};

GameCanvas.propTypes = {
    choose: PropTypes.func.isRequired,

    currentSet: PropTypes.array.isRequired,
    guessed:    PropTypes.array.isRequired,
    cards:      PropTypes.array.isRequired,

    isPlaying: PropTypes.bool.isRequired
};

export default GameCanvas;
