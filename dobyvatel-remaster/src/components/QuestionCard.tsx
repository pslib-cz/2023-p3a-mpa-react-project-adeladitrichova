import React, { useState, useEffect } from 'react';
import questions from '../utils/Questions.json';
import { QuestionType, QuestionOptionType, QuestionWriteType } from '../utils/types';

const QuestionCard: React.FC = () => {
    const [question, setQuestion] = useState<QuestionType | null>(null);

    useEffect(() => {
        const questionKeys = Object.keys(questions);
        const randomKey = questionKeys[Math.floor(Math.random() * questionKeys.length)];
        setQuestion(questions[randomKey]);
    }, []);

    if (!question) {
        return <div>Loading...</div>;
    }

    if (question.type === 'option') {
        const questionOption = question as QuestionOptionType;
        return (
            <div>
                <p>{questionOption.text}</p>
                {questionOption.options.map((option, index) => (
                    <p key={index}>{String.fromCharCode(97 + index)}: {option}</p>
                ))}
            </div>
        );
    }

    if (question.type === 'write') {
        const questionWrite = question as QuestionWriteType;
        return (
            <div>
                <p>{questionWrite.text}</p>
                <input type="text" />
            </div>
        );
    }

    return null;
};

export default QuestionCard;
