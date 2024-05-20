import React, {useEffect} from 'react';
import questions from '../utils/InputQuestions.json';
import {useGame} from "../utils/GameContext.tsx";

const InputQuestionCard: React.FC = () => {
    const {
        player,
        bot,
        inputQuestion,
        setInputQuestion,
        playerInputAnswer,
        setPlayerInputAnswer,
        botInputAnswer,
        setBotInputAnswer,
        timer,
        setTimer,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        inputWinner,
        setInputWinner,
        showInputResults,
        setShowInputResults,
        botResponseTime,
        setBotResponseTime,
        playerResponseTime,
        setPlayerResponseTime
    } = useGame();

    const resetTimer = () => {
        setTimer(15);
    };

    useEffect(() => {
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        resetTimer();
        setInputQuestion(randomQuestion);
    }, []);

    useEffect(() => {
        if (showInputResults) {
            resetTimer();
        } else {
            const interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [showInputResults]);

    const handleBotAnswer = () => {
        if (inputQuestion !== null) {
            const correctAnswer = inputQuestion.correctAnswer;
            const randomOffset = Math.floor(Math.random() * 21) - 10;
            const randomAnswer = correctAnswer + randomOffset;
            const botTimeTaken = Math.floor(Math.random() * 13) + 2;
            setBotInputAnswer(randomAnswer);
            setBotResponseTime(botTimeTaken);
        }
    }

    useEffect(() => {
        if (timer > 0) {
            handleBotAnswer();
            const timeout = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(timeout);
        } else {
            evaluateAnswer();
            setShowInputResults(true);
            setTimeout(() => setShowInputResults(false), 15000);
        }
    }, [timer]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerInputAnswer(Number(event.target.value));
    };

    const handleConfirmClick = () => {
        setEndTime(Date.now());
        if (startTime !== null) {
            const playerTimeTaken = Math.floor((Date.now() - startTime) / 1000);
            setPlayerResponseTime(playerTimeTaken);
        }
    };

    const handleStartTimer = () => {
        setStartTime(Date.now());
    };

    const handleStopTimer = () => {
        if (startTime !== null && endTime === null) {
            setEndTime(Date.now());
            const playerTimeTaken = Math.floor((Date.now() - startTime) / 1000);
            setPlayerResponseTime(playerTimeTaken);
        }
    };

    const evaluateAnswer = () => {
        if (playerInputAnswer !== null && inputQuestion !== null && botInputAnswer !== null) {
            const playerDifference = Math.abs(playerInputAnswer - inputQuestion.correctAnswer);
            const botDifference = Math.abs(botInputAnswer - inputQuestion.correctAnswer);

            if (playerDifference === botDifference) {
                if (playerResponseTime !== null && botResponseTime !== null) {
                    if (playerResponseTime < botResponseTime) {
                        setInputWinner(player.username);
                    } else if (playerResponseTime > botResponseTime) {
                        setInputWinner(bot.username);
                    } else {
                        setInputWinner('Tie');
                    }
                } else {
                    setInputWinner('Tie');
                }
            } else if (playerDifference < botDifference) {
                setInputWinner(player.username);
            } else {
                setInputWinner(bot.username);
            }
        } else if (playerInputAnswer === null && inputQuestion !== null && botInputAnswer !== null) {
            setPlayerInputAnswer(0);
            console.log('Player did not answer in time');
        }
        setPlayerInputAnswer(0);
        setStartTime(null);
        setEndTime(null);
    };

    return (
        <div className="dark--overlay">
            {showInputResults && inputQuestion !== null ? (
                <div className="question-card">
                    <div className="box box--top">
                        <div className="top--red"><p className="text--secondary text--s">{player.username}</p></div>
                        <div className="top--gold"><p className="text--secondary text--s">VS</p></div>
                        <div className="top--green"><p className="text--secondary text--s">{bot.username}</p></div>
                    </div>
                    <div className="box box--questions box--input">

                        <div className="answer--part">
                            <p className="text--secondary text--s">Correct Answer</p>
                            <div className="answer--right">
                                <p className="text--secondary text--m">{inputQuestion.correctAnswer}</p>
                            </div>
                        </div>

                        <div className="answer--part">
                            <div className="answer--flex">
                                <div className="answer--bg">
                                    <div className="answer answer--player">
                                        <p className="text--secondary text--m">{playerInputAnswer}</p>
                                    </div>
                                    <div className="answer-desc">
                                        <p className="text--secondary text--xs">{player.username}</p>
                                        <p className="text--secondary text--xs">⏱︎ {playerResponseTime} s</p>
                                    </div>
                                </div>

                                <div className="answer--bg">
                                    <div className="answer answer--bot">
                                        <p className="text--secondary text--m">{botInputAnswer}</p>
                                    </div>
                                    <div className="answer-desc">
                                        <p className="text--secondary text--xs">{bot.username}</p>
                                        <p className="text--secondary text--xs">⏱︎ {botResponseTime} s</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="answer answer--real">
                            <img src="./images/crown.svg" alt="Crown"/>
                            <p className="text--secondary text--m">{inputWinner}</p>
                            <img src="./images/crown.svg" alt="Crown"/>
                        </div>
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
                        <p className="text--secondary text--m">{inputQuestion?.text}</p>
                        <input type="number" onChange={handleInputChange} className="input input--width"
                               onFocus={handleStartTimer}
                               onBlur={handleStopTimer}/>
                        <button onClick={handleConfirmClick} className="button button--secondary">
                            <p className="text--m text--secondary">Confirm</p></button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InputQuestionCard;
