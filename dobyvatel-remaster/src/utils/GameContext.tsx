import React, { useReducer } from 'react';
import { gameReducer } from './GameReducer';
import { botReducer, botInitialState } from '../components/Bot.tsx';


export const GameContext = React.createContext<GameContextProps | undefined>(
    undefined,
);

export type GameState = typeof gameInitialState;
export type BotState = typeof botInitialState;

type GameContextProps = {
    gameState: GameState;
    gameDispatch: React.Dispatch<Action>;
    botState: BotState;
    botDispatch: React.Dispatch<Action>;
};

export const useGame = () => {
    const context = React.useContext(GameContext);
    if (!context) throw new Error("GameQuiz must be used within a GameProvider");
    return context;
};

export const initialGameState  = {
    gameStarted: false,
    gameEnded: false,
    user: null,
    color: null,
    base: null,
    points: 0,
    taken: [],
    winner: null,
    turn: null,
};

export const GameProvider: React.FC<React.PropsWithChildren> = (props) => {
    const [gameState, gameDispatch] = React.useReducer(gameReducer, initialGameState); //TODO: fix this
    const [botState, botDispatch] = useReducer(botReducer, botInitialState);


    return (
        <GameContext.Provider value={{ gameState, gameDispatch, botState, botDispatch }}>
            {props.children}
        </GameContext.Provider>
    );
};
