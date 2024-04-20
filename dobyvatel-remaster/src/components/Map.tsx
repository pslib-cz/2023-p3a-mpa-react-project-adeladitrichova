import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import { ZLI, JHC, VYS, KAR, HRA, OLO, PAR, PRA, STR, PLZ, MOR, JHM, LIB, UST } from "./MapParts.tsx";

const Map: React.FC = () => {
    const [selectedArea, setSelectedArea] = useState<string | null>(null);

    const handleAreaClick = (areaId: string) => {
        setSelectedArea(areaId);

    };

    return (
        <>
            <svg width="1920" height="1080" viewBox="0 0 644 366" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id={ZLI.id} d={ZLI.d} fill={selectedArea === "ZLI" ? ZLI.fill : "#D9D9D9"} onClick={() => handleAreaClick("ZLI")} />
                <path id={LIB.id} d={LIB.d} fill={selectedArea === "LIB" ? LIB.fill : "#D9D9D9"} onClick={() => handleAreaClick("LIB")} />
                <path id={JHC.id} d={JHC.d} fill={selectedArea === "JHC" ? JHC.fill : "#D9D9D9"} onClick={() => handleAreaClick("JHC")} />
                <path id={VYS.id} d={VYS.d} fill={selectedArea === "VYS" ? VYS.fill : "#D9D9D9"} onClick={() => handleAreaClick("VYS")} />
                <path id={KAR.id} d={KAR.d} fill={selectedArea === "KAR" ? KAR.fill : "#D9D9D9"} onClick={() => handleAreaClick("KAR")} />
                <path id={HRA.id} d={HRA.d} fill={selectedArea === "HRA" ? HRA.fill : "#D9D9D9"} onClick={() => handleAreaClick("HRA")} />
                <path id={OLO.id} d={OLO.d} fill={selectedArea === "OLO" ? OLO.fill : "#D9D9D9"} onClick={() => handleAreaClick("OLO")} />
                <path id={PAR.id} d={PAR.d} fill={selectedArea === "PAR" ? PAR.fill : "#D9D9D9"} onClick={() => handleAreaClick("PAR")} />
                <path id={PRA.id} d={PRA.d} fill={selectedArea === "PRA" ? PRA.fill : "#D9D9D9"} onClick={() => handleAreaClick("PRA")} />
                <path id={STR.id} d={STR.d} fill={selectedArea === "STR" ? STR.fill : "#D9D9D9"} onClick={() => handleAreaClick("STR")} />
                <path id={PLZ.id} d={PLZ.d} fill={selectedArea === "PLZ" ? PLZ.fill : "#D9D9D9"} onClick={() => handleAreaClick("PLZ")} />
                <path id={MOR.id} d={MOR.d} fill={selectedArea === "MOR" ? MOR.fill : "#D9D9D9"} onClick={() => handleAreaClick("MOR")} />
                <path id={JHM.id} d={JHM.d} fill={selectedArea === "JHM" ? JHM.fill : "#D9D9D9"} onClick={() => handleAreaClick("JHM")} />
                <path id={UST.id} d={UST.d} fill={selectedArea === "UST" ? UST.fill : "#D9D9D9"} onClick={() => handleAreaClick("UST")} />
            </svg>

            {selectedArea && <QuestionCard areaId={selectedArea} />}
        </>
    );
};

export default Map;
