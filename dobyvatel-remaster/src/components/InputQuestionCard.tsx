import React, { useState, useEffect } from 'react';
import { InputQuestion } from '../utils/types';
import questions from '../utils/InputQuestions.json';

const InputQuestionCard: React.FC = () => {
    const [question, setQuestion] = useState<InputQuestion | null>(null);
    const [userAnswer, setUserAnswer] = useState<number | null>(null);
    const [timer, setTimer] = useState<number>(15);

    useEffect(() => {
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        setQuestion(randomQuestion);
    }, []);

    useEffect(() => {
        if (timer > 0) {
            setTimeout(() => setTimer(timer - 1), 1000);
        } else {
            if (userAnswer === question?.correctAnswer) {
                console.log('spravne');
            }
            setUserAnswer(null);
            setTimer(15);
            const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
            setQuestion(randomQuestion);
        }
    }, [timer, userAnswer, question]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserAnswer(Number(event.target.value));
    };

    return (
        <div>
            <h2>{question?.text}</h2>
            <input type="number" onChange={handleInputChange} />
            <p>Time left: {timer}</p>
        </div>
    );
};

export default InputQuestionCard;
