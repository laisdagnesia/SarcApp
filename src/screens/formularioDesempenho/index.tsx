import React, {useState} from "react";
import { Text, ImageBackground, StyleSheet,TextInput, View} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { NavegacaoPrincipalParams } from '../navigation/config';
import { ScrollView } from 'react-native';
import { Button, ButtonGroup, withTheme, Input } from '@rneui/themed';


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

   return (
    <ImageBackground style={styles.container}
    source={require('./../../../assets/images/acesso.jpeg')}
  >
<View>
<Text style={[styles.texto, { marginTop: 220 }]}>Força de preensão palmar em kg</Text>
<Input placeholder=''    
    inputStyle={{color:"white"}} 
    onChangeText={setForcaPalmar}
    value={forcaPalmar} />
{/* <Text style={[styles.texto, { marginTop: 10 }]}>Teste do sentar e levantar da cadeira em segundos</Text>
<Input placeholder=''    
    inputStyle={{color:"white"}} 
    onChangeText={setTempoLevantar}
    value={tempoLevantar} />
<Text style={[styles.texto]}>Massa muscular esquelética apendicular (MMEA):</Text>
<Input placeholder=''    
    inputStyle={{color:"white"}} 
    onChangeText={setMassaMuscularApendicular}
    value={massaMuscularApendicular}/>
<Text style={[styles.texto]}>Índice de massa muscular esquelética apendicular em kg/m²</Text>
<Input placeholder=''    
    inputStyle={{color:"white"}} 
    onChangeText={setIndiceMassaMuscularApendicular}
    value={indiceMassaMuscularApendicular}/>
<Text style={[styles.texto]}>Velocidade de marcha em metros por segundo</Text>
<Input placeholder=''    
    inputStyle={{color:"white"}} 
    onChangeText={setVelocidadeMarcha}
    value={velocidadeMarcha}/>
<Text style={[styles.texto]}>Short Physical Perfomance Battery</Text>
<Input placeholder=''    
    inputStyle={{color:"white"}} 
    onChangeText={setShortPhysicalPerformance}
    value={shortPhysicalPerformance}/>
<Text style={[styles.texto]}>Time Up and Go!!!</Text>
<Input placeholder=''    
    inputStyle={{color:"white"}} 
    onChangeText={setTimeUp}
    value={timeUp}/>

<Text style={[styles.texto]}>Teste de Caminhada de 400 metros em minutos</Text>
<Input placeholder=''    
    inputStyle={{color:"white"}} 
    onChangeText={setCaminhadaCurta}
    value={caminhadaCurta}/>

<Text style={[styles.texto]}>Teste de Caminhada durante 6 minutos metros/segundo</Text>
<Input placeholder=''    
    inputStyle={{color:"white"}} 
    onChangeText={setCaminhadaLonga}
    value={caminhadaLonga}/> */}

  {/* <TextInput
    placeholder=""
    placeholderTextColor="white" 
    onChangeText={setForcaPalmar}
    value={forcaPalmar}
    style={{ width: 350,
      height:30,
      //borderWidth: 1,
      //borderRadius: 80,
      marginBottom:20,
      marginTop:300,
      fontSize:20,
      paddingHorizontal: 10, }}
  /> */}
  {/* <TextInput
    placeholder="Teste do sentar e levantar da cadeira em segundos"
    placeholderTextColor="white" 
    onChangeText={setTempoLevantar}
    value={tempoLevantar}
    style={{ width: 350,
      height:30,
      borderWidth: 1,
      borderRadius: 80,
      marginBottom:20,
      fontSize:20,
      paddingHorizontal: 10, }}
  />
<TextInput
    placeholder="Massa muscular esquelética apendicular (MMEA): "
    placeholderTextColor="white" 
    onChangeText={setMassaMuscularApendicular}
    value={massaMuscularApendicular}
    style={{ width: 350,
      height:30,
      borderWidth: 1,
      borderRadius: 80,
      marginBottom:20,
      fontSize:20,
      paddingHorizontal: 10, }}
  />
  <TextInput
    placeholder="Índice de massa muscular esquelética apendicular em kg/m²"
    placeholderTextColor="white" 
    onChangeText={setIndiceMassaMuscularApendicular}
    value={indiceMassaMuscularApendicular}
    style={{ width: 350,
      height:30,
      borderWidth: 1,
      borderRadius: 80,
      marginBottom:20,
      fontSize:20,
      paddingHorizontal: 10, }}
  />
  <TextInput
    placeholder="Velocidade de marcha em metros por segundo"
    placeholderTextColor="white" 
    onChangeText={setVelocidadeMarcha}
    value={velocidadeMarcha}
    style={{ width: 350,
      height:30,
      borderWidth: 1,
      borderRadius: 80,
      marginBottom:20,
      fontSize:20,
      paddingHorizontal: 10, }}
  />
  <TextInput
    placeholder="Short Physical Perfomance Battery"
    placeholderTextColor="white" 
    onChangeText={setShortPhysicalPerformance}
    value={shortPhysicalPerformance}
    style={{ width: 350,
      height:30,
      borderWidth: 1,
      borderRadius: 80,
      marginBottom:20,
      fontSize:20,
      paddingHorizontal: 10, }}
  />
  <TextInput
    placeholder="Time Up and Go"
    placeholderTextColor="white" 
    onChangeText={setTimeUp}
    value={timeUp}
    style={{ width: 350,
      height:30,
      borderWidth: 1,
      borderRadius: 80,
      marginBottom:20,
      fontSize:20,
      paddingHorizontal: 10, }}
  />
<TextInput
    placeholder="Teste de Caminhada de 400 metros em minutos"
    placeholderTextColor="white" 
    onChangeText={setCaminhadaCurta}
    value={caminhadaCurta}
    style={{ width: 350,
      height:30,
      borderWidth: 1,
      borderRadius: 80,
      marginBottom:20,
      fontSize:20,
      paddingHorizontal: 10, }}
  />
  <TextInput
    placeholder="Teste de Caminhada durante 6 minutos metros/segundo"
    placeholderTextColor="white" 
    onChangeText={setCaminhadaLonga}
    value={caminhadaLonga}
    style={{ width: 350,
      height:30,
      borderWidth: 1,
      borderRadius: 80,
      marginBottom:20,
      fontSize:20,
      paddingHorizontal: 10, }}
  /> */}
  <Button 
      title="Preencher Formulario"
      style={styles.button}
      containerStyle={{ marginTop: 10, borderRadius: 80}} 
      buttonStyle={{ backgroundColor: 'black',borderRadius: 80}}
     onPress={() => navigation.navigate('formularioSarcF')}  
      raised={true}></Button>
      <Button title="Voltar" onPress={() => navigation.goBack()}
      containerStyle={{ marginTop: 10, borderRadius: 80}} 
      buttonStyle={{ backgroundColor: 'black',borderRadius: 80}}
     raised={true}></Button>
</View>            
</ImageBackground>

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
      fontSize:10
    },
  button: {
    backgroundColor: 'black',
    borderRadius: 80,
    height: 40,
    width: 300,
    marginTop:10
  },
  botaoVoltar:{
    borderRadius: 80,
    height: 40,
    width: 300,
    backgroundColor: 'black' 
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 5,
  },

});
