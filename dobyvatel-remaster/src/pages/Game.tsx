import Map from "../components/Map"
import { ButtonRedirect } from '../components/ButtonRedirect.tsx';
import { Outlet, Route, Routes, Link } from 'react-router-dom'
import App from "../App.tsx";

function Game() {
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

            <h1>Game</h1>
            <Map></Map>

        </div>

    )
}

export default Game
