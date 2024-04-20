import React from 'react';
import { PlayerType } from '../utils/types';

type PlayerCardProps = {
    player: PlayerType;
};

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
    return (
        <div>
            <h2>{player.username}</h2>
            <p>Body: {player.points}</p>
            <p>Základna: {player.base}</p>
            <p>Hraje: {player.isPlaying ? 'Ano' : 'Ne'}</p>
        </div>
    );
};

export default PlayerCard;
