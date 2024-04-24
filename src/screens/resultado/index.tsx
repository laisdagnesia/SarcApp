import * as React from 'react';
import { View, Text } from 'react-native';
import { usePacienteContext } from '../../context/pacientes';


export function ResultadoScreen () {

    const { paciente, pontosSarc, desempenho } = usePacienteContext();
    const [ MMEA, setMMEA ] = React.useState(0)


    // ===================================
    const calcular = async () => {
        //MMEA
        if (paciente) {
            let raca = 0;
            switch (paciente.raca) {
                case 'afrodescendente': raca = 1.4; break;
                case 'asiatico': raca = 1.2; break;
                case 'caucasiano': raca = 0; break;
            }

            let sexo = 0;
            switch (paciente.sexo) {
                case 'feminino': sexo = 0; break;
                case 'masculino': sexo = 1; break;
            }

            setMMEA((0.244 * paciente.peso)  + (7.8 * paciente.altura) + (sexo * 6.6)  - (0.098 * paciente.idade) + (raca - 3.3))
        } 

        //IMC
        
    }
    // ---------
    React.useEffect(() => {
        calcular()
    }, [])

    // ====================================
    return (
      <View style={{padding: 30}}>
         <Text style={{fontWeight: 'bold'}}>Paciente</Text>
         <Text>Altura: {paciente?.altura}</Text>
         <Text>MMEA: {MMEA}</Text>

         <Text style={{fontWeight: 'bold'}}>Sarc</Text>
         <Text>Possui: {pontosSarc >= 6 ? 'TEM' : 'NAO TEM'}</Text>

         <Text style={{fontWeight: 'bold'}}>Desempenho</Text>
         <Text>Forca Palmar: {desempenho?.forcaPalmar}</Text>


      </View>
    );
}
