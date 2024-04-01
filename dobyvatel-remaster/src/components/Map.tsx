import React, { useState } from 'react';

interface MapProps { }

const Map: React.FC<MapProps> = (props) => {
    const [selectedArea, setSelectedArea] = useState<string | null>(null);

    const handleAreaClick = (areaId: string) => {
        const input = prompt('Enter the correct input to color the circle:');
        if (input === areaId) {
            setSelectedArea(areaId);
            console.log(`Selected area: ${areaId}`);
        } else {
            console.log('Wrong input');
        }
    };

    return (
        <svg width="482" height="482" viewBox="0 0 482 482" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="map">
                <circle
                    id="area:1"
                    cx="75"
                    cy="75"
                    r="75"
                    fill={selectedArea === "area:1" ? "#FF0000" : "#D9D9D9"}
                    onClick={() => handleAreaClick("area:1")}
                />
                <circle
                    id="area:2"
                    cx="241"
                    cy="75"
                    r="75"
                    fill={selectedArea === "area:2" ? "#FF0000" : "#D9D9D9"}
                    onClick={() => handleAreaClick("area:2")}
                />
                <circle
                    id="area:3"
                    cx="407"
                    cy="75"
                    r="75"
                    fill={selectedArea === "area:3" ? "#FF0000" : "#D9D9D9"}
                    onClick={() => handleAreaClick("area:3")}
                />
                <circle
                    id="area:4"
                    cx="75"
                    cy="241"
                    r="75"
                    fill={selectedArea === "area:4" ? "#FF0000" : "#D9D9D9"}
                    onClick={() => handleAreaClick("area:4")}
                />
                <circle
                    id="area:5"
                    cx="241"
                    cy="241"
                    r="75"
                    fill={selectedArea === "area:5" ? "#FF0000" : "#D9D9D9"}
                    onClick={() => handleAreaClick("area:5")}
                />
                <circle
                    id="area:6"
                    cx="407"
                    cy="241"
                    r="75"
                    fill={selectedArea === "area:6" ? "#FF0000" : "#D9D9D9"}
                    onClick={() => handleAreaClick("area:6")}
                />
                <circle
                    id="area:7"
                    cx="75"
                    cy="407"
                    r="75"
                    fill={selectedArea === "area:7" ? "#FF0000" : "#D9D9D9"}
                    onClick={() => handleAreaClick("area:7")}
                />
                <circle
                    id="area:8"
                    cx="241"
                    cy="407"
                    r="75"
                    fill={selectedArea === "area:8" ? "#FF0000" : "#D9D9D9"}
                    onClick={() => handleAreaClick("area:8")}
                />
                <circle
                    id="area:9"
                    cx="407"
                    cy="407"
                    r="75"
                    fill={selectedArea === "area:9" ? "#FF0000" : "#D9D9D9"}
                    onClick={() => handleAreaClick("area:9")}
                />
            </g>
        </svg>
    );
};

export default Map;
