import React, { useContext, useState } from 'react';
import InputQuestionCard from './InputQuestionCard.tsx';
import { GameContext } from '../utils/GameContext.tsx';
import { RegionState } from '../utils/GameContext.tsx';

const Map: React.FC<RegionState> = () => {
    const [selectedArea, setSelectedArea] = useState<string | null>(null);
    const handleAreaClick = (areaId: string) => {
        setSelectedArea(areaId);
    };

    const { regions } = useContext(GameContext);

    return (
        <div>
            <div className="map">
                <svg width="960" height="540" viewBox="0 0 644 366" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {
                        regions.map((region) => {
                            return (
                                <path key={region.id} id={region.id} d={region.d} fill={region.fill} onClick={() => handleAreaClick(region.id)} />
                            );
                        })
                    }
                </svg>

                {selectedArea && <InputQuestionCard areaId={selectedArea} />}
            </div>
        </div>
    );
};

export default Map;