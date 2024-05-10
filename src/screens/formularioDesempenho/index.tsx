import React, {useState} from "react";
import { Text, ImageBackground, StyleSheet,TextInput, View,ScrollView} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { NavegacaoPrincipalParams } from '../navigation/config';
import { Button, Input } from '@rneui/themed';
import { usePacienteContext } from "../../context/pacientes";

export function FormularioDesempenhoScreen (props: any) {
    const [forcaPalmar, setForcaPalmar] = useState('');
    const [tempoLevantar, setTempoLevantar] = useState ('');
    const [ massaMuscularApendicular, setMassaMuscularApendicular] = useState(''); 
    const [ indiceMassaMuscularApendicular, setIndiceMassaMuscularApendicular] = useState(''); 
    const [ velocidadeMarcha, setVelocidadeMarcha] = useState(''); 
    const [ shortPhysicalPerformance, setShortPhysicalPerformance] = useState(''); 
    const [ timeUp, setTimeUp] = useState(''); 
    const [ caminhadaCurta, setCaminhadaCurta] = useState(''); 
    const [ caminhadaLonga, setCaminhadaLonga] = useState(''); 


    type navProps = StackNavigationProp<NavegacaoPrincipalParams,  'menu' , 'cadastroPaciente'>;
    const navigation = useNavigation<navProps>();
    const { setDesempenho } = usePacienteContext();
    // ==================================================
    const handleAvancar = async () => {
        setDesempenho({ forcaPalmar, tempoLevantar, massaMuscularApendicular, indiceMassaMuscularApendicular, velocidadeMarcha })
        navigation.navigate('resultadoAntropometria');
    }
    // ==================================================
   return (
    <ScrollView>
    <ImageBackground style={styles.container}
    source={require('./../../../assets/images/formSarcF-2.png')}
  >
<View>
<Text style={[styles.texto, { marginTop: 150 }]}>Força de preensão palmar (KG)</Text>
<Input placeholder=''    
    inputStyle={{color:"white"}} 
    onChangeText={setForcaPalmar}
    value={forcaPalmar} />
<Text style={[styles.texto]}>Teste do sentar e levantar da cadeira (SEG)</Text>
<Input placeholder=''    
    inputStyle={{color:"white"}} 
    onChangeText={setTempoLevantar}
    value={tempoLevantar} />
<Text style={[styles.texto]}>Massa muscular esquelética apendicular (MMEA)</Text>
<Input placeholder=''    
    inputStyle={{color:"white"}} 
    onChangeText={setMassaMuscularApendicular}
    value={massaMuscularApendicular}/>
<Text style={[styles.texto]}>Índice de massa muscular esquelética apendicular (KG/M²) </Text>
<Input placeholder=''    
    inputStyle={{color:"white"}} 
    onChangeText={setIndiceMassaMuscularApendicular}
    value={indiceMassaMuscularApendicular}/>
<Text style={[styles.texto]}>Velocidade de marcha (METROS/SEG)</Text>
<Input placeholder=''    
    inputStyle={{color:"white"}} 
    onChangeText={setVelocidadeMarcha}
    value={velocidadeMarcha}/>
<Text style={[styles.texto]}>Pontuação Short Physical Perfomance Battery (SPPB)</Text>
<Input placeholder=''    
    inputStyle={{color:"white"}} 
    onChangeText={setShortPhysicalPerformance}
    value={shortPhysicalPerformance}/>
<Text style={[styles.texto]}>Pontuação Time Up and Go (TUG)</Text>
<Input placeholder=''    
    inputStyle={{color:"white"}} 
    onChangeText={setTimeUp}
    value={timeUp}/>

<Text style={[styles.texto]}>Teste de Caminhada de 400 metros (MIN)</Text>
<Input placeholder=''    
    inputStyle={{color:"white"}} 
    onChangeText={setCaminhadaCurta}
    value={caminhadaCurta}/>

<Text style={[styles.texto]}>Teste de Caminhada durante 6 minutos(METROS/SEG)</Text>
<Input placeholder=''    
    inputStyle={{color:"white"}} 
    onChangeText={setCaminhadaLonga}
    value={caminhadaLonga}/>
  <Button 
      title="Resultados"
      style={styles.button}
      containerStyle={{borderRadius: 80,width: 320, marginLeft:30}} 
      buttonStyle={{ backgroundColor: 'blue',borderRadius: 80}}
      onPress={handleAvancar}  
      raised={true}></Button>
      <Button title="Voltar" onPress={() => navigation.goBack()}
      containerStyle={{borderRadius: 80,width: 320, marginLeft:30, marginTop:10}} 
      buttonStyle={{ backgroundColor: 'blue',borderRadius: 80}}
     raised={true}></Button>
</View>            
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
      fontWeight: 'bold'
    },
  button: {
    borderRadius: 80,
    height: 40,
    width: 20,
    marginTop:10
  },
  scrollContainer: {
    flexGrow: 1,
   justifyContent: 'center',
    padding: 5,
  },

});
