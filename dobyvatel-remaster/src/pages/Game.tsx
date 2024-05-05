import Map from "../components/Map"
import {ButtonRedirect} from '../components/ButtonRedirect.tsx';
import {Outlet, Route, Routes, Link} from 'react-router-dom'
import App from "../App.tsx";
import {actionGameTypes} from "../utils/GameReducer.tsx";
import {useGame} from '../utils/GameContext.tsx';
import PlayerCard from "../components/PlayerCard.tsx";
import PlayerForm from "../components/PlayerForm.tsx";
import InputQuestionCard from "../components/InputQuestionCard.tsx";
import {useEffect, useState} from "react";

//CONTEXT
const Game = () => {
    const [showQuestion, setShowQuestion] = useState(false);
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
    } = useGame();

    //ARRAY
    const randomItemFromArray = (array: any[]): any => {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    };

    // BASE CHOOSING
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

    // Inside your Game.tsx

    const getRegion = () => {
        const playerRegion = selectedRegion;
        const botRegion = randomItemFromArray(regions.filter((region) => region.owner === null))

        if (inputWinner === player.username) {
            setPlayer(prevPlayer => ({...prevPlayer, points: prevPlayer.points +200}));
            setRegions(prevRegions => prevRegions.map(region => {
                if (region.id === playerRegion) {
                    return {...region, owner: player.username, fill: player.color};
                }
                return region;
            }));
        }

        else if (inputWinner === bot.username) {
            setBot(prevBot => ({...prevBot, points: prevBot.points +200}));
            setRegions(prevRegions => prevRegions.map(region => {
                if (region.id === botRegion.id) {
                    return {...region, owner: bot.username, fill: bot.color};
                }
                return region;
            }));
        }
    };


    //START GAME
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

    useEffect(() => {
        if (showInputResults) {
            const timer = setTimeout(() => {
                setShowQuestion(false);
                setGamePhase('REGION_SELECT');
            }, 5000);
            return () => clearTimeout(timer);
        }
        console.log('VYHERCE:', inputWinner);
        getRegion();
        setInputWinner(null);
        console.log('VYHERCE vynul:', inputWinner);
    }, [showInputResults]);




    return (
        <div>
            <Routes>
                <Route path='/' element={
                    <div className="content">
                        <div className="menu">
                            <Link to='/' element={<App/>}><ButtonRedirect shadowColor="rgba(145, 31, 31, 1)"
                                                                          buttonText={"🏠︎"}
                                                                          width={""}></ButtonRedirect></Link>
                            < Outlet/>
                        </div>
                    </div>
                }>
                </Route>
                <Route path='/' element={<App/>}/>
            </Routes>

            {!gameState.gameStarted ? (
                <>
                    <PlayerForm player={player} setPlayer={setPlayer}/>
                    <button onClick={handleStartGame}>Spustit hru</button>
                </>
            ) : (
                <div>
                    {}
                    {showQuestion && <InputQuestionCard/>}
                    <PlayerCard player={player} bot={bot}/>
                    <Map></Map>
                </div>
            )}
        </div>
    );

}
export default Game;