import { createContext, useContext, useState } from "react";


type Paciente = {
    idade: number;
    sexo: 'feminino'|'masculino';
    raca: 'afrodescendente'|'asiatico'|'caucasiano';
    peso: number;
    altura: number;
    circBraco: number; 
    circPant: number; 
    alturaJoelho: number; 
    diametroCintura: number;
    diametroQuadril: number;
}

type Desempenho = {
    massaMuscularApendicular: number,
    indiceMassaMuscularApendicular: number,
    tempoLevantar: number,
    forcaPalmar: number
}
// type IMC ={
//     peso: number, 
//     altura: number,

// }

export const PacienteContext = createContext<{paciente?: Paciente,
    setPaciente?:any,
    pontosSarc: number,
    setPontosSarc?: any,
    desempenho?: Desempenho,
    setDesempenho?: any

}>({pontosSarc: 0});

export function PacienteProvider({children}: any) {

    const [ paciente, setPaciente ] = useState<undefined|Paciente>();
    const [ pontosSarc, setPontosSarc ] = useState<number>(0);
    const [ desempenho, setDesempenho ] = useState<undefined|Desempenho>();

    return (
        <PacienteContext.Provider value={{paciente, setPaciente, pontosSarc, setPontosSarc, desempenho, setDesempenho}}>
            {children}
        </PacienteContext.Provider>
    )
}

export const usePacienteContext = () => useContext(PacienteContext);