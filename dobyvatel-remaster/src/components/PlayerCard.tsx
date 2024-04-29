import React from 'react';
import { PlayerType } from '../utils/types';

interface PlayerCardProps {
    player: PlayerType;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
    return (
        <div className="card--player">
            <div className="top--player">
                <p className="text text--secondary text--xs">{player.username}</p>
            </div>
            <div className="box--player">
                <img src="../../public/images/crown.svg" alt="Crown" />
                <div className="box--points"><p className="text text--secondary text--xs">1500</p></div>
            </div>
        </div>
    );
};

export default PlayerCard;
