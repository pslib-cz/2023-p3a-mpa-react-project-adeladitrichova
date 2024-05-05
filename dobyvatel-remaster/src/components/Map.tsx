import React from 'react';
import { useGame } from '../utils/GameContext.tsx';

const Map: React.FC = () => {
    const { regions, gamePhase, inputWinner, player, playerNeedsToChoose, setSelectedRegion, selectedRegion } = useGame();
        console.log( 'SELECTEDREGION:', selectedRegion);


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
                                    onClick={() => setSelectedRegion(region.id)}
                                    pointerEvents={(gamePhase === 'REGION_SELECT' && inputWinner === player.username || playerNeedsToChoose ) ? 'auto' : 'none'}
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
