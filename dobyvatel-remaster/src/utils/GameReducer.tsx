import { gameInitialState} from './types.ts';

export enum actionGameTypes {
    START_GAME,
    END_GAME,
    SET_USER,
    SET_COLOR,
    SET_BASE,
    SET_POINTS,
    ATTACK_BASE,
    ATTACK_REGION,
    SET_TAKEN,
    SET_WINNER,
    SET_TURN,
}


export type GameAction =
    | { type: actionGameTypes.START_GAME; payload: { } }
    | { type: actionGameTypes.END_GAME; payload: { } }
    | { type: actionGameTypes.SET_USER; payload: { username: string } }
    | { type: actionGameTypes.SET_COLOR; payload: { color: string } }
    | { type: actionGameTypes.SET_BASE; payload: { base: string } }
    | { type: actionGameTypes.SET_POINTS; payload: { points: number } }
    | { type: actionGameTypes.ATTACK_BASE; payload: { base: string } }
    | { type: actionGameTypes.ATTACK_REGION; payload: { region: string } }
    | { type: actionGameTypes.SET_TAKEN; payload: { region: string } }
    | { type: actionGameTypes.SET_WINNER; payload: { winner: string } }
    | { type: actionGameTypes.SET_TURN; payload: { turn: string } };

export function gameReducer(state: gameInitialState, action: GameAction) {
    switch (action.type) {
        case actionGameTypes.START_GAME:
            return { ...state, gameStarted: true };
        case actionGameTypes.END_GAME:
            return { ...state, gameEnded: true };
        case actionGameTypes.SET_USER:
            return { ...state, user: action.payload.username };
        case actionGameTypes.SET_COLOR:
            return { ...state, color: action.payload.color };
        case actionGameTypes.SET_BASE:
            return { ...state, base: action.payload.base };
        case actionGameTypes.SET_POINTS:
            return { ...state, points: state.points + action.payload.points };
        case actionGameTypes.ATTACK_BASE:
            // TODO: dodelat logiku utoku na zakladnu
            return state;
        case actionGameTypes.ATTACK_REGION:
            // TODO: dodelat logiku utoku na region
            return state;
        case actionGameTypes.SET_TAKEN:
            return { ...state, taken: [...state.taken, action.payload.region] };
        case actionGameTypes.SET_WINNER:
            return { ...state, winner: action.payload.winner };
        case actionGameTypes.SET_TURN:
            return { ...state, turn: action.payload.turn };
        default:
            return state;
    }
}
