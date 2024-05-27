import * as React from 'react';
import { View, Text,StyleSheet,ImageBackground, ScrollView } from 'react-native';
import { usePacienteContext } from '../../context/pacientes';
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { NavegacaoPrincipalParams } from '../navigation/config';
import { Button} from '@rneui/themed';

interface AvaliacaoProps {
    route: RouteProp<NavegacaoPrincipalParams, 'resultadoDetalhado'>
}

export function ResultadoDetalhadoScreen ({route}: AvaliacaoProps) {
    type navProps = StackNavigationProp<NavegacaoPrincipalParams,  'menu' , 'formularioDesempenho'>;
    const navigation = useNavigation<navProps>();
    const { IMC, IMMEA, MMEA  } = route.params;

    const { paciente, pontosSarc, desempenho } = usePacienteContext();
    
    const [ baixaMassaMuscular, setBaixaMassaMuscular]  =  React.useState<boolean>(false);

    const [ sarcF, setSarcF ] = React.useState<boolean>(false)
    const [ sarcFAC, setSarcFAC ] = React.useState<boolean>(false)
    const [ sarcCalF, setSarcCalF ] = React.useState<boolean>(false)
    const [ sarcFEBM, setSarcFEBM ] = React.useState<boolean>(false)
    const [ sarcCalFAC, setSarcCalFAC ] = React.useState<boolean>(false)
    //--------------

    const [ baixaForcaMuscular, setBaixaForcaMuscular]  =  React.useState<boolean>(false);
    const [ baixoDesempenhoFisico, setBaixoDesempenhoFisico]  =  React.useState<boolean>(false);
    // ------------

    // ===================================
    const pontuacoesFinais = async () => {
       
        if (paciente) {
            // ========= PONTUAÇÕES SARC ===========//
            //SARC-F
            if (pontosSarc >=4)
                {
                    setSarcF(true)
                }
           

            //SARC-F+AC
            let pontos = pontosSarc;
            if (paciente?.circBraco) {
                if(paciente.sexo == 'feminino'){
                    pontos += paciente.circBraco <= 25 ? 10 : 0

                } else {
                    pontos += paciente.circBraco <= 27 ? 10 : 0
                }
                setSarcFAC(pontos >= 10)   
            }
            
            // SARC-CALF
            let pontosCalf = pontosSarc;
            if(paciente?.circBraco ){
                if (paciente.sexo == 'feminino') {
                    pontosCalf+= paciente.circPant <= 33 ? 10 :0
                    //pontosCalf+= pontosSarc
                } else {
                    pontosCalf += paciente.circPant <= 34 ? 10 : 0
                    // pontosCalf+= pontosSarc
                }
                setSarcCalF(pontosCalf >= 11)
                //setSarcCalF(pontosCalf+=sarcF )
                //setSarcCalF(true)
            }
            
            // SARC-F + EBM
            let pontosEBM = pontosSarc;
            pontosEBM += paciente.idade >= 75 ? 10 : 0
            pontosEBM += IMC <= 21 ? 10 : 0
            setSarcFEBM(pontosEBM >= 12)
           // setSarcFEBM(true)
            
            // SARC-CalF+AC 
            let pontosCalFAC = pontosSarc;
            if(paciente.sexo == 'feminino' && paciente.circPant && paciente.circBraco){
                pontosCalFAC += paciente.circPant <= 33 ? 10 : 0
                pontosCalFAC += paciente.circBraco <= 25 ? 10 : 0
            } else if (paciente.sexo == 'masculino' && paciente.circBraco && paciente.circPant) {
                pontosCalFAC += paciente.circPant <= 34 ? 10 : 0
                pontosCalFAC += paciente.circBraco <= 27 ? 10 : 0
            }
          // setSarcCalFAC(pontosCalFAC)
           setSarcCalFAC(pontosCalFAC >= 11)
        }
    }
    
    const diagnostico = () => {

        let baixaForcaMuscular = false;
        let baixoDesempenhoFisico = false;
        let baixaMassaMuscular = false;
        if (paciente && desempenho) {
            
            // =============== BAIXA MASSA MUSCULAR ===============//
            //BASEADO NO MMEA
            if(paciente.sexo == 'masculino' && MMEA < 20 )
                baixaMassaMuscular = true;
            else if(paciente.sexo == 'feminino' && MMEA <15)
                baixaMassaMuscular = true;
            
            //BASEADO NO IMMEA
            if(paciente.sexo == 'masculino' && IMMEA < 7)
                baixaMassaMuscular = true;
            else if(paciente.sexo == 'feminino' && IMMEA < 5.5 )
                baixaMassaMuscular = true;
            
            setBaixaMassaMuscular(baixaMassaMuscular)

            // ================= FORÇA MUSCULAR =============//
            //Força Palmar
            if ((paciente.sexo === 'masculino' && desempenho?.forcaPalmar < 27) || 
                (paciente.sexo === 'feminino' && desempenho?.forcaPalmar < 16)) 
                baixaForcaMuscular = true;
            
            // TEMPO LEVANTAR
            if (desempenho?.tempoLevantar > 15) baixaForcaMuscular = true;
            
            // VELOCIDADE MARCHA
            if (desempenho?.velocidadeMarcha <= 0.8) baixoDesempenhoFisico = true;
            
            // SHORT PHYSICAL PERFORMANCE
            if (desempenho?.shortPhysicalPerformance <= 8) baixoDesempenhoFisico = true;
                    
            // TIME UP GO
            if (desempenho?.timeUp >= 20) baixoDesempenhoFisico = true;
    
            // CAMINHADA CURTA
            if (desempenho?.caminhadaCurta >= 6) baixoDesempenhoFisico = true;
        }
    
        setBaixaForcaMuscular(baixaForcaMuscular)
        setBaixoDesempenhoFisico(baixoDesempenhoFisico)
    }


    // ---------
    React.useEffect(() => {
        diagnostico()
        pontuacoesFinais()
    }, [])

    // ====================================
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageBackground style={styles.container}
        source={require('./../../../assets/images/diagnostico.png')}
      >
        <Text style={[styles.texto]}>Sarc-F: {pontosSarc ? 'Sugestivo de sarcopenia' : 'Paciente não sarcopênico' }</Text>
        <Text style={[styles.texto]}>Sarc-F + AC: {sarcFAC ? 'Sugestivo de sarcopenia' : 'Paciente não sarcopênico'}</Text>
        <Text style={[styles.texto]}>Sarc-Cal + F: {sarcCalF ? 'Sugestivo de sarcopenia' : 'Paciente não sarcopênico'}</Text>
        <Text style={[styles.texto]}>Sarc-F + EBM: {sarcFEBM ? 'Sugestivo de sarcopenia' : 'Paciente não sarcopênico'}</Text> 
        <Text style={[styles.texto]}>Sarc-CalF+AC: {sarcCalFAC ? 'Sugestivo de sarcopenia' : 'Paciente não sarcopênico'}</Text>

{/* 
         <Text style={[styles.texto]}>Força muscular: {baixaForcaMuscular ? 'Baixa' : 'Preservada'}</Text>

         <Text style={[styles.texto]}>Massa mascular: {baixaMassaMuscular ? 'Baixa' : 'Preservada'}</Text>

         <Text style={[styles.texto]}>Desempenho físico: {baixoDesempenhoFisico ? 'Baixo desempenho físico' : 'Desempenho físico preservado'}</Text>
          */}

         <Text style={[styles.texto]}>Diagnóstico para Sarcopenia: { baixaForcaMuscular && baixaMassaMuscular && baixoDesempenhoFisico ? 'Paciente sarcopênico grave' :
        baixaForcaMuscular && (baixaMassaMuscular || baixoDesempenhoFisico) ? 'Paciente sarcopênico' :
        baixaForcaMuscular ? 'Paciente com sarcopenia provável ' : 'Paciente não sarcopênico'}</Text>

        <Button 
        title="Avaliação para Sarcopenia"
        style={styles.button}
        containerStyle={{borderRadius: 80,width: 320, marginLeft:30}}
        titleStyle={{ color: 'blue' }} 
        buttonStyle={{ backgroundColor: 'white',borderRadius: 80}}
        onPress= {() => navigation.navigate('avaliacaoSarcopenia', {IMC, IMMEA, MMEA})}  
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