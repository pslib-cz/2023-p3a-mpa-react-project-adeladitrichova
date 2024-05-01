//QUESTION TYPES

export type Option = {
    a: string;
    b: string;
    c: string;
    d: string;
    [key: string]: string;
}

export type OptionQuestion = {
    id: number;
    text: string;
    options: Option[];
    answer: string;
}

export type InputQuestion = {
    id: number;
    text: string;
    correctAnswer: number;
}

export type QuestionCardProps = {
    areaId: string;
}

// USER TYPES

export type PlayerType = {
    username: string;
    color: string;
    points: number;
    base: string;
    isPlaying: boolean;
}

export type BotType = {
    username: string;
    color: string;
    points: number;
    base: string;
    isPlaying: boolean;
}

//MAP TYPES

export type MapData = {
    id: string;
    d: string;
    fill: "#CEB288" | PlayerType["color"] | BotType["color"] ;
    range: string[];
    owner: null | PlayerType["username"] | BotType["username"];
    lives: number;

}

// ACTIONS

export type GameState = {
    gameStarted: boolean,
    currentPhase: 'CHOOSE_BASE' | 'GAME_ON' | 'END_GAME',
    player: PlayerType,
    bot: BotType,
    map: MapData[],
}


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