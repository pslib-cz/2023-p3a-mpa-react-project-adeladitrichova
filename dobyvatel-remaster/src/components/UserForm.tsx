import React, { useState } from 'react';
import { UserFormType } from '../utils/types';


const UserForm: React.FC<UserFormType> = ({ onSubmit }) => {
    const [username, setUsername] = useState<string>('');
    const [color, setColor] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(username, color);
        setUsername('');
        setColor('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label>
                Color:
                <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
            </label>
            <button type="submit">Potvrdit</button>
        </form>
    );
};

export default UserForm;
