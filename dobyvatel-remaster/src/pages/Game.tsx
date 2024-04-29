import {useContext, useState} from 'react';
import Map from "../components/Map"
import {ButtonRedirect} from '../components/ButtonRedirect.tsx';
import {Outlet, Route, Routes, Link} from 'react-router-dom'
import App from "../App.tsx";
import {actionGameTypes} from "../utils/GameReducer.tsx";
import {GameContext} from '../utils/GameContext.tsx';
import PlayerCard from "../components/PlayerCard.tsx";
import PlayerForm from "../components/PlayerForm.tsx";
import { PlayerType } from '../utils/types.ts';


const Game = () => {
    const {gameState, gameDispatch} = useContext(GameContext);
    const handleStartGame = () => {
        gameDispatch({type: actionGameTypes.START_GAME});
    };

    const [player, setPlayer] = useState<PlayerType>({
        username: '',
        color: 'red',
        points: 0,
        base: 'Base 1',
        isPlaying: true,
    });

    return (
        <div>
            <Routes>
                <Route path='/' element={
                    <div className="content">
                        <div className="menu">
                            <Link to='/' element={<App/>}><ButtonRedirect shadowColor="rgba(145, 31, 31, 1)"
                                                                          buttonText={"🏠︎"} width={""}></ButtonRedirect></Link>
                            < Outlet/>
                        </div>
                    </div>
                }>
                </Route>
                <Route path='/' element={<App/>}/>
            </Routes>

            {!gameState.gameStarted ? (
                <>
                <PlayerForm player={player} setPlayer={setPlayer} />
                    <button onClick={handleStartGame}>Spustit hru</button>
                </>
            ) : (
                <div>
                    <PlayerCard player={player} />
                    <Map></Map>
                </div>
            )}
        </div>
    );
}

export default Game;
