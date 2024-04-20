import { useContext } from 'react';
import Map from "../components/Map"
import { ButtonRedirect } from '../components/ButtonRedirect.tsx';
import { Outlet, Route, Routes, Link } from 'react-router-dom'
import App from "../App.tsx";
import { actionGameTypes } from "../utils/GameReducer.tsx";
import { GameContext } from '../utils/GameContext.tsx';

const Game = () => {
    const { gameState, gameDispatch } = useContext(GameContext);
    const handleStartGame = () => {
        gameDispatch({ type: actionGameTypes.START_GAME });
    };

    return (
        <div>
            <Routes>
                <Route path='/' element={
                    <div className="content">
                        <div className="box box--buttons">
                            <Link to='/' element={<App />}><ButtonRedirect shadowColor="rgba(145, 31, 31, 1)" buttonText={"Domů"} ></ButtonRedirect></Link>
                            < Outlet />
                        </div>
                    </div>
                }>
                </Route>
                <Route path='/' element={<App />} />
            </Routes>

            {!gameState.gameStarted ? (
                <button onClick={handleStartGame}>Spustit hru</button>
            ) : (
                <div>
                    <Map></Map>
                </div>
            )}
        </div>
    );
}

export default Game;
