//QUESTION TYPES

export type QuestionType = QuestionOptionType | QuestionWriteType;

export type Option = {
    a: string;
    b: string;
    c: string;
    d: string;
}

export type QuestionOptionType = {
    id: number;
    type: "option";
    text: string;
    options: Option[];
    answer: string;
    timeLimit: number;
}

export type QuestionWriteType = {
    id: number;
    type: "write";
    text: string;
    correctAnswer: string;
    timeLimit: number;
}

export type QuestionSet = {
    [key: string]: QuestionType;
}

// USER TYPES

export type PlayerType = {
    id: string;
    username: string;
    color: "red" | "green" | "yellow";
    points: number;
    base: string;
    isPlaying: boolean;
}


//MAP TYPES

export type MapData = {
    id: string;
    d: string;
    fill: "#CEB288" | PlayerType["color"] ;
    range: string[];
    owner: null | PlayerType["id"];
    base: boolean;
}

export type MapDataCollection = {
    [key: string]: MapData;
}

// ACTIONS

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

