import './index.css'
import Rules from './pages/Rules.tsx';
import Game from "./pages/Game.tsx";
import Options from "./pages/Options.tsx";
import { ButtonRedirect } from './components/ButtonRedirect.tsx';
import { Outlet, Route, Routes, Link } from 'react-router-dom'


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={
          <div className="content">
            <div className="box box--titles">
              <h1>Dobyvatel</h1>
              <p className="text text--secondary">remaster</p>
            </div>
            <div className="box box--buttons">
              <Link className="a--full" to='/game' element={<Game />}><ButtonRedirect shadowColor="rgba(145, 31, 31, 1)" buttonText={"Hrát"} ></ButtonRedirect></Link>
              <Link className="a--full" to='/rules' element={<Rules />}><ButtonRedirect shadowColor="rgba(161, 128, 12, 1)" buttonText={"Pravidla"}></ButtonRedirect></Link>
              <Link className="a--full" to='/options' element={<Options />}><ButtonRedirect shadowColor="rgba(58, 148, 41, 1)" buttonText={"Možnosti"}></ButtonRedirect></Link>
              <Outlet />
            </div>
          </div>
        }>
        </Route>
        <Route path='/game' element={<Game />} />
        <Route path='/rules' element={<Rules />} />
        <Route path='/options' element={<Options />} />
      </Routes>
    </>
  )
}

export default App
