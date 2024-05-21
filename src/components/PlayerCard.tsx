import React from 'react';
import {useGame} from "../utils/GameContext.tsx";

const PlayerCard: React.FC = () => {

    const {
        player,
        bot,
    } = useGame();

    return (
        <div className="box--flex">
            <div className="card--player">
                <div className="top--player top--player--red">
                    <p className="text text--secondary text--xs">{player.username}</p>
                </div>
                <div className="box--player">
                    <img src="./images/crown.svg" alt="Crown"/>
                    <div className="box--points"><p className="text text--secondary text--xs">{player.points}</p></div>
                </div>
            </div>
            <div className="card--player">
                <div className="top--player top--player--green">
                    <p className="text text--secondary text--xs">{bot.username}</p>
                </div>
                <div className="box--player">
                    <img src="./images/crown.svg" alt="Crown"/>
                    <div className="box--points"><p className="text text--secondary text--xs">{bot.points}</p></div>
                </div>
            </div>
        </div>
    );
};

export default PlayerCard;
