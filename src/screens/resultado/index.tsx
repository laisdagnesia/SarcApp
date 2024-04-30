import * as React from 'react';
import { View, Text } from 'react-native';
import { usePacienteContext } from '../../context/pacientes';


export function ResultadoScreen () {

    const { paciente, pontosSarc, desempenho } = usePacienteContext();
    const [ MMEA, setMMEA ] = React.useState(0);
    const [ MMEAEstimado, setMMEAEstimado] = React.useState(0);
    const [ IMC, setIMC] = React.useState(0);
    const [ IMCEstimado, setIMCEstimado ] = React.useState(0);
    const [ alturaEstimada, setAlturaEstimada ] = React.useState(0); 


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

        //MMEA Estimado

        //IMC
            if (paciente){
                const IMC = (paciente.peso / (paciente.altura * paciente.altura)).toFixed(2);
                setIMC(Number(IMC))
            }

        // IMC Estimado

        //IMC= -7,527 + [0,628 x diâmetro da cintura(cm)] + [0,387 x diâmetro do quadril (cm)]
        if(paciente){
            const IMCEstimado = (-7.527 + (0.628 * paciente.diametroCintura) + (0.387 * paciente.diametroQuadril)).toFixed(2);
            setIMCEstimado(Number(IMCEstimado))
        }  

        // Altura Estimada
        if(paciente){
            let alturaEstimada = 0;
        if (paciente.sexo == 'feminino' && paciente.raca == 'caucasiano') {
             alturaEstimada = (70.25 + (1.87 * paciente.alturaJoelho) - (0.06 * paciente.idade))
        } 
        else if (paciente.sexo == 'feminino' && paciente.raca == 'afrodescendente') {
            alturaEstimada = (68.1 + (1.86 * paciente.alturaJoelho) - (0.06 * paciente.idade))
        }
        else if (paciente.sexo == 'masculino' && paciente.raca == 'caucasiano') {
            alturaEstimada = (71.85 + (1.88 * paciente.alturaJoelho ))
        }
        else if (paciente.sexo == 'masculino' && paciente.raca == 'afrodescendente') {
            alturaEstimada = (73.42 + (1.79 * paciente.alturaJoelho ))
        }
        alturaEstimada /= 100;

        alturaEstimada = parseFloat(alturaEstimada.toFixed(2));

        setAlturaEstimada(Number(alturaEstimada))
    }
};
       
        
    // ---------
    React.useEffect(() => {
        calcular()
    }, [])

    // ====================================
    return (
      <View style={{padding: 30}}>

         <Text style={{fontWeight: 'bold', marginTop:20, marginBottom:10}}>DADOS PACIENTE</Text>

         <Text style={{fontWeight: 'bold',  marginTop:10, marginBottom:10}}>Peso</Text>
         <Text>Peso: {paciente?.peso}</Text>

         <Text style={{fontWeight: 'bold', marginTop:10, marginBottom:10}}>Altura</Text>
         <Text>Altura: {paciente?.altura}</Text>

         <Text style={{fontWeight: 'bold',  marginTop:10, marginBottom:10}}>Altura Estimada</Text>
         <Text>Altura Estimada: {alturaEstimada}</Text>

         <Text style={{fontWeight: 'bold', marginTop:20, marginBottom:10}}> ------ CALCULOS ------</Text>

         <Text style={{fontWeight: 'bold', marginBottom:10}}>IMC</Text>
         <Text>IMC: {IMC}</Text>

         <Text style={{fontWeight: 'bold',  marginTop:10, marginBottom:10}}>IMC Estimado</Text>
         <Text>IMCEstimado: {IMCEstimado}</Text>

         <Text style={{fontWeight: 'bold',  marginTop:10, marginBottom:10}}>MMEA</Text>     
         <Text>MMEA: {MMEA}</Text>

         <Text style={{fontWeight: 'bold', marginTop:20, marginBottom:10}}> ---- RESULTADOS -----</Text>

         <Text style={{fontWeight: 'bold',  marginTop:10, marginBottom:10}}>Sarc</Text>
         <Text>Possui: {pontosSarc >= 6 ? 'TEM' : 'NAO TEM'}</Text>

         <Text style={{fontWeight: 'bold',  marginTop:10, marginBottom:10}}>Desempenho</Text>
         <Text>Forca Palmar: {desempenho?.forcaPalmar}</Text>



      </View>
    );
}
