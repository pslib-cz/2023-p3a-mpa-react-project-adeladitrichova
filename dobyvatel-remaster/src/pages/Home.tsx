import {ButtonRedirect} from "../components/ButtonRedirect.tsx";

function Home() {
    return (
        <div className="content">
            <div className="box box--titles">
                <h1>Dobyvatel</h1>
                <p className="text text--secondary">remaster</p>
            </div>
            <div className="box box--buttons">
                <ButtonRedirect shadowColor="rgba(145, 31, 31, 1)" buttonText={"Hrát"} ></ButtonRedirect>
                <ButtonRedirect shadowColor="rgba(161, 128, 12, 1)" buttonText={"Pravidla"}></ButtonRedirect>
                <ButtonRedirect shadowColor="rgba(58, 148, 41, 1)" buttonText={"Možnosti"}></ButtonRedirect>
            </div>
        </div>
    )
}

export default Home
