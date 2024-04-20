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

export type QuestionCardProps = {
    areaId: string;
}

// USER TYPES

export type PlayerType = {
    id: string;
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
    owner: null | PlayerType["id"];
    base: boolean;

}

// ACTIONS


export type gameInitialState = {
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


