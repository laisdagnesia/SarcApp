import * as React from 'react';
import { View, Text,StyleSheet,ImageBackground, ScrollView } from 'react-native';
import { usePacienteContext } from '../../context/pacientes';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { NavegacaoPrincipalParams } from '../navigation/config';
import { Button} from '@rneui/themed';

export function ResultadoAntropometriaScreen () {
    type navProps = StackNavigationProp<NavegacaoPrincipalParams,  'menu' , 'formularioDesempenho'>;
    const navigation = useNavigation<navProps>();

    const { paciente, pontosSarc, desempenho } = usePacienteContext();
    const [ MMEA, setMMEA ] = React.useState(0);
    const [ MMEAEstimado, setMMEAEstimado] = React.useState(0);
    const [ IMC, setIMC] = React.useState(0);
    const [ IMCEstimado, setIMCEstimado ] = React.useState(0);
    const [ IMMEA, setIMMEA ] = React.useState(0);
    const [ IMMEAEstimado, setIMMEAEstimado ] = React.useState(0);
    const [ alturaEstimada, setAlturaEstimada ] = React.useState(0); 
    const [ pesoEstimado, setPesoEstimado ] = React.useState(0);
    const [ massaMuscularApendicular, setMassaMuscularApendicular] = React.useState(''); 
    const [ indiceMassaMuscularApendicular, setIndiceMassaMuscularApendicular] = React.useState(''); 
    const [ baixaForcaMuscular, setBaixaForcaMuscular]  =  React.useState<boolean>(false);
    const [ baixoDesempenhoFisico, setBaixoDesempenhoFisico]  =  React.useState<boolean>(false);
    const [ baixaMassaMuscular, setBaixaMassaMuscular]  =  React.useState<boolean>(false);

    // =======================================
    const calcular = async () => {
        let baixaMassaMuscular = false;
        let MMEA = 0;

        //MMEA Estimado

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
            MMEA = ((0.244 * paciente.peso)  + (7.8 * paciente.altura) + (sexo * 6.6)  - (0.098 * paciente.idade) + (raca - 3.3))
            setMMEA(Number(MMEA.toFixed(2)))
            if(paciente && desempenho){
                if(paciente.sexo == 'masculino' && MMEA < 20 ){
                    baixaMassaMuscular = true;
                } else if(paciente.sexo == 'feminino' && MMEA <15){
                    baixaMassaMuscular = true;
                }
                else if(paciente.sexo == 'masculino' && desempenho?.massaMuscularApendicular<20){
                    baixaMassaMuscular = true;
                }
                else if(paciente.sexo == 'feminino' && desempenho?.massaMuscularApendicular<15){
                    baixaMassaMuscular = true;
                }
                setBaixaMassaMuscular(baixaMassaMuscular)
            }    
        } 

        // IMMEA
        if(paciente && desempenho){
        if (desempenho?.indiceMassaMuscularApendicular !=0){
            setIMMEA(Number(desempenho?.indiceMassaMuscularApendicular))
        }
        else if(desempenho?.massaMuscularApendicular != 0){
           const IMMEA = (desempenho?.massaMuscularApendicular / (paciente.altura * paciente.altura)).toFixed(2)
           setIMMEA(Number(IMMEA))
        } 
        }
        // IMMEA ESTIMADO
        if(paciente && paciente.altura && desempenho){
            if(desempenho?.massaMuscularApendicular){
                const IMMEAEstimado = (MMEA / (paciente.altura * paciente.altura)).toFixed(2);
                setIMMEAEstimado(Number(IMMEAEstimado))
            } if (MMEA){
                const IMMEAEstimado = (MMEA / (paciente.altura * paciente.altura)).toFixed(2);
                setIMMEAEstimado(Number(IMMEAEstimado))
            }
        }
        // Baixa Massa Muscular
        if(paciente && desempenho){
            if(paciente.sexo == 'masculino' && IMMEA < 7){
                baixaMassaMuscular = true;
        }   else if(paciente.sexo == 'feminino' && IMMEA < 5.5 ){
                baixaMassaMuscular = true;
        }
        else if(paciente.sexo == 'masculino' && desempenho?.indiceMassaMuscularApendicular <7){
            baixaMassaMuscular = true;
        }
        else if(paciente.sexo == 'feminino' && desempenho?.indiceMassaMuscularApendicular < 5.5){
        baixaMassaMuscular = true;
        }
        setBaixaMassaMuscular(baixaMassaMuscular)
    }

        //IMC
            if (paciente){
                const IMC = (paciente.peso / (paciente.altura * paciente.altura)).toFixed(2);
                setIMC(Number(IMC))
            }

        // IMC Estimado
        if(paciente){
            const IMCEstimado = (-7.527 + (0.628 * paciente.diametroCintura) + (0.387 * paciente.diametroQuadril)).toFixed(2);
            setIMCEstimado(Number(IMCEstimado))
        }  

        // Altura Estimada
        if(paciente && paciente.alturaJoelho){
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

    // Peso Estimado
    if(paciente && paciente.alturaJoelho && paciente.circBraco){
        let pesoEstimado = 0;
        if(paciente.sexo == 'masculino' && paciente.raca =='afrodescendente' && paciente.idade >=19 && paciente.idade <=59){
            pesoEstimado = ((paciente.alturaJoelho * 1.24) + (paciente.circBraco * 2.97) - 82.48)
        }
        else if(paciente.sexo == 'masculino' && paciente.raca == 'caucasiano' && paciente.idade>=19 && paciente.idade <=59){
            pesoEstimado = ((paciente.alturaJoelho * 1.01) + (paciente.circBraco * 2.81) - 66.04)
        }
        else if(paciente.sexo == 'feminino' && paciente.raca =='afrodescendente' && paciente.idade >=19 && paciente.idade <=59){
            pesoEstimado = ((paciente.alturaJoelho * 1.09) + (paciente.circBraco * 3.14) - 83.72)
        }
        else if(paciente.sexo == 'feminino' && paciente.raca == 'caucasiano' && paciente.idade>=19 && paciente.idade <=59){
            pesoEstimado = ((paciente.alturaJoelho * 1.19) + (paciente.circBraco * 3.14) - 8.82)
        }
        else if(paciente.sexo == 'masculino' && paciente.raca =='afrodescendente' && paciente.idade >=60 && paciente.idade <=80){
            pesoEstimado = ((paciente.alturaJoelho * 1.50) + (paciente.circBraco * 2.58) - 84.22 )
        }
        else if(paciente.sexo == 'masculino' && paciente.raca == 'caucasiano' && paciente.idade >=60 && paciente.idade <=80){
            pesoEstimado = ((paciente.alturaJoelho * 1.09) + (paciente.circBraco * 2.68) - 65.51)
        }
        else if(paciente.sexo == 'feminino' && paciente.raca =='afrodescendente' && paciente.idade >=60 && paciente.idade <=80){
            pesoEstimado = ((paciente.alturaJoelho * 0.44) + (paciente.circBraco * 2.86) - 39.21)
        }
        else if(paciente.sexo == 'feminino' && paciente.raca =='caucasiano' && paciente.idade >=60 && paciente.idade <=80){
            pesoEstimado = ((paciente.alturaJoelho * 1.10) + (paciente.circBraco * 3.07) - 75.81)
        }
        pesoEstimado /=10;
        pesoEstimado = parseFloat(pesoEstimado.toFixed(2));
        setPesoEstimado(Number(pesoEstimado))

    }

};

React.useEffect(() => {
    calcular()

}, [])
  
    // ====================================
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageBackground style={styles.container}
        source={require('./../../../assets/images/avaliacaoAntro.png')}
      >
        { paciente?.peso &&   <Text style={[styles.titulo, {marginTop:60}]}> Peso: {paciente?.peso} kg</Text>}
        { !paciente?.peso && pesoEstimado > 0 && <Text style={[styles.texto]}>Peso Estimado: {pesoEstimado} kg</Text> }

        { paciente?.altura &&   <Text style={[styles.titulo, {marginTop:60}]}> Altura: {paciente?.altura} metros</Text>}
        { !paciente?.altura && alturaEstimada > 0 && <Text style={[styles.texto]}>Altura Estimada: {alturaEstimada} metros</Text> }  

        { !isNaN(IMC) && <Text style={[styles.texto]}>IMC: {IMC}</Text>}

        {!IMC && <Text style={[styles.texto]}>IMC Estimado: {!isFinite(IMCEstimado) ? IMCEstimado : 'Não disponível' }</Text> } 

        {desempenho?.massaMuscularApendicular && <Text style={styles.texto}>MMEA: {desempenho?.massaMuscularApendicular}</Text>}
        {!desempenho?.massaMuscularApendicular && <Text style={styles.texto}>MMEA Estimado: {MMEA > 0 ? MMEA : 'Não disponível'}</Text>}
        
        {desempenho?.indiceMassaMuscularApendicular && <Text style={[styles.titulo, {marginBottom: 50}]}> IMMEA: {IMMEA}</Text>}
        {!desempenho?.indiceMassaMuscularApendicular&& <Text style={[styles.titulo, {marginBottom: 50}]}> IMMEA Estimado: {!isFinite(IMMEAEstimado) && IMMEAEstimado != 'Infinity' ? IMMEAEstimado :  'Não disponível'}</Text>}
     
        <Button 
        title="Avaliação para Sarcopenia"
        style={styles.button}
        containerStyle={{borderRadius: 80,width: 320, marginLeft:30}}
        titleStyle={{ color: 'blue' }} 
        buttonStyle={{ backgroundColor: 'white',borderRadius: 80}}
        onPress= {() => navigation.navigate('avaliacaoSarcopenia')}  
        raised={true}></Button>
         <Button title="Voltar" onPress={() => navigation.goBack()}
         containerStyle={{borderRadius: 80,width: 320, marginLeft:30, marginTop:10}} 
         buttonStyle={{ backgroundColor: 'blue',borderRadius: 80}}
        raised={true}></Button>
         </ImageBackground>
         </ScrollView>
    );
}
const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
      },
      container: {
        flex: 1,
        justifyContent: 'center',
      },
    texto:{
      color:'white',
      marginLeft:10, 
      fontSize:20, 
      fontWeight: 'bold',
      marginTop:10, 
      marginBottom:10,
      padding:5
    },
    titulo:{
        color:'white',
        marginLeft:10, 
        fontSize:20, 
        fontWeight: 'bold',
       // marginTop:100, 
        marginBottom:10
    },
    button: {
        backgroundColor: 'blue',
        borderRadius: 80,
        height: 40,
        width: 400,
        marginTop:60
      },
  scrollContainer: {
    flexGrow: 1,
   justifyContent: 'center',
  },

});
 
