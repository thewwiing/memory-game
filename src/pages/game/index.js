import React     from 'react';
import PropTypes from 'prop-types';

import {bindActionCreators} from "redux";
import {withRouter}         from "react-router-dom";
import {connect}            from "react-redux";
import format               from 'date-fns/format';

import {
    GameRemainingTime,
    GameSuccess,
    GameControl,
    GameCanvas
} from "../../components/game-components";
import {setResultAction} from "../../store/actions";

class Game extends React.Component {

    state = {
        current: {color: '', set: []},  // выбранные цвета и их индексы в массиве
        time:    {min: 0, sec: 0},      // время
        successMsgIsOpen: false,        // для модального окна при победе
        isPlaying: false,               // идет ли игра в текущий момент
        guessed: [],                    // отгаданные цвета
    };

    choose = (index, color) => {        // функция, отвечающая за клик на квадратик

        let {current, guessed, isPlaying, time} = this.state;
        if (!isPlaying) return;                                                     //1)игра не начнется, пока не будет старт
        if (current['set'].includes(index) || current['set'].length > 1) return;    //2)нажатие на один и тот же цвет или
                                                                                    //  выбор больше 2-х цветов невозможен
        this.setState({                     //добавление цвета и индекса
            current: {
                color,
                set: [...current['set'], index]
            }
        });

        if (current['set'].length === 1) {       //сверка двух цветов
            if (color === current['color']) {    //при сходстве идет добавление в основной
                guessed.push(color)              //массив отгаданных цветов
            }

            setTimeout(() => {
                current['set'] = [];             //обнуление
                this.setState({
                    guessed,
                    current
                })
            }, 1000);

            if (guessed.length === 18) {                                // игра выйграна, сохранение результата в хранилище

                this.props.setResultAction({                            // сохрание результатов в хранилище
                    date:    format(new Date(), 'dd/MM/yyyy HH:mm'),
                    result: `${time['min']} мин. ${time['sec']} сек.`
                });
                this.stop(true);
                this.throwSuccessWindow();                              // выброс сообщения о победе
            }
        }
    };

    timeChangeHandler = (customTime) => { // измена времени
        let time = this.state.time;

        if (customTime) {
            time = customTime
        } else if (time['sec'] === 59) {
            time['min'] = time['min'] + 1;
            time['sec'] = 0;
        } else {
            time['sec'] = time['sec'] + 1;
        }
        this.setState({time});
    };

    start = () => this.setState({     // начало игры
        isPlaying: true
    });

    stop = (flag) => {                      //частичное обнуление или же полная остановка игры
        this.setState({
            current: {color: '', set: []}   //обнуление
        });
        if (flag) this.setState({
                isPlaying: false,
                guessed: []
            }
        );
    };

    throwSuccessWindow = () => {
        this.setState({successMsgIsOpen: true});
        setTimeout(() => this.setState({
            guessed: [],
            successMsgIsOpen: false
        }), 5000);
    };

    render() {
        const {
            state: {
                successMsgIsOpen,
                current: {set},
                isPlaying,
                guessed,
                time
            },
            props: {
                history,
                cards
            }
        } = this;

        return (
            <div className='game'>
                <GameControl
                    isPlaying={isPlaying}
                    changeTime={this.timeChangeHandler}
                    start={this.start}
                    stop={this.stop}
                    time={time}
                />
                <GameCanvas
                    isPlaying={isPlaying}
                    currentSet={set}
                    guessed={guessed}
                    choose={this.choose}
                    cards={cards}
                />
                {
                    set.length !== 0 &&
                    <GameRemainingTime
                        stop={this.stop}
                    />
                }

                <button className='game__btn'
                        disabled={isPlaying}
                        onClick={() => history.push('/results')}
                >
                    <span>К результатам</span>
                </button>

                {
                    successMsgIsOpen &&
                    <GameSuccess/>
                }
            </div>
        );
    }

}

Game.propTypes = {
    setResultAction: PropTypes.func.isRequired,
    cards:           PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  cards: state.GameReducer.cards
});

const mapDispatchToProps = (dispatch) => (
    bindActionCreators(
        {
            setResultAction
        }, dispatch
    )
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Game));

