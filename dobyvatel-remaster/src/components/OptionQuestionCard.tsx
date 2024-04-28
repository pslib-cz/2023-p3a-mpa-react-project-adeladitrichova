import React, { useState, useEffect } from 'react';
import { OptionQuestion } from '../utils/types';
import questions from '../utils/OptionQuestions.json';

const OptionQuestionCard: React.FC = () => {
    const [question, setQuestion] = useState<OptionQuestion | null>(null);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [timer, setTimer] = useState<number>(15);

    useEffect(() => {
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        setQuestion(randomQuestion);
    }, []);

    useEffect(() => {
        if (timer > 0) {
            setTimeout(() => setTimer(timer - 1), 1000);
        } else {
            if (selectedOption === question?.answer) {
                console.log('spravne');
            }
            else {
                console.log('nespravne');

            }
            setSelectedOption(null);
            setTimer(15);
            const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
            setQuestion(randomQuestion);
        }
    }, [timer, selectedOption, question]);

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
    };

    return (
        <div className="question-card">
            <div className="box box--top">
                <div className="top--red"><p className="text--secondary text--s">Hráč 1</p></div>
                <div className="top--gold"><p className="text--secondary text--s">{timer}</p></div>
                <div className="top--green"><p className="text--secondary text--s">Hráč 2</p></div>
            </div>
            <div className="box box--questions">
                <p className="text--secondary text--m">{question?.text}</p>
                <div className="box box--button-grid">
                {question?.options[0] && Object.entries(question.options[0]).map(([key, value]) => (
                    <button className="button button--secondary" key={key} onClick={() => handleOptionClick(key)}>
                        <p className="text--m text--secondary">{value}</p>
                    </button>
                ))}
                </div>
            </div>
        </div>
    );
};

export default OptionQuestionCard;
