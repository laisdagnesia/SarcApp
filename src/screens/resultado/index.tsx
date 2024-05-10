import * as React from 'react';
import { View, Text,StyleSheet,ImageBackground, ScrollView } from 'react-native';
import { usePacienteContext } from '../../context/pacientes';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { NavegacaoPrincipalParams } from '../navigation/config';
import { Button} from '@rneui/themed';
import { ProgressViewIOS } from 'react-native';

export function ResultadoScreen () {
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
    const [ baixaMassaMuscular, setBaixaMassaMuscular]  =  React.useState<boolean>(false);
    const [ massaMuscularApendicular, setMassaMuscularApendicular] = React.useState(''); 
    const [ indiceMassaMuscularApendicular, setIndiceMassaMuscularApendicular] = React.useState(''); 

    // ===================================
    const calcular = async () => {
        let baixaMassaMuscular = false;
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
            const MMEA = ((0.244 * paciente.peso)  + (7.8 * paciente.altura) + (sexo * 6.6)  - (0.098 * paciente.idade) + (raca - 3.3))
            setMMEA(Number(MMEA.toFixed(2)))
            if(paciente.sexo == 'masculino' && MMEA < 20){
                baixaMassaMuscular = true;
            } else if(paciente.sexo == 'feminino' && MMEA <15){
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

    // Peso Estimado
    if(paciente){
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

// IMMEA
  if (paciente && desempenho) {
    const massaMuscularApendicular = desempenho?.massaMuscularApendicular ?? 0

    if (massaMuscularApendicular !== 0) {
      let IMMEA =  desempenho?.massaMuscularApendicular;
      setIMMEA(Number(desempenho?.massaMuscularApendicular));
    } else if(massaMuscularApendicular == 0) {
      const IMMEAEstimado = (MMEA / (paciente.altura * paciente.altura)).toFixed(2);
      setIMMEA(Number(IMMEAEstimado));
    }
  }
    
};

    const [ sarcF, setSarcF ] = React.useState<boolean>(false)
    const [ sarcFAC, setSarcFAC ] = React.useState<boolean>(false)
    const [ sarcCalF, setSarcCalF ] = React.useState<boolean>(false)
    const [ sarcFEBM, setSarcFEBM ] = React.useState<boolean>(false)
    const [ sarcCalFAC, setSarcCalFAC ] = React.useState<boolean>(false)

     const pontuacoesFinais = () => {
        //SARC-F
        setSarcF(pontosSarc >= 4)

        //SARC-F+AC
        let pontos = pontosSarc;
        if (paciente) {
            if(paciente.sexo == 'feminino'){
            pontos += paciente.circBraco <= 25 ? 10 : 0
            }
            else if (paciente.sexo == 'masculino'){
            pontos += paciente.circBraco <= 27 ? 10 : 0
            }
            setSarcFAC(pontos >= 10)
        }
        // SARC-CALF
        let pontosCalf = pontosSarc;
        if(paciente){
            if (paciente.sexo == 'feminino'){
                pontosCalf+= paciente.circPant <= 33 ? 10 :0
            } 
            else if (paciente.sexo == 'masculino'){
                pontosCalf += paciente.circPant <= 34 ? 10 : 0
            }
            setSarcCalF(pontosCalf >= 11)
        }
        // SARC-F + EBM
        let pontosEBM = pontosSarc;
        if (paciente){
            if (paciente) {
                pontosEBM += paciente.idade >= 75 ? 10 : 0
            }else if (paciente){
                pontosEBM += IMC <= 21 ? 10 : 0
            }
            setSarcFEBM(pontosEBM >= 12)
        }
        // SARC-CalF+AC 
        let pontosCalFAC = pontosSarc;
        if (paciente){
            if(paciente.sexo == 'feminino'){
                pontosCalFAC += paciente.circPant <= 33 ? 10 : 0
                pontosCalFAC += paciente.circBraco <= 25 ? 10 : 0
            } else if (paciente.sexo == 'masculino') {
                pontosCalFAC += paciente.circPant <= 34 ? 10 : 0
                pontosCalFAC += paciente.circBraco <= 27 ? 10 : 0
            }
            setSarcCalFAC(pontosCalFAC >= 11)
        }

     }
     const [ forcaPalmar, setForcaPalmar ] = React.useState<boolean>(false);
     const [ tempoLevantar, setTempoLevantar ] = React.useState<boolean>(false);
     const [ velocidadeMarcha, setVelocidadeMarcha ] = React.useState<boolean>(false);
     const [ shortPhysicalPerformance, setShortPhysicalPerformance ] = React.useState<boolean>(false);
     const [ timeUp, setTimeUp] =  React.useState<boolean>(false);
     const [ caminhadaCurta, setCaminhadaCurta]  =  React.useState<boolean>(false);
     const [ baixaForcaMuscular, setBaixaForcaMuscular]  =  React.useState<boolean>(false);
     const [ baixoDesempenhoFisico, setBaixoDesempenhoFisico]  =  React.useState<boolean>(false);
     const [ sarcopenia, setSarcopenia]  =  React.useState<boolean>(false);
     const [ sarcopeniaProvavel, setSarcopeniaProvavel]  =  React.useState<boolean>(false);
     const [ sarcopeniaGrave, setSarcopeniaGrave]  =  React.useState<boolean>(false);

     const diagnostico = () => {
        let baixaForcaMuscular = false;
        let baixoDesempenhoFisico = false;
    
        // FORÇA MUSCULAR
        if(paciente && desempenho){
            if(paciente.sexo === 'masculino' )
                setForcaPalmar(desempenho?.forcaPalmar < 27)
            else if(paciente.sexo === 'feminino')
                setForcaPalmar(desempenho?.forcaPalmar < 16)
            
            if ((paciente.sexo === 'masculino' && desempenho?.forcaPalmar < 27) || 
                (paciente.sexo === 'feminino' && desempenho?.forcaPalmar < 16)) {
                baixaForcaMuscular = true;
            }
        }
    
        // TEMPO LEVANTAR
        if(paciente && desempenho){
            setTempoLevantar(desempenho?.tempoLevantar > 15);
            if (desempenho?.tempoLevantar > 15) {
                baixaForcaMuscular = true;
            }
        }
    
        // VELOCIDADE MARCHA
        if(paciente && desempenho) {
            setVelocidadeMarcha(desempenho?.velocidadeMarcha <= 0.8);
            if (desempenho?.velocidadeMarcha <= 0.8) {
                baixoDesempenhoFisico = true;
            }
        }
    
        // SHORT PHYSICAL PERFORMANCE
        if(paciente && desempenho){
            setShortPhysicalPerformance(desempenho?.shortPhysicalPerformance <= 8);
            if (desempenho?.shortPhysicalPerformance <= 8) {
                baixoDesempenhoFisico = true;
            }
        }
    
        // TIME UP GO
        if(paciente && desempenho){
            setTimeUp(desempenho?.timeUp >= 20);
            if (desempenho?.timeUp >= 20) {
                baixoDesempenhoFisico = true;
            }
        }
    
        // CAMINHADA CURTA
        if(paciente && desempenho){
            setCaminhadaCurta(desempenho?.caminhadaCurta >= 6);
            if (desempenho?.caminhadaCurta >= 6) {
                baixoDesempenhoFisico = true;
            }
        }
        setBaixaForcaMuscular(baixaForcaMuscular)
        setBaixoDesempenhoFisico(baixoDesempenhoFisico)
    }



  // IMMEA ESTIMADO (TODOS VAZIOS) 
//   if(paciente){
//     const IMMEAEstimado = (MMEA / (paciente.altura * paciente.altura)).toFixed(2);
//     setIMMEAEstimado(Number(IMMEAEstimado))
//     }

//   // IMMEA 
//   if(paciente && desempenho){
//     if(desempenho?.massaMuscularApendicular != 0){
//        const IMMEA = (desempenho?.massaMuscularApendicular / (paciente.altura * paciente.altura)).toFixed(2)
//        setIMMEA(Number(IMMEA))
//     }
// }

    // POSSIBILIDADES 
    // if(paciente && desempenho){
    //     if (desempenho?.indiceMassaMuscularApendicular !=0){
    //         const IMMEA = desempenho?.indiceMassaMuscularApendicular;
    //         setIMMEA(Number(IMMEA))
    //     }
    //     else if(desempenho?.massaMuscularApendicular != 0){
    //        const IMMEA = (desempenho?.massaMuscularApendicular / (paciente.altura * paciente.altura)).toFixed(2)
    //        setIMMEA(Number(IMMEA))
    //     } 
    // }
    // if(paciente && desempenho){
    //     if(desempenho?.massaMuscularApendicular){
    //         const IMMEAEstimado = (MMEA / (paciente.altura * paciente.altura)).toFixed(2);
    //         setIMMEAEstimado(Number(IMMEAEstimado))
    //     } else if (MMEA){
    //         const IMMEAEstimado = (MMEA / (paciente.altura * paciente.altura)).toFixed(2);
    //         setIMMEAEstimado(Number(IMMEAEstimado))
    //     }
    // }


  // IMMEA ESTIMADO (TODOS VAZIOS) FUNCIONA
//   if (paciente){
//     let IMMEA = 0;
//     if (paciente){
//         IMMEA = (MMEA / (paciente.altura * paciente.altura))
//     }
//     IMMEA = parseFloat(IMMEA.toFixed(2))
//     setIMMEA(Number(IMMEA))
//  } 



 //------------------------------
//  // IMMEA FUNCIONA
//  if(paciente && desempenho){
//     let IMMEAEstimado = 0;
//     if(desempenho?.massaMuscularApendicular != 0){
//         IMMEAEstimado = (desempenho?.massaMuscularApendicular / (paciente.altura * paciente.altura))
//     }
//         IMMEAEstimado = parseFloat(IMMEAEstimado.toFixed(2))
//         setIMMEAEstimado(Number(IMMEAEstimado))

//  }


    // ---------
    React.useEffect(() => {
        calcular()
        pontuacoesFinais()
        diagnostico()

    }, [])

    // ====================================
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageBackground style={styles.container}
        source={require('./../../../assets/images/resultado.png')}
      >
         <Text style={[styles.titulo, {marginTop: 180}]}> Peso: {paciente?.peso} kg</Text>

        { !paciente?.peso && <Text style={[styles.texto]}>Peso Estimado: {pesoEstimado} kg</Text> } 

         <Text style={[styles.texto]}>Altura: {paciente?.altura} metros</Text>

        { !paciente?.altura && <Text style={[styles.texto]}>Altura Estimada: {alturaEstimada} metros</Text> } 

         <Text style={[styles.texto]}>IMC: {IMC}</Text>

        {!IMC && <Text style={[styles.texto]}>IMC Estimado: {IMCEstimado}</Text> } 

        {!desempenho?.massaMuscularApendicular && <Text style={styles.texto}>MMEA Estimado: {MMEA ?? 'Não disponível'}</Text>}
        {desempenho?.massaMuscularApendicular && <Text style={styles.texto}>MMEA: {desempenho?.massaMuscularApendicular}</Text>}

        {/* {<Text style={[styles.texto]}>MMEA: {desempenho?.massaMuscularApendicular}</Text>}
         
        {!desempenho?.massaMuscularApendicular && <Text style={[styles.texto]}>MMEA Estimado: {MMEA}</Text>} */}
         
         {/* <Text style={[styles.texto]}>IMMEA: {IMMEA}</Text> */}

        {!desempenho?.indiceMassaMuscularApendicular && <Text style={styles.texto}>IMMEA Estimado: {IMMEAEstimado ?? 'Não disponível'}</Text>}
        {desempenho?.indiceMassaMuscularApendicular && <Text style={styles.texto}>IMMEA: {desempenho?.indiceMassaMuscularApendicular}</Text>}
         
         <Text style={[styles.texto]}>Sarc-F : {pontosSarc >= 4 ? 'Sugestivo de sarcopenia' : 'Não possui sarcopenia'}</Text>

         <Text style={[styles.texto]}>Sarc-CalF: {pontosSarc >= 11 ? 'Sugestivo de sarcopenia' : 'Não possui sarcopenia'}</Text>

         <Text style={[styles.texto]}> Sarc-F + EBM: {pontosSarc >= 12 ? 'Sugestivo de sarcopenia' : 'Não possui sarcopenia'}</Text>

         <Text style={[styles.texto]}>Sarc-F + AC: {pontosSarc >= 10 ? 'Sugestivo de sarcopenia' : 'Não possui sarcopenia'}</Text>

         <Text style={[styles.texto]}>Sarc-CalF + AC: {pontosSarc >= 11 ? 'Sugestivo de sarcopenia' : 'Não possui sarcopenia'}</Text>

         <Text  style={[styles.texto]}>Diagnóstico</Text>

         <Text style={[styles.texto]}>Criterio de baixa força muscular: {baixaForcaMuscular ? 'Sarcopenia provável' : 'Não possui sarcopenia'}</Text>

         <Text style={[styles.texto]}>Criterio de baixa massa mascular: {baixaMassaMuscular ? 'Sarcopenia provável' : 'Não possui sarcopenia'}</Text>

         <Text style={[styles.texto]}>Criterio de baixo desempenho fisico: {baixoDesempenhoFisico ? 'Sarcopenia provável' : 'Não possui sarcopenia'}</Text>
         
         <Text style={[styles.texto]}>Sarcopenia: { baixaForcaMuscular && baixaMassaMuscular && baixoDesempenhoFisico ? 'Sarcopenia Grave' :
            baixaForcaMuscular && (baixaMassaMuscular || baixoDesempenhoFisico) ? 'Sarcopenia' :
            baixaForcaMuscular ? 'Sarcopenia Provável' : 'Não Possui'}</Text>

         <Button title="Voltar" onPress={() => navigation.goBack()}
         containerStyle={{borderRadius: 80,width: 320, marginLeft:30, marginTop:50}} 
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
    //    padding: 5,
    //    alignItems: 'center',
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
        marginTop:100, 
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
 
