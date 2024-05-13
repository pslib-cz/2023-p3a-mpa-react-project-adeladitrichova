import React, {useEffect} from 'react';
import questions from '../utils/OptionQuestions.json';
import {useGame} from "../utils/GameContext.tsx";

const OptionQuestionCard: React.FC = () => {
    const {
        question,
        setQuestion,
        selectedOption,
        setSelectedOption,
        botSelectedOption,
        setBotSelectedOption,
        timer,
        setTimer,
        showOptionResults,
        setShowOptionResults,
        startTime,
        setStartTime,
        setEndTime,
        optionWinner,
        setOptionWinner,
        player,
        bot,
    }
        = useGame();

    const resetTimer = () => {
        setTimer(15);
    };

    useEffect(() => {
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        resetTimer();
        setQuestion(randomQuestion);
        setSelectedOption(null);

    }, []);

    useEffect(() => {
        if (showOptionResults) {
            resetTimer();
        } else {
            const interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [showOptionResults]);

    const handleBotAnswer = () => {
        const botOptions = [0, 1, 2, 3];
        const randomIndex = Math.floor(Math.random() * botOptions.length);
        const randomAnswerIndex = botOptions[randomIndex];
        const selectedOptionKey = String.fromCharCode(97 + randomAnswerIndex);
        setBotSelectedOption(selectedOptionKey);
        console.log(botSelectedOption);
    };

    useEffect(() => {
        if (timer > 0) {
            const timeout = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(timeout);
        } else {
            setShowOptionResults(true);
            setTimeout(() => setShowOptionResults(false), 15000);
        }
    }, [timer]);

    useEffect(() => {
        if (!showOptionResults) {
            handleBotAnswer();
        }
    }, [showOptionResults]);

    const handleOptionClick = (index: number) => {
        const selectedOptionKey = String.fromCharCode(97 + index);
        setSelectedOption(selectedOptionKey);
        evaluateAnswer();
    };

    const handleStartTimer = () => {
        setStartTime(Date.now());
    };

    const handleStopTimer = () => {
        if (startTime !== null) {
            setEndTime(Date.now());

        }
    };

    const evaluateAnswer = () => {
        if (selectedOption !== null && question !== null && botSelectedOption !== null) {

            if (selectedOption === question.answer && botSelectedOption === question.answer) {
                console.log('Remíza');
                setOptionWinner('DRAW')

            } else if (selectedOption !== question.answer && botSelectedOption === question.answer) {
                setOptionWinner(bot.username);
                console.log('BOT vyhrál:', botSelectedOption, 'hrac:', selectedOption)

            } else if (selectedOption === question.answer && botSelectedOption !== question.answer) {
                setOptionWinner(player.username);
                console.log('HRAC vyhrál:', selectedOption, 'hrac:', botSelectedOption)
            } else {
                setOptionWinner(null);
                setOptionWinner('NIKDO');
                console.log("Oba hráči udělali chybu");
            }
        } else if (timer < 0 && selectedOption === null && botSelectedOption !== null) {
            setOptionWinner(bot.username);
            console.log('Hráč neodpověděl včas' ,'hrac-->' , selectedOption, botSelectedOption, '<--bot',)
        }
        setStartTime(null);
        setEndTime(null);
    };


    return (
        <div className="dark--overlay">
            {showOptionResults && question !== null ? (
                <div className="question-card">
                    <div className="box box--top">
                        <div className="top--red"><p className="text--secondary text--s">{player.username}</p></div>
                        <div className="top--gold"><p className="text--secondary text--s">VS</p></div>
                        <div className="top--green"><p className="text--secondary text--s">{bot.username}</p></div>
                    </div>

                    <div className="box box--questions box--input">

                        <div className="answer--part">
                            <p className="text--secondary text--s">Správná odpověď</p>
                            <div className="answer--right">
                                <p className="text--secondary text--m">{question.answer}</p>
                            </div>
                        </div>

                        <div className="answer--part">
                            <div className="answer--flex">
                                <div className="answer--bg">
                                    <div className="answer answer--player">
                                        <p className="text--secondary text--m">{selectedOption}</p>
                                    </div>
                                    <div className="answer-desc">
                                        <p className="text--secondary text--xs">{player.username}</p>
                                        <p className="text--secondary text--xs">X</p>
                                    </div>
                                </div>

                                <div className="answer--bg">

                                    <div className="answer answer--bot">
                                        <p className="text--secondary text--m">{botSelectedOption}</p>
                                    </div>
                                    <div className="answer-desc">
                                        <p className="text--secondary text--xs">{bot.username}</p>
                                        <p className="text--secondary text--xs">X</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="answer answer--real">
                            <img src="/2023-p3a-mpa-react-project-adeladitrichova/public/images/crown.svg" alt="Crown"/>
                            <p className="text--secondary text--m">{optionWinner}</p>
                            <img src="/2023-p3a-mpa-react-project-adeladitrichova/public/images/crown.svg" alt="Crown"/>
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
                    <div className="box box--questions">
                        <p className="text--secondary text--m">{question?.text}</p>
                        <div className="box box--button-grid">

                            {question?.options[0] && Object.entries(question.options[0]).map(([key, value], index) => (
                                <button className="button button--secondary" key={key}
                                        onClick={() => handleOptionClick(index)}
                                        onFocus={handleStartTimer}
                                        onBlur={handleStopTimer}>
                                    <p className="text--m text--secondary">{value}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>)}
        </div>
    );
};

export default OptionQuestionCard;
