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
            evaluateAnswer();
            setTimer(15);
            const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
            setQuestion(randomQuestion);
        }
    }, [timer]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserAnswer(Number(event.target.value));
    };

    const evaluateAnswer = () => {
        if (userAnswer === question?.correctAnswer) {
            console.log('Správně');
        } else {
            console.log('Špatně');
        }
        setUserAnswer(null);
    };

    const handleConfirmClick = () => {
        evaluateAnswer();
    };

    return (
        <div className="question-card">
            <div className="box box--top">
                <div className="top--red"><p className="text--secondary text--s">Hráč 1</p></div>
                <div className="top--gold"><p className="text--secondary text--s">{timer}</p></div>
                <div className="top--green"><p className="text--secondary text--s">Hráč 2</p></div>
            </div>
            <div className="box box--questions box--input">
                <p className="text--secondary text--m">{question?.text}</p>
                <input type="number" onChange={handleInputChange} className="input"/>
                <button onClick={handleConfirmClick} className="button button--secondary">
                    <p className="text--m text--secondary">Potvrdit</p></button>
            </div>
        </div>
    );
};

export default InputQuestionCard;
