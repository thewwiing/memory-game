import {colors} from "../constants";

export const generateCards = () => {
    // return [...colors, ...colors];    //для тестирования, без смешивания массива
    return shuffle([...colors, ...colors]);
};

export const changeTimeFormat = (min, sec) => {
    if ((sec + '').length === 1) sec = '0' + sec;
    if ((min + '').length === 1) min = '0' + min;
    return min + ':' + sec;
};

const shuffle = (array) => {
    let j, x, i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
};

export const getResults = () => JSON.parse(localStorage.getItem('results')) || [];
