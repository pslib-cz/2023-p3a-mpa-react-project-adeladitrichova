import React from 'react';
import { PlayerType, BotType } from '../utils/types';

interface PlayerCardProps {
    player: PlayerType;
    bot: BotType;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, bot }) => {
    return (
        <div className="box--flex">
        <div className="card--player">
            <div className="top--player">
                <p className="text text--secondary text--xs">{player.username}</p>
            </div>
            <div className="box--player">
                <img src="../../public/images/crown.svg" alt="Crown" />
                <div className="box--points"><p className="text text--secondary text--xs">{player.points}</p></div>
            </div>
        </div>
            <div className="card--player">
                <div className="top--player">
                    <p className="text text--secondary text--xs">{bot.username}</p>
                </div>
                <div className="box--player">
                    <img src="../../public/images/crown.svg" alt="Crown" />
                    <div className="box--points"><p className="text text--secondary text--xs">{bot.points}</p></div>
                </div>
            </div>
        </div>
    );
};

export default PlayerCard;
