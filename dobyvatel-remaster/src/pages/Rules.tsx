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
                        <div className="menu">
                            <Link to='/' element={<App/>}><ButtonRedirect shadowColor="rgba(145, 31, 31, 1)"
                                                                          buttonText={"🏠︎"}
                                                                          width={'100%'}></ButtonRedirect></Link>
                            < Outlet/>
                        </div>
                    </div>
                }>
                </Route>
                <Route path='/' element={<App/>}/>
            </Routes>
            <div className="box--info">
                <h1>pravidla</h1>
                <div>
                    <p className="text--secondary text--s">I. Výběr základny</p>
                    <p className="text--secondary text--xs">Hráči obdrží jako základnu náhodně vybrané území.</p>
                </div>
                <div>
                    <p className="text--secondary text--s">II. Dobývání</p>
                    <p className="text--secondary text--xs">V každé bitvě je hráčům položena společná tipovací otázka.
                        Vítěz
                        si
                        vybere území. Takto získaná území mají hodnotu 200 bodů. Toto kolo trvá
                        tak dlouho, dokud jsou k dispzici volná území.
                    </p>
                </div>
                <div>
                    <p className="text--secondary text--s">III. Bitva</p>
                    <p className="text--secondary text--xs">Bitva má 4 kola a v každém kole hrají 2 hráči. Se střídají a
                        mají možnost útočit na jakékoliv pole protivníka. Pokud útočník napadeného porazí, získává jeho
                        území a 400 bodů, kdežto poraženému se odečte hodnota jeho území. Pokud je útok veden na
                        základnu, musí útočník 3x vyhrát nad napadeným. Hráči dostávají otázky na možnosti. V případě
                        remízy se spustí tipovací otázka.</p>
                </div>
            </div>
        </div>
    );
};

export default Rules;