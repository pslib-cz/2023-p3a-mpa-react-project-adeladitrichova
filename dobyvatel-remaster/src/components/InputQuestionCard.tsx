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
        setShowInputResults
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
            // If input results are shown, reset the timer and handle the results
            resetTimer();
            // Handle input results...
        } else {
            // If input results are not shown, decrement the timer
            const interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);

            // Clear the interval when the component unmounts or when a new question is displayed
            return () => clearInterval(interval);
        }
    }, [showInputResults]);

    const handleBotAnswer = () => {
        if (inputQuestion !== null) {
            const correctAnswer = inputQuestion.correctAnswer;
            const randomOffset = Math.floor(Math.random() * 21) - 10;
            const randomAnswer = correctAnswer + randomOffset;
            setBotInputAnswer(randomAnswer);
        }
    }

    useEffect(() => {
        if (timer > 0) {
            handleBotAnswer()
            const timeout = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(timeout);
        } else {
            setShowInputResults(true);
            setTimeout(() => setShowInputResults(false), 15000);
        }
    }, [timer]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerInputAnswer(Number(event.target.value));
    };



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
        if (playerInputAnswer !== null && inputQuestion !== null && botInputAnswer !== null) {
            const playerDifference = Math.abs(playerInputAnswer - inputQuestion.correctAnswer);
            const botDifference = Math.abs(botInputAnswer - inputQuestion.correctAnswer);

            if (playerDifference === botDifference) {
                if (startTime !== null && endTime !== null) {
                    const botTimeTaken = Math.floor(Math.random() * 13) + 2;
                    const playerTimeTaken = Math.floor((endTime - startTime) / 1000);
                    console.log(`Remíza, USER: ${playerTimeTaken}s, BOT: ${botTimeTaken}s`);

                    if (playerTimeTaken < botTimeTaken) {
                        setInputWinner(player.username);
                        return {inputWinner}
                    } else if (playerTimeTaken > botTimeTaken) {
                        setInputWinner(bot.username);
                        return {inputWinner}
                    } else {
                        console.log('Remíza');
                    }
                } else {
                    console.log('Remíza');
                }
            } else if (playerDifference < botDifference) {
                setInputWinner(player.username);
                return {inputWinner}
            } else {
                setInputWinner(bot.username);
                return {inputWinner}
            }
        } else if (playerInputAnswer === null && inputQuestion !== null && botInputAnswer !== null) {
            setPlayerInputAnswer(0);
            console.log('Hráč neodpověděl včas');

        }
        setPlayerInputAnswer(0);
        setStartTime(null);
        setEndTime(null);
    };



    return (
        <div>
            {showInputResults ? (
                <div className="question-card">
                    <div className="box box--top">
                        <div className="top--red"><p className="text--secondary text--s">{player.username}</p></div>
                        <div className="top--gold"><p className="text--secondary text--s">VS</p></div>
                        <div className="top--green"><p className="text--secondary text--s">{bot.username}</p></div>
                    </div>
                    <div className="box box--questions box--input">
                        <p className="text--secondary text--m">Right answer: {inputQuestion.correctAnswer}</p>
                        <p className="text--secondary text--m">Results:</p>
                        <p className="text--secondary text--m">{player.username} answered: {playerInputAnswer}</p>
                        <p className="text--secondary text--m">{bot.username} answered: {botInputAnswer}</p>
                        <p className="text--secondary text--m">Winner: {inputWinner}</p>
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
                        <input type="number" onChange={handleInputChange} className="input input--width" onFocus={handleStartTimer}
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