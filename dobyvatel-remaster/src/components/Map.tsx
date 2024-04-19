import React, {useState} from 'react';
import {ZLI, JHC, VYS, KAR, HRA, OLO, PAR, PRA, STR, PLZ, MOR, JHM, LIB, UST} from "./MapParts.tsx";

interface MapProps {
}

const Map: React.FC<MapProps> = (props) => {
    const [selectedArea, setSelectedArea] = useState<string[]>([]);

    const handleAreaClick = (areaId: string) => {
        const input = prompt('Enter the correct input to color the circle:');
        if (input === areaId) {
            setSelectedArea(prevSelectedArea => [...prevSelectedArea, areaId]);
            console.log(`Selected area: ${areaId}`);
        } else {
            console.log('Wrong input');
        }
    };

    return (
        <>
            <svg width="1920" height="1080" viewBox="0 0 644 366" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id={ZLI.id} d={ZLI.d} fill={ZLI.fill} />
                <path id={LIB.id} d={LIB.d} fill={LIB.fill} />
                <path id={JHC.id} d={JHC.d} fill={JHC.fill} />
                <path id={VYS.id} d={VYS.d} fill={VYS.fill} />
                <path id={KAR.id} d={KAR.d} fill={KAR.fill} />
                <path id={HRA.id} d={HRA.d} fill={HRA.fill} />
                <path id={OLO.id} d={OLO.d} fill={OLO.fill} />
                <path id={PAR.id} d={PAR.d} fill={PAR.fill} />
                <path id={PRA.id} d={PRA.d} fill={PRA.fill} />
                <path id={STR.id} d={STR.d} fill={STR.fill} />
                <path id={PLZ.id} d={PLZ.d} fill={PLZ.fill} />
                <path id={MOR.id} d={MOR.d} fill={MOR.fill} />
                <path id={JHM.id} d={JHM.d} fill={JHM.fill} />
                <path id={UST.id} d={UST.d} fill={UST.fill} />

            </svg>





        </>
    );
};


export default Map;
