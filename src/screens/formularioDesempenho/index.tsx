import React, {useState} from "react";
import { Text, ImageBackground, StyleSheet,TextInput, View} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { NavegacaoPrincipalParams } from '../navigation/config';
import { ScrollView } from 'react-native';
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
        setDesempenho({ forcaPalmar, tempoLevantar, massaMuscularApendicular, indiceMassaMuscularApendicular })
        navigation.navigate('resultado');
    }
    // ==================================================
   return (
    <ScrollView>
    <ImageBackground style={styles.container}
    source={require('./../../../assets/images/formSarcF-2.png')}
  >
<View>
<Text style={[styles.texto, { marginTop: 150 }]}>Força de preensão palmar em kg</Text>
<Input placeholder=''    
    inputStyle={{color:"black",fontSize:15}} 
    onChangeText={setForcaPalmar}
    value={forcaPalmar} />
<Text style={[styles.texto, { marginTop: 10 }]}>Teste do sentar e levantar da cadeira em segundos</Text>
<Input placeholder=''    
    inputStyle={{color:"black"}} 
    onChangeText={setTempoLevantar}
    value={tempoLevantar} />
<Text style={[styles.texto]}>Massa muscular esquelética apendicular (MMEA):</Text>
<Input placeholder=''    
    inputStyle={{color:"black"}} 
    onChangeText={setMassaMuscularApendicular}
    value={massaMuscularApendicular}/>
<Text style={[styles.texto]}>Índice de massa muscular esquelética apendicular em kg/m²</Text>
<Input placeholder=''    
    inputStyle={{color:"black"}} 
    onChangeText={setIndiceMassaMuscularApendicular}
    value={indiceMassaMuscularApendicular}/>
<Text style={[styles.texto]}>Velocidade de marcha em metros por segundo</Text>
<Input placeholder=''    
    inputStyle={{color:"black"}} 
    onChangeText={setVelocidadeMarcha}
    value={velocidadeMarcha}/>
<Text style={[styles.texto]}>Short Physical Perfomance Battery</Text>
<Input placeholder=''    
    inputStyle={{color:"black"}} 
    onChangeText={setShortPhysicalPerformance}
    value={shortPhysicalPerformance}/>
<Text style={[styles.texto]}>Time Up and Go</Text>
<Input placeholder=''    
    inputStyle={{color:"black"}} 
    onChangeText={setTimeUp}
    value={timeUp}/>

<Text style={[styles.texto]}>Teste de Caminhada de 400 metros em minutos</Text>
<Input placeholder=''    
    inputStyle={{color:"black"}} 
    onChangeText={setCaminhadaCurta}
    value={caminhadaCurta}/>

<Text style={[styles.texto]}>Teste de Caminhada durante 6 minutos metros/segundo</Text>
<Input placeholder=''    
    inputStyle={{color:"black"}} 
    onChangeText={setCaminhadaLonga}
    value={caminhadaLonga}/>
  <Button 
      title="Resultado"
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
