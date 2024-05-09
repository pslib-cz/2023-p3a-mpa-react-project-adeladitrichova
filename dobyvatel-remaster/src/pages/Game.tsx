import Map from "../components/Map"
import {ButtonRedirect} from '../components/ButtonRedirect.tsx';
import {Outlet, Route, Routes, Link} from 'react-router-dom'
import App from "../App.tsx";
import {actionGameTypes} from "../utils/GameReducer.tsx";
import {useGame} from '../utils/GameContext.tsx';
import PlayerCard from "../components/PlayerCard.tsx";
import PlayerForm from "../components/PlayerForm.tsx";
/*
import InputQuestionCard from "../components/InputQuestionCard.tsx";
*/
import {useState, useEffect} from "react";
import OptionQuestionCard from "../components/OptionQuestionCard.tsx";

const Game = () => {
    const [showQuestion, setShowQuestion] = useState(false);
    const [displayNextQuestion, setDisplayNextQuestion] = useState(false)

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

    /*    const attackRegion = () => {
            const Attacker = '';
            const attackedByPlayerRegion = selectedRegion;
            const attackedByBotRegion = randomItemFromArray(regions.filter((region) => region.owner === player.username))

            if (Attacker === player.username) {
                setPlayer(prevPlayer => ({...prevPlayer, points: prevPlayer.points + 200}));

                setRegions(prevRegions => prevRegions.map(region => {
                    if (region.id === attackedByPlayerRegion && region.owner === bot.username) {
                        return {...region, lives: region.lives - 1};
                    } else if (region.id === attackedByBotRegion && region.owner === player.username && winner === bot.username) {
                        return {...region, lives: 1, owner: bot.username, fill: bot.color};
                    }
                    return region;
                }));

            } else if (Attacker === bot.username) {
                setBot(prevBot => ({...prevBot, points: prevBot.points + 200}));
                setRegions(prevRegions => prevRegions.map(region => {
                    if (region.id === attackedByBotRegion && region.owner === player.username) {
                        return {...region, lives: region.lives - 1};
                    } else if (region.id === attackedByBotRegion && region.owner === player.username && winner === bot.username) {
                        return {...region, lives: 1, owner: bot.username, fill: bot.color};
                    }
                    return region;
                }));
            }
        }*/

    //START GAME
    const handleStartGame = () => {
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
    }, [gamePhase, showQuestion, regions]);

    useEffect(() => {

    }, [gamePhase === 'ATTACK']);


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
                    {showQuestion && <OptionQuestionCard />}
                    {gamePhase === 'BASE_SELECT' && <div className="box--phase">
                        <p className="text--secondary text--s">Přiřazení základen...</p>
                    </div>}

                    {gamePhase === 'INPUT_QUESTION' && <div className="box--phase">
                        <div>otazka ahoj</div>
                    </div>
                    }

                    {gamePhase === 'PARTITION' && <div className="box--phase">
                        <p className="text--secondary text--s">Dobývání</p>
                    </div>}

                    {gamePhase === 'REGION_SELECT' && (
                        <div className="box--phase">
                            {inputWinner === player.username ? (
                                <div>
                                    <p className="text--secondary text--s">{inputWinner} vybírá kraj...</p>
                                    <p className="text--secondary text--xs">Zvolený kraj: {selectedRegion}</p>
                                </div>
                            ) : inputWinner === bot.username ? (
                                <div>
                                    <p className="text--secondary text--s">{inputWinner} vybírá kraj...</p>
                                    <p className="text--secondary text--xs">Zvolený kraj: {}</p>
                                </div>
                            ) : (
                                <div>
                                    <p className="text--secondary text--s">Kraje zvoleny...</p>
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