import React from 'react';
import { useGame } from '../utils/GameContext.tsx';

const Map: React.FC = () => {
    const { regions, setSelectedRegion, showInputResults, gamePhase, inputWinner, player } = useGame();

    const handleAreaClick = (regionId: string) => {
            setSelectedRegion(regionId);
            console.log('Clicked region ID:', regionId);
    };

    return (
        <div>
            <div className="map">
                <svg width="960" height="540" viewBox="0 0 644 366" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {
                        regions.map((region) => {
                            return (
                                <path
                                    key={region.id}
                                    id={region.id}
                                    d={region.d}
                                    fill={region.fill}
                                    onClick={() => handleAreaClick(region.id)}
                                    pointerEvents={(showInputResults || gamePhase !== 'PARTITION' || inputWinner !== player.username) ? 'none' : 'auto'}
                                />
                            );
                        })
                    }
                </svg>
            </div>
        </div>
    );
};

export default Map;
