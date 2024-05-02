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

export type RegionState = {
    id: string;
    d: string;
    fill: string;
    range: string[];
    owner: null | PlayerType["username"] | BotType["username"];
    lives: number;
};

