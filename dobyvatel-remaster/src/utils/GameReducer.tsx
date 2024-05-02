import { gameInitialState} from './GameContext.tsx';

export enum actionGameTypes {
    START_GAME,
    END_GAME,

}


export type GameAction =
    | { type: actionGameTypes.START_GAME; payload: { } }
    | { type: actionGameTypes.END_GAME; payload: { } }

export function gameReducer(state: gameInitialState, action: GameAction) {
    switch (action.type) {
        case actionGameTypes.START_GAME:
            return { ...state, gameStarted: true };
        case actionGameTypes.END_GAME:
            return { ...state, gameEnded: true };
        default:
            return state;
    }
}