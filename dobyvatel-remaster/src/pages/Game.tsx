import { useContext, useState } from 'react';
import Map from "../components/Map"
import { ButtonRedirect } from '../components/ButtonRedirect.tsx';
import { Outlet, Route, Routes, Link } from 'react-router-dom'
import App from "../App.tsx";
import { actionGameTypes } from "../utils/types.ts";
import { GameContext } from '../utils/GameContext.tsx';
import PlayerCard from "../components/PlayerCard.tsx";
import PlayerForm from "../components/PlayerForm.tsx";
import { BotType, PlayerType } from '../utils/types.ts';
import { regions, setRegions } from '../utils/GameContext.tsx';

//CONTEXT
const Game = () => {
    const gameContext = useContext(GameContext);
    if (!gameContext) {
        // Handle the case where gameContext is undefined
        console.error("GameContext is not provided");
        return null;
    }
    const { gameState, gameDispatch } = gameContext;

    //USER & BOT
    const [player, setPlayer] = useState<PlayerType>({
        username: '',
        points: 0,
        base: '',
        isPlaying: false,
        color: 'red'
    });
    const [bot] = useState<BotType>({ username: 'BOT', points: 0, base: '', isPlaying: false, color: 'green' });

    //ARRAY
    const randomItemFromArray = (array: any[]): any => {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    };

    // BASE CHOOSING
    const getBase = () => {
        const playerBase = randomItemFromArray(regions)
        const botBase = randomItemFromArray(regions.filter((region) => region.id !== playerBase.id))
        setRegions((prevRegions) => prevRegions.map((region) => {
            if (region.id === playerBase.id) {
                return { ...region, owner: player.username, lives: 3, fill: player.color };
            }
            if (region.id === botBase.id)
                return { ...region, owner: bot.username, lives: 3, fill: bot.color };
            return region;
        }));
    };

    //START GAME
        const handleStartGame = () => {
            gameDispatch({
                type: actionGameTypes.START_GAME,
                payload: ''
            });
            getBase();

        };


        return (
            <div>
                <Routes>
                    <Route path='/' element={
                        <div className="content">
                            <div className="menu">
                                <Link to='/' element={<App />}><ButtonRedirect shadowColor="rgba(145, 31, 31, 1)"
                                    buttonText={"🏠︎"} width={""}></ButtonRedirect></Link>
                                < Outlet />
                            </div>
                        </div>
                    }>
                    </Route>
                    <Route path='/' element={<App />} />
                </Routes>

                {!gameState.gameStarted ? (
                    <>
                        <PlayerForm player={player} setPlayer={setPlayer} />
                        <button onClick={handleStartGame}>Spustit hru</button>
                    </>
                ) : (
                    <div>
                        <PlayerCard player={player} bot={bot} />
                        <Map id={''} d={''} fill={''} range={[]} owner={null} lives={0}></Map>
                    </div>
                )}
            </div>
        );
    }

    export default Game;