
export type UserCardType = {
    username: string;
    color: string;
    points: number;
};

export type QuestionType = {
    text: string;
    answers: string[];
    correctAnswer: number;
};

export type PlaceType = {
    name: string;
    owner: 'red' | 'yellow' | null;
    question: QuestionType;
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