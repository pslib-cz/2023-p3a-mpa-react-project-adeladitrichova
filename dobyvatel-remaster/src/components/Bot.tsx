import {useReducer} from "react";

//TODO: prekopat celyho bota

export const botInitialState = {
    id: 'bot',
    username: 'Bot',
    color: 'green',
    points: 0,
    base: '',
    isPlaying: false,
};

export function botReducer(state: botInitialState, action) {
    switch (action.type) {
        case 'SET_BASE':
            return { ...state, base: action.payload };
        case 'SET_POINTS':
            return { ...state, points: state.points + action.payload };
        case 'START_GAME':
            return { ...state, isPlaying: true };
        case 'END_GAME':
            return { ...state, isPlaying: false };
        default:
            return state;
    }
}

const [botState, botDispatch] = useReducer(botReducer, botInitialState);

const handleAreaClick = (areaId: string) => {
    setSelectedArea(areaId);
    botDispatch({ type: 'SET_BASE', payload: areaId });
};
