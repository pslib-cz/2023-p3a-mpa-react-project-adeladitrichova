// USER TYPES

export type UserType = {
    userId: string;
    username: string;
    color: string;
    points: number;
};


export type UserFormType = {
    onSubmit: (username: string, color: string) => void;
};


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

export interface QuestionSet {
    [key: string]: QuestionType;
}


//MAP TYPES

export type SVGData = {
    id: string;
    d: string;
    fill: UserType;
    range: string[];
    taken: boolean;
    base: [
        {
            owner: UserType;
            points: number;
        }
    ]
    onClick: () => void;

}

// ACTIONS

export enum actionGameTypes {
    START_GAME,
    END_GAME,
    SET_USER,
    SET_COLOR,
    SET_BASE,
    SET_POINTS,
    ATTACK,



};

