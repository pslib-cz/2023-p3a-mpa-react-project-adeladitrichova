import Map from "../components/Map"
import {ButtonRedirect} from '../components/ButtonRedirect.tsx';
import {Outlet, Route, Routes, Link} from 'react-router-dom'
import App from "../App.tsx";
import {actionGameTypes} from "../utils/GameReducer.tsx";
import {useGame} from '../utils/GameContext.tsx';
import PlayerCard from "../components/PlayerCard.tsx";
import PlayerForm from "../components/PlayerForm.tsx";
import InputQuestionCard from "../components/InputQuestionCard.tsx";
import React, {useState, useEffect} from "react";
import OptionQuestionCard from "../components/OptionQuestionCard.tsx";

const Game = () => {
    const [showQuestion, setShowQuestion] = useState(false);
    const [showOptionQuestionLocal, setShowOptionQuestionLocal] = useState(false);
    const [displayNextQuestion, setDisplayNextQuestion] = useState(false)
    const [botChoosenRegion, setBotChoosenRegion] = useState(null);
    const [rounds, setRounds] = useState(0);
    const [gameWinner, setGameWinner] = useState('');

    const {
        gameState,
        gameDispatch,
        regions,
        setRegions,
        player,
        setPlayer,
        bot,
        setBot,
        gamePhase,
        setGamePhase,
        inputWinner,
        setInputWinner,
        showInputResults,
        selectedRegion,
        setShowInputResults,
        optionWinner,
        setOptionWinner,
        setShowOptionResults,
        showOptionResults,
    } = useGame();

    const randomItemFromArray = (array: any[]): any => {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    };

    const getBase = () => {
        const playerBase = randomItemFromArray(regions);
        const botBase = randomItemFromArray(regions.filter((region) => region.id !== playerBase.id))
        setPlayer(prevPlayer => ({...prevPlayer, points: +1000}));
        setBot(prevBot => ({...prevBot, points: +1000}));

        setRegions((prevRegions) => prevRegions.map((region) => {
            if (region.id === playerBase.id) {
                return {...region, owner: player.username, lives: 3, fill: player.baseColor,};
            }
            if (region.id === botBase.id)
                return {...region, owner: bot.username, lives: 3, fill: bot.baseColor};
            return region;
        }));
    };

    const getRegion = () => {
        const botRegion = randomItemFromArray(regions.filter((region) => region.owner === null))

        if (inputWinner === player.username) {
            setPlayer(prevPlayer => ({...prevPlayer, points: prevPlayer.points + 200}));
            const playerRegion = selectedRegion;
            setRegions(prevRegions => prevRegions.map(region => {
                if (region.id === playerRegion) {
                    return {...region, owner: player.username, fill: player.color};
                }
                return region;
            }));
        } else if (inputWinner === bot.username) {
            setBot(prevBot => ({...prevBot, points: prevBot.points + 200}));
            setRegions(prevRegions => prevRegions.map(region => {
                if (region.id === botRegion.id) {
                    return {...region, owner: bot.username, fill: bot.color};
                }
                return region;
            }));
        }
    };

    const botSelectAttackRegion = () => {
        const botOwnedRegions = regions.filter(region => region.owner === player.username);
        if (botOwnedRegions.length > 0) {
            const botAttackRegion = randomItemFromArray(botOwnedRegions);
            setBotChoosenRegion(botAttackRegion.id);
        }
    };


    const handleAttack = () => {
        if (gamePhase === 'PLAYER_ATTACK') {
            const playerRegion = selectedRegion;
            let botRegionsChanged = false;
            if (optionWinner === player.username) {
                setRegions(prevRegions => prevRegions.map(region => {
                    if (region.id === playerRegion && region.owner === bot.username && region.lives === 1) {
                        setPlayer(prevPlayer => ({...prevPlayer, points: prevPlayer.points + 400}));
                        setBot(prevBot => ({...prevBot, points: prevBot.points - 200}));
                        return {...region, owner: player.username, fill: player.color};
                    } else if (region.id === playerRegion && region.owner === bot.username && region.lives > 1) {
                        if (region.lives > 0) {
                            return {...region, lives: region.lives - 1};
                        } else if (region.lives === 0) {
                            botRegionsChanged = true;
                        } else {
                            console.log('asi by nemelo byt nic no')

                        }
                    }
                    return region;
                }));
                if (botRegionsChanged) {
                    setRegions(prevRegions => prevRegions.map(region => {
                        if (region.owner === bot.username) {
                            return {...region, owner: player.username, fill: player.color};
                        }
                        return region;
                    }));
                } else {
                    console.log('bot regions nechangujou cs')
                }
            } else if (optionWinner === bot.username) {
                setBot(prevBot => ({...prevBot, points: prevBot.points + 100}));

            } else if (optionWinner === 'DRAW') {
                console.log('asi remiza')
            } else if (optionWinner !== bot.username && optionWinner !== player.username) {
                console.log('tupy oba jsou frfr PLAYER_ATTACK')
                setGamePhase('BOT_ATTACK')
            }

        } else if (gamePhase === 'BOT_ATTACK') {
            if (optionWinner === bot.username) {
                setRegions(prevRegions => prevRegions.map(region => {
                    if (region.id === botChoosenRegion) {
                        setBot(prevBot => ({...prevBot, points: prevBot.points + 400}));
                        setPlayer(prevPlayer => ({...prevPlayer, points: prevPlayer.points - 200}));
                        return {...region, owner: bot.username, fill: bot.color};
                    }
                    return region;
                }));

            } else if (optionWinner === player.username) {
                setPlayer(prevPlayer => ({...prevPlayer, points: prevPlayer.points + 100}));

            } else if (optionWinner === 'DRAW') {
                console.log('asi remiza bot');
            } else if (optionWinner !== bot.username && optionWinner !== player.username) {
                console.log('tupy oba jsou frfr, NIC?', gamePhase);
                setGamePhase('PLAYER_ATTACK')
            }
        }
    };

    const calculateWinner = () => {
        const playerPoints = player.points;
        const botPoints = bot.points;

        if (playerPoints > botPoints) {
            setGameWinner(player.username);
        } else if (playerPoints < botPoints) {
            setGameWinner(bot.username);
        } else {
            setGameWinner('Remíza!');
        }

    }

    //REAL!!
    /*    const handleStartGame = () => {
            setGamePhase('PARTITION');
            gameDispatch({
                type: actionGameTypes.START_GAME,
                payload: ''
            });
            getBase();
        };

        useEffect(() => {
            if (gameState.gameStarted && gamePhase === 'PARTITION') {
                console.log(gamePhase, 'momentalni hra faze by mela byt partition')
                setShowInputResults(false);
                // Show question after 5 seconds
                setTimeout(() => {
                    setShowQuestion(true);
                }, 5000);
            }
        }, [gameState.gameStarted, gamePhase, displayNextQuestion]);

        useEffect(() => {
            if (showInputResults) {
                // If input results are shown, hide question after 5 seconds
                const timer = setTimeout(() => {
                    setShowQuestion(false);
                    setGamePhase('REGION_SELECT');
                }, 5000);
                return () => clearTimeout(timer);
            }

            if (!showQuestion && gamePhase === 'REGION_SELECT') {
                console.log(gamePhase, 'momentalni hra faze by mela byt region select')
                console.log(selectedRegion, 'selected region GAME')
                console.log('VYHERCE:', inputWinner);
                getRegion();
                setInputWinner(null);
                console.log('VYHERCE vynul:', inputWinner);

                // After 15 seconds, switch back to PARTITION phase
                setTimeout(() => {
                    console.log(selectedRegion, inputWinner, '4selected region GAME4')
                    setGamePhase('PARTITION');
                    console.log(gamePhase, 'byt partition')
                    setShowQuestion(true);
                }, 10000);
            }
        }, [showInputResults, showQuestion, gamePhase]);

        useEffect(() => {

            if (gamePhase === 'REGION_SELECT' && !showQuestion) {

                const unownedRegions = regions.filter(region => region.owner === null);
                if (unownedRegions.length === 0) {
                    console.log('PLNO!!!')
                    setGamePhase('ATTACK');
                    setDisplayNextQuestion(false);
                    console.log(gamePhase)

                } else {
                    console.log('NENI PLNO!!!')

                    setDisplayNextQuestion(true);
                }
            }
        }, [gamePhase, showQuestion, regions]); */

    //SHORTER VERSION!!
    const handleStartGame = () => {
        setGamePhase('PARTITION');
        gameDispatch({
            type: actionGameTypes.START_GAME,
            payload: ''
        });
        getBase();
        setTimeout(() => {
            setShowQuestion(true);
        }, 5000);
    };

    const handleEndGame = () => {
        window.location.reload();
        gameDispatch({
            type: actionGameTypes.END_GAME,
            payload: ''
        })
    }

    useEffect(() => {
        console.log('to by se nemelo spustit no')
        if (showInputResults) {
            const timer = setTimeout(() => {
                setShowQuestion(false);
                setGamePhase('REGION_SELECT');
            }, 5000);
            return () => clearTimeout(timer);
        }
        console.log('VYHERCE:', inputWinner);
        console.log(gameState, 'gameState')
        getRegion();
        setInputWinner(null);
        console.log('VYHERCE vynul:', inputWinner);
        setGamePhase('PLAYER_ATTACK');
    }, [gameState.gameStarted && showInputResults]);


    //ATTACK --> PLAYER
    useEffect(() => {
        if (gameState.gameStarted && gamePhase === 'PLAYER_ATTACK' && optionWinner !== 'DRAW') {
            console.log('PRVNI PLAYER USEEFFECT KOLA:', rounds)
            setRounds(prevRounds => prevRounds + 1);
            if (rounds < 8) {
                if (gamePhase === 'PLAYER_ATTACK') {
                    console.log(gamePhase, 'momentalni hra faze by mela byt PLAYER!! ATTACK')

                    setTimeout(() => {
                        setShowOptionQuestionLocal(true);
                    }, 5000);
                }
            } else {
                setGamePhase('END_GAME');
                calculateWinner();
                console.log('KONEC HRY', gamePhase);
            }
        } else {
            console.log('NIC SE NEMA DIT!!')
        }
    }, [gamePhase === 'PLAYER_ATTACK']);

    useEffect(() => {
        console.log('DRUHY PLAYER USEEFFECT KOLA:', rounds)
        if (showOptionResults && gameState.gameStarted) {
            const timer = setTimeout(() => {
                setShowOptionQuestionLocal(false);
            }, 5000);
            return () => clearTimeout(timer);
        } else if (gameState.gameStarted) {
            console.log('VYHERCE:', optionWinner);
            setTimeout(() => {
                console.log(gamePhase, 'HANDLE ATTACK')
                handleAttack();
            }, 2000)
            console.log(gamePhase, 'HALOOOO')
            setGamePhase('BOT_ATTACK');
            console.log(gamePhase, 'BOT??? OR SUM')
        } else {
            console.log('negrovina vymrdana')
        }
    }, [showOptionResults && gamePhase === 'PLAYER_ATTACK']);


    //ATTACK --> BOT
    useEffect(() => {
        console.log('1')
        if (gameState.gameStarted && gamePhase === 'BOT_ATTACK') {
            setRounds(prevRounds => prevRounds + 1);
            console.log('PRVNI BOT USEEFFECT KOLA:', rounds)
            if (rounds < 8) {
                console.log('under rounds')
                if (gamePhase === 'BOT_ATTACK') {
                    console.log('3', gamePhase)
                    console.log(gamePhase, 'momentalni hra faze by mela byt BOT!! ATTACK')
                    setTimeout(() => {
                        setShowOptionQuestionLocal(true);
                        console.log('4', gamePhase);
                    }, 5000);
                }
            } else {
                setGamePhase('END_GAME');
                calculateWinner();
            }
        } else {
            console.log('prvni bot useEffect, nic se nema dit')
        }
    }, [gamePhase === 'BOT_ATTACK']);

    useEffect(() => {
        botSelectAttackRegion();
        console.log('DRUHY BOT USEEFFECT KOLA:', rounds)
        if (showOptionResults && gamePhase === 'BOT_ATTACK') {
            const timer = setTimeout(() => {
                setShowOptionQuestionLocal(false);
            }, 5000);
            return () => clearTimeout(timer);
        } else if (gamePhase === 'BOT_ATTACK' && gameState.gameStarted) {
            console.log('VYHERCE:', optionWinner);
            setTimeout(() => {
                handleAttack();
            }, 2000)
            setGamePhase('PLAYER_ATTACK');
        } else {
            console.log('BOT DRUHY USEFFECT KYS')
        }
    }, [showOptionResults && gamePhase === 'BOT_ATTACK']);

        //PLAYER DRAW
        useEffect(() => {
            if (gamePhase === 'PLAYER_DRAW') {
                setTimeout(() => {
                    setShowQuestion(true);
                }, 5000);
            } else {
                console.log('remiza nema nic delat cs')
            }
        }, [gamePhase === 'PLAYER_DRAW']);

        useEffect(() => {
            console.log('part 2 i guess')
            if (showInputResults && gamePhase === 'PLAYER_DRAW') {
                const timer = setTimeout(() => {
                    setShowQuestion(false);
                }, 5000);
                return () => clearTimeout(timer);
            }
            else if (gameState.gameStarted) {
                console.log('VYHERCE:', inputWinner);
                setOptionWinner(inputWinner);
                setTimeout(() => {
                    handleAttack();
                }, 2000)
                setGamePhase('BOT_ATTACK');
            }
            else {
                console.log('remiza nema nic delat cs22222')
            }
        }, [showInputResults && gamePhase === 'PLAYER_DRAW']);

    return (
        <div>
            <Routes>
                <Route path='/' element={
                    <div className="content">
                        <div className="menu">
                            <Link to='/' element={<App/>}>
                                <ButtonRedirect shadowColor="rgba(145, 31, 31, 1)"
                                                buttonText={"🏠︎"}
                                                width={""}></ButtonRedirect></Link>
                            <Outlet/>
                        </div>
                    </div>
                }>
                </Route>
                <Route path='/' element={<App/>}/>
            </Routes>
            {!gameState.gameStarted ? (
                <>
                    <PlayerForm player={player} setPlayer={setPlayer}/>
                    <button onClick={handleStartGame} className="button button--secondary"><p
                        className="text--secondary text--s">Spustit hru</p></button>
                </>
            ) : (
                <div>
                    {showQuestion && <InputQuestionCard/>}
                    {showOptionQuestionLocal && <OptionQuestionCard/>}

                    {gamePhase === 'BASE_SELECT' && <div className="answer--top">
                        <div className="answer answer--gold">
                            <p className="text--secondary text--s">Přiřazení základen</p>
                        </div>
                        <div className="answer-desc">
                            <p className="text--secondary text--xs">Náhodné přidělení...</p>
                            <p className="text--secondary text--xs">X</p>
                        </div>
                    </div>}

                    {gamePhase === 'PARTITION' && <div className="answer--top">
                        <div className="answer answer--gold">
                            <p className="text--secondary text--s">Dobývaní</p>
                        </div>
                        <div className="answer-desc">
                            <p className="text--secondary text--xs">Dobývání</p>
                            <p className="text--secondary text--xs">X</p>
                        </div>
                    </div>}

                    {gamePhase === 'PLAYER_ATTACK' &&

                        <div className="answer--top">
                            <div className="answer answer--gold">
                                <p className="text--secondary text--s">BITVA</p>
                            </div>
                            <div className="answer-desc">
                                <p className="text--secondary text--xs">Tah {player.username}</p>
                                <p className="text--secondary text--xs">na území: {selectedRegion}</p>
                            </div>
                        </div>}

                    {gamePhase === 'BOT_ATTACK' &&

                        <div className="answer--top">
                            <div className="answer answer--gold">
                                <p className="text--secondary text--s">BITVA</p>
                            </div>
                            <div className="answer-desc">
                                <p className="text--secondary text--xs">Tah {bot.username}</p>
                                <p className="text--secondary text--xs">na území: {botChoosenRegion}</p>
                            </div>
                        </div>
                    }

                    {gamePhase === 'END_GAME' &&
                        <div className="dark--overlay">
                        <div className="question-card">
                            <div className="box box--questions box--input">
                            <p className="text--secondary text--l">KONEC HRY</p>
                            <div className="answer answer--real answer--full">
                                <img src="../../public/images/crown.svg" alt="Crown"/>
                                <p className="text--secondary text--m">{gameWinner}</p>
                                <img src="../../public/images/crown.svg" alt="Crown"/>
                            </div>
                            <div className="answer--flex">
                                <div className="answer--bg">
                                    <div className="answer answer--player">
                                        <p className="text--secondary text--m">{player.points}</p>
                                    </div>
                                    <div className="answer-desc">
                                        <p className="text--secondary text--xs">{player.username}</p>
                                        <p className="text--secondary text--xs">X</p>
                                    </div>
                                </div>
                                <div className="answer--bg">
                                    <div className="answer answer--bot">
                                        <p className="text--secondary text--m">{bot.points}</p>
                                    </div>
                                    <div className="answer-desc">
                                        <p className="text--secondary text--xs">{bot.username}</p>
                                        <p className="text--secondary text--xs">X</p>
                                    </div>
                                </div>
                            </div>
                            <button onClick={handleEndGame} className="button button--secondary"><p
                                className="text--secondary text--s">Ukončit hru</p></button>
                            </div>
                        </div>
                        </div>
                    }

                    {gamePhase === 'REGION_SELECT' && (
                        <div className="answer--top">
                            {inputWinner === player.username && selectedRegion !== null ? (
                                <div>
                                    <div className="answer answer--gold">
                                        <p className="text--secondary text--s">{inputWinner} vybírá kraj...</p>
                                    </div>
                                    <div className="answer-desc">
                                        <p className="text--secondary text--xs">Zvolený kraj:</p>
                                        <p className="text--secondary text--xs">{selectedRegion}</p>
                                    </div>
                                </div>
                            ) : inputWinner === player.username ? (
                                <div>
                                    <div className="answer answer--gold">
                                        <p className="text--secondary text--s">{inputWinner} vybírá kraj...</p>
                                    </div>
                                    <div className="answer-desc">
                                        <p className="text--secondary text--xs">Zvolený kraj:</p>
                                        <p className="text--secondary text--xs"><span
                                            className="loader"></span></p>
                                    </div>
                                </div>
                            ) : inputWinner === bot.username ? (
                                    <div>
                                        <div className="answer answer--gold">
                                            <p className="text--secondary text--s">{inputWinner} vybírá kraj...</p>
                                        </div>
                                        <div className="answer-desc">
                                            <p className="text--secondary text--xs">Zvolený kraj:</p>
                                            <p className="text--secondary text--xs"><span
                                                className="loader"></span></p>
                                        </div>
                                    </div>
                            ) : (
                                <div>
                                    <div className="answer answer--gold">
                                        <p className="text--secondary text--s">Kraje zvoleny</p>
                                    </div>
                                    <div className="answer-desc">
                                        <p className="text--secondary text--xs">X</p>
                                        <p className="text--secondary text--xs">X</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <PlayerCard player={player} bot={bot}/>
                    <Map></Map>
                </div>
            )}
        </div>
    );
}
export default Game;