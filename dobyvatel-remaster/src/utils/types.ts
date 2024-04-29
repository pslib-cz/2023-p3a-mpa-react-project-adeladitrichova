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
    color: "red";
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
    owner: null | PlayerType["username"];
    base: boolean;

}

// ACTIONS


export interface GameState {
    gameStarted: boolean;
    gameEnded: boolean;
    user: string | null;
    color: string | null;
    base: string | null;
    points: number;
    taken: string[];
    winner: string | null;
    turn: string | null;
}


