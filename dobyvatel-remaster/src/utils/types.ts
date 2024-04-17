export type UserCardType = {
    username: string;
    color: string;
    points: number;
};


export type UserFormType = {
    onSubmit: (username: string, color: string) => void;
};


export type StringQuestionType = {
    text: string;
    answers: string[];
    correctAnswer: string;
};

export type SelectQuestionType = {
    question: string;
    options: {
        text: string;
        isCorrect: boolean;
    }[];
}


export type PlaceType = {
    name: string;
    owner: 'red' | 'yellow' | 'green' | null;
    question: SelectQuestionType | StringQuestionType;
};

export type RoundType = {
    currentPlace: PlaceType;
    timeRemaining: number;
    questionAnswered: boolean;
};

export type GameType = {
    places: PlaceType[];
    currentRound: RoundType;
    redPoints: number;
    yellowPoints: number;
    roundNumber: number;
};

export type RegionsType = {
    id: string;
    d: string;
    fill: string;
};

export type MapProps = {
    points: number;
    id: string;
    color: string;
    selectPlace: (placeIndex: number) => void;
};

export enum actionTypes {
    START_GAME,
    ANSWER_QUESTION,
    NEXT_ROUND,
    END_GAME,
    SELECT_PLACE,
    SELECT_COLOR,

};