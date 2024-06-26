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
    const [ MMEAEstimado, setMMEAEstimado] = React.useState(false);
    const [ IMC, setIMC] = React.useState(0);
    const [ IMCEstimado, setIMCEstimado ] = React.useState(false);
    const [ IMMEA, setIMMEA ] = React.useState(0);
    const [ IMMEAEstimado, setIMMEAEstimado ] = React.useState(false);
    const [ altura, setAltura ] = React.useState(0); 
    const [ alturaEstimada, setAlturaEstimada ] = React.useState(false); 
    const [ peso, setPeso ] = React.useState(0);
    const [ pesoEstimado, setPesoEstimado ] = React.useState(false);

    // =======================================
    const calcular = async () => {
        if (paciente && desempenho) {
            //=============== PESO E ALTURA ==========//
            let altura:any = paciente.altura;
            let alturaEstimada = false;
            
            // Altura
            if (!altura && paciente.alturaJoelho) {
                if (paciente.sexo == 'feminino') {
                    altura = paciente.raca == 'afrodescendente'
                                 ? (68.1 + (1.86 * paciente.alturaJoelho) - (0.06 * paciente.idade)) 
                                 : (70.25 + (1.87 * paciente.alturaJoelho) - (0.06 * paciente.idade))
                } else { //homem
                    altura = paciente.raca == 'afrodescendente'
                                 ? (73.42 + (1.79 * paciente.alturaJoelho )) 
                                 : (71.85 + (1.88 * paciente.alturaJoelho ))
                }
                
                alturaEstimada = true;
                //@ts-ignore
                altura = parseFloat(altura/100).toFixed(2); 
            }
            setAlturaEstimada(alturaEstimada)
            setAltura(altura)

            // Peso
            let peso:any = paciente.peso;
            let pesoEstimado = false;
            if(!peso && paciente.alturaJoelho && paciente.circBraco) {
                //Sexo
                if (paciente.sexo == 'masculino') {
                    //Raça
                    if (paciente.raca == 'afrodescendente') {
                        peso = paciente.idade <= 59 
                                ? ((paciente.alturaJoelho * 1.24) + (paciente.circBraco * 2.97) - 82.48)
                                : ((paciente.alturaJoelho * 1.50) + (paciente.circBraco * 2.58) - 84.22 )
                    } else {
                        peso = paciente.idade <= 59 
                                ? ((paciente.alturaJoelho * 1.01) + (paciente.circBraco * 2.81) - 66.04)
                                : ((paciente.alturaJoelho * 1.09) + (paciente.circBraco * 2.68) - 65.51)
                    }
                } else {
                    //Feminino
                    //Raça
                    if (paciente.raca == 'afrodescendente') {
                        peso = paciente.idade <= 59 
                                ? ((paciente.alturaJoelho * 1.09) + (paciente.circBraco * 3.14) - 83.72)
                                : ((paciente.alturaJoelho * 0.44) + (paciente.circBraco * 2.86) - 39.21)
                    } else {
                        peso = paciente.idade <= 59 
                                ? ((paciente.alturaJoelho * 1.19) + (paciente.circBraco * 3.14) - 86.82)
                                : ((paciente.alturaJoelho * 1.10) + (paciente.circBraco * 3.07) - 75.81)
                    }
                }
                peso = parseFloat(peso.toFixed(2))
                pesoEstimado = true;
            }
        
            setPeso(peso)
            setPesoEstimado(pesoEstimado)

            //================ MMEA ================//
            let MMEA = 0;
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
            
            if(desempenho?.massaMuscularApendicular) {
                //REAL
                MMEA = Number(desempenho?.massaMuscularApendicular)
            } else {        
                //ESTIMADO
                //@ts-ignore
                MMEA = ((0.244 * peso)  + (7.8 * altura) + (sexo * 6.6)  - (0.098 * paciente.idade) + (raca - 3.3))
                setMMEAEstimado(true)
            }

            setMMEA(Number(MMEA.toFixed(2)))

            // ================== IMMEA =================//
            let IMMEA: any = 0;
            if (desempenho?.indiceMassaMuscularApendicular){
                //Real
                IMMEA = Number(desempenho?.indiceMassaMuscularApendicular)
            } else {
                //Estimado
                IMMEA = (MMEA / (altura * altura)).toFixed(2);
                setIMMEAEstimado(true)
            } 
            setIMMEA(Number(IMMEA))
    
            // ================ IMC ==================//
            const IMC = (peso / (altura * altura)).toFixed(2);
            setIMC(Number(IMC))
            setIMCEstimado(pesoEstimado || alturaEstimada);
        }
    }

    React.useEffect(() => {
        calcular()
    }, [])
  
    // ====================================
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageBackground style={styles.container}
        source={require('./../../../assets/images/avaliacaoAntro.png')}
      >
        {/* PESO */}
        <Text style={[styles.texto]}>Peso{(pesoEstimado ? ' Estimado' : '')}: {peso} kg</Text>
        
        {/* ALTURA */}
        <Text style={[styles.texto]}>Altura{(alturaEstimada ? ' Estimada' : '')}: {altura} metros</Text>
        
        {/* IMC */}
        <Text style={[styles.texto]}>IMC{(IMCEstimado  ? ' Estimado' : '')}: {IMC}</Text>
        
        {/* MMEA */}
        <Text style={styles.texto}>MMEA{(MMEAEstimado ? ' Estimado' : '')}: {MMEA}</Text>

        {/* IMMEA */}
        <Text style={[styles.texto, {marginBottom: 50}]}>IMMEA{(IMMEAEstimado ? ' Estimado' : '')}: {IMMEA}</Text>

        {/* <Button 
        title="Avaliação para Sarcopenia"
        style={styles.button}
        containerStyle={{borderRadius: 80,width: 320, marginLeft:30}}
        titleStyle={{ color: 'blue' }} 
        buttonStyle={{ backgroundColor: 'white',borderRadius: 80}}
        onPress= {() => navigation.navigate('avaliacaoSarcopenia', {IMC, IMMEA, MMEA})}  
        raised={true}></Button> */}

        <Button title="Diagnóstico Detalhado"
        onPress= {() => navigation.navigate('resultadoDetalhado',{IMC, IMMEA, MMEA})}  
        style={styles.button}
        containerStyle={{borderRadius: 80,width: 320, marginLeft:30}}
        titleStyle={{ color: 'blue' }} 
        buttonStyle={{ backgroundColor: 'white',borderRadius: 80}}
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
        backgroundColor: 'white',
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
 
