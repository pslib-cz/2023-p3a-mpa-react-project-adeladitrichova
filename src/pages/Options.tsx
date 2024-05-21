import React from 'react';
import {ButtonRedirect} from '../components/ButtonRedirect.tsx';
import {Outlet, Route, Routes, Link} from 'react-router-dom'
import App from "../App.tsx";


const Rules: React.FC = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={
                    <div className="content">
                        <div className="box box--buttons">
                            <Link to='/'><ButtonRedirect shadowColor="rgba(145, 31, 31, 1)" buttonText={"🏠︎"}
                                                         width={'100%'}></ButtonRedirect></Link>
                            < Outlet/>
                        </div>
                    </div>
                }>
                </Route>
                <Route path='/' element={<App/>}/>
            </Routes>
            <div className="box--info">
                <h1>Možnosti</h1>
                <p className="text--secondary text--s">Hmmm... Zde pro tebe zatím bohužel nic nemáme.</p>
            </div>
        </div>
    );
};

export default Rules;