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
        setPlayer({ ...player, username: name, points: 0 });
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="box--form">
                <label className="text--secondary text--m">Select your username:</label>
                <input type="text" value={name} onChange={handleNameChange} className="input box--input" />
                <button type="submit" className="button button--secondary"><p
                    className="text--secondary text--s">Save</p></button>
            </form>
        </>
    );
};

export default PlayerForm;