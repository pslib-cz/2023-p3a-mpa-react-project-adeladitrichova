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
              <p className="text text--secondary text--l">remaster</p>
            </div>
            <div className="box box--buttons">
              <Link className="link--full" to='/game' ><ButtonRedirect shadowColor="rgba(145, 31, 31, 1)" buttonText={"Hrát"} width={"100%"} ></ButtonRedirect></Link>
              <Link className="link--full" to='/rules' ><ButtonRedirect shadowColor="rgba(161, 128, 12, 1)" buttonText={"Pravidla"} width={"100%"}></ButtonRedirect></Link>
              <Link className="link--full" to='/options'><ButtonRedirect shadowColor="rgba(58, 148, 41, 1)" buttonText={"Možnosti"} width={"100%"}></ButtonRedirect></Link>
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
