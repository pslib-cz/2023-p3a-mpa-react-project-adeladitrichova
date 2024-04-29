import React, { useState } from 'react';
import { PlayerType } from '../utils/types';

interface PlayerFormProps {
    player: PlayerType;
    setPlayer: (player: PlayerType) => void;
}

const PlayerForm: React.FC<PlayerFormProps> = ({ player, setPlayer }) => {
    const [name, setName] = useState(player.username);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setPlayer({ ...player, username: name });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Player Name:
                <input type="text" value={name} onChange={handleNameChange} />
            </label>
            <button type="submit">Save</button>
        </form>
    );
};

export default PlayerForm;