import React, {useState, useEffect} from 'react';
import {InputQuestion} from '../utils/types';
import questions from '../utils/InputQuestions.json';
import {useGame} from "../utils/GameContext.tsx";

const InputQuestionCard: React.FC = () => {
    const {player, bot} = useGame();
    const [question, setQuestion] = useState<InputQuestion | null>(null);
    const [playerAnswer, setPlayerAnswer] = useState<number | null>(null);
    const [botAnswer, setBotAnswer] = useState<number | null>(null);
    const [timer, setTimer] = useState<number>(15);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);
    const [winner, setWinner] = useState<string | null>(null);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        setQuestion(randomQuestion);
    }, []);

    useEffect(() => {
        if (timer > 0) {
            const timeout = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(timeout);
        } else {
            setShowResults(true);
            setTimeout(() => setShowResults(false), 15000);
        }
    }, [timer]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerAnswer(Number(event.target.value));
    };

    const handleBotAnswer = () => {
        if (question !== null) {
            const correctAnswer = question.correctAnswer;
            const randomOffset = Math.floor(Math.random() * 41) - 20;
            const randomAnswer = correctAnswer + randomOffset;
            setBotAnswer(randomAnswer);
        }
    }

    const handleConfirmClick = () => {
        evaluateAnswer();
    };

    const handleStartTimer = () => {
        setStartTime(Date.now());
    };

    const handleStopTimer = () => {
        if (startTime !== null) {
            setEndTime(Date.now());
            const timeTaken = Math.floor((endTime - startTime) / 1000);
            console.log(`User took ${timeTaken} seconds to answer.`);
        }
    };

    const evaluateAnswer = () => {
        if (playerAnswer !== null && question !== null && botAnswer !== null) {
            const playerDifference = Math.abs(playerAnswer - question.correctAnswer);
            const botDifference = Math.abs(botAnswer - question.correctAnswer);

            if (playerDifference === botDifference) {
                if (startTime !== null && endTime !== null) {
                    const botTimeTaken = Math.floor(Math.random() * 13) + 2;
                    const playerTimeTaken = Math.floor((endTime - startTime) / 1000);
                    console.log(`Remíza, USER: ${playerTimeTaken}s, BOT: ${botTimeTaken}s`);

                    if (playerTimeTaken < botTimeTaken) {
                        setWinner(player.username);
                        return {winner}
                    } else if (playerTimeTaken > botTimeTaken) {
                        setWinner(bot.username);
                        return {winner}
                    } else {
                        console.log('Remíza');
                    }
                } else {
                    console.log('Remíza');
                }
            } else if (playerDifference < botDifference) {
                setWinner(player.username);
                return {winner}
            } else {
                setWinner(bot.username);
                return {winner}
            }
        } else if (playerAnswer === null && question !== null && botAnswer !== null) {
            console.log('Hráč neodpověděl včas');
            setPlayerAnswer(0);
        }
        setPlayerAnswer(null);
        setStartTime(null);
        setEndTime(null);
    };

    return (
        <div>
            {showResults ? (
                <div className="question-card">
                    <div className="box box--top">
                        <div className="top--red"><p className="text--secondary text--s">{player.username}</p></div>
                        <div className="top--gold"><p className="text--secondary text--s">VS</p></div>
                        <div className="top--green"><p className="text--secondary text--s">{bot.username}</p></div>
                    </div>
                    <div className="box box--questions box--input">
                        <p className="text--secondary text--m">Right answer: {question.correctAnswer}</p>
                        <p className="text--secondary text--m">Results:</p>
                        <p className="text--secondary text--m">{player.username} answered: {playerAnswer}</p>
                        <p className="text--secondary text--m">{bot.username} answered: {botAnswer}</p>
                        <p className="text--secondary text--m">Winner: {winner}</p>
                    </div>
                </div>
            ) : (
                <div className="question-card">
                    <div className="box box--top">
                        <div className="top--red"><p className="text--secondary text--s">{player.username}</p></div>
                        <div className="top--gold"><p className="text--secondary text--s">{timer}</p></div>
                        <div className="top--green"><p className="text--secondary text--s">{bot.username}</p></div>
                    </div>
                    <div className="box box--questions box--input">
                        <p className="text--secondary text--m">{question?.text}</p>
                        <button onClick={handleBotAnswer} className="button button--secondary">BOT ANSWER?</button>
                        <input type="number" onChange={handleInputChange} className="input" onFocus={handleStartTimer}
                               onBlur={handleStopTimer}/>
                        <button onClick={handleConfirmClick} className="button button--secondary">
                            <p className="text--m text--secondary">Potvrdit</p></button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InputQuestionCard;
