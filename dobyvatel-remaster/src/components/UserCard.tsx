import React, { useState } from 'react';
import UserForm from './UserForm';

const UserCard: React.FC = () => {
    const [userData, setUserData] = useState<{ username: string; color: string; } | null>(null);

    const handleFormSubmit = (username: string, color: string) => {
        setUserData({ username, color });
    };

    return (
        <div>
            <UserForm onSubmit={handleFormSubmit} />
            {userData && (
                <UserCard
                    username={userData.username}
                    color={userData.color}
                    points={0}
                />
            )}
        </div>
    );
};

export default UserCard;
