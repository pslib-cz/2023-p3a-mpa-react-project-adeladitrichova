import Map from "../components/Map"
import { ButtonRedirect } from '../components/ButtonRedirect.tsx';
import { Outlet, Route, Routes, Link } from 'react-router-dom'
import App from "../App.tsx";
import { actionGameTypes } from "../utils/types.ts";
import { useReducer } from 'react';

const gameReducer = (state, action) => {
    switch (action.type) {
        case actionGameTypes.START_GAME:
            return { ...state, gameStarted: true };
        default:
            return state;
    }
};

const initialGameState = {
    gameStarted: false,
};




const Game = () => {
    const [state, dispatch] = useReducer(gameReducer, initialGameState);

    const startGame = () => {
        dispatch({ type: actionGameTypes.START_GAME });
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

            {!state.gameStarted ? (
                <button onClick={startGame}>Start Game</button>
            ) : (
                <div>
                    <Map></Map>

                </div>
            )}
        </div>
    );
}

export default Game;
