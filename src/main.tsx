import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {GameProvider} from "./utils/GameContext.tsx";

const baseUrl = "/2023-p3a-mpa-react-project-adeladitrichova/";
const rootElement = document.getElementById('root');
// @ts-ignore
const root = createRoot(rootElement);

root.render(
    <GameProvider>
        <BrowserRouter basename={baseUrl}>
            <App/>
        </BrowserRouter>
    </GameProvider>
);

//serviceWorkerRegistration.unregister();
//reportWebVitals();