import { gameInitialState} from './GameContext.tsx';

export enum actionGameTypes {
    START_GAME,
    END_GAME,
    PARTITION,
    SELECT_REGION,

}


export type GameAction =
    | { type: actionGameTypes.START_GAME; payload: { } }
    | { type: actionGameTypes.END_GAME; payload: { } }
    | { type: actionGameTypes.PARTITION; payload: { } }


export function gameReducer(state: gameInitialState, action: GameAction) {
    switch (action.type) {
        case actionGameTypes.START_GAME:
            return { ...state, gameStarted: true };

        case actionGameTypes.END_GAME:
            return { ...state, gameEnded: true };

        case actionGameTypes.PARTITION:
            return { ...state, partition: true };

        case actionGameTypes.SELECT_REGION:
            return { ...state, partition: true };

        default:
            return state;
    }
}