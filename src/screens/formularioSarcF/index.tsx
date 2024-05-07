import React, {useState} from "react";
import { Text, ImageBackground, StyleSheet,TextInput} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { NavegacaoPrincipalParams } from '../navigation/config';
import { Button } from '@rneui/themed';
//import RNPickerSelect from 'react-native-picker-select';
import { Picker } from '@react-native-picker/picker'
import { usePacienteContext } from "../../context/pacientes";

export function FormularioSarcFScreen (props: any) {
    const [forca, setForca] = useState('');
    const [assistencia, setAssistencia] = useState ('');
    const [ levantar, setLevantar] = useState(''); 
    const [ subir, setSubir] = useState(''); 
    const [ quedas, setQuedas] = useState(''); 

    type navProps = StackNavigationProp<NavegacaoPrincipalParams,  'menu' , 'formularioDesempenho'>;
    const navigation = useNavigation<navProps>();
    const  { setPontosSarc } = usePacienteContext();
    // =====================================
    const getPontos = (variavel: string) => {
      switch(variavel) { 
        case "alguma": return 1; 
        case "muito": return 2; 
        case "incapaz": return 3; 
        default: return 0;
      }
    }

    const handleAvancar = async () => {
      let pontos = 0;
      pontos += getPontos(forca);
      pontos += getPontos(assistencia);
      pontos += getPontos(levantar);
      pontos += getPontos(subir);
      pontos += getPontos(quedas);
     
      setPontosSarc(pontos);
      navigation.navigate('formularioDesempenho');
    }

   return (
       <ImageBackground style={styles.container}
        source={require('./../../../assets/images/formSarcF.png')}
      >
        <Text style={[styles.texto, { marginTop: 100 }]}>Qual a sua dificuldade em carregar 10 libras (4.5kg)?</Text>
        <Picker
          selectedValue={forca}
          onValueChange={(value) => setForca(value)}
          style={{color: 'white'}}
          placeholder="Selecione">
            <Picker.Item label='Nenhuma' value='nenhuma'/>
            <Picker.Item label='Alguma' value='alguma' />
            <Picker.Item label='Muito' value='muito'/>
            <Picker.Item label='Incapaz' value='incapaz' />
          </Picker>
        <Text style={styles.texto}>Qual a sua dificuldade em caminhar através de um cômodo?</Text>
        <Picker
          placeholder="Selecione"
          selectedValue={assistencia}
          style={{color: 'white'}}
          onValueChange={(value) => setAssistencia(value)}>
            <Picker.Item label='Nenhuma' value='nenhuma'/>
            <Picker.Item label='Alguma' value='alguma' />
            <Picker.Item label='Muito' value='muito'/>
            <Picker.Item label='Incapaz' value='incapaz' />
          </Picker>
        <Text style={styles.texto}>Qual a sua dificuldade para levantar de uma cadeira ou cama?</Text>
        <Picker
          placeholder="Selecione"
          selectedValue={levantar}
          style={{color: 'white'}}
          onValueChange={(value) => setLevantar(value)}>
            <Picker.Item label='Nenhuma' value='nenhuma'/>
            <Picker.Item label='Alguma' value='alguma' />
            <Picker.Item label='Muito' value='muito'/>
            <Picker.Item label='Incapaz sem ajuda' value='incapaz' />
          </Picker>
        <Text style={styles.texto}>Qual a sua dificuldade em subir 10 degraus?</Text>
        <Picker
          placeholder="Selecione"
          selectedValue={subir}
          style={{color: 'white'}}
          onValueChange={(value) => setSubir(value)}>
            <Picker.Item label='Nenhuma' value='nenhuma'/>
            <Picker.Item label='Alguma' value='alguma' />
            <Picker.Item label='Muito' value='muito'/>
            <Picker.Item label='Incapaz' value='incapaz' />
          </Picker>
        <Text style={styles.texto}>Quantas vezes você caiu no último ano ?</Text>
        <Picker
          placeholder="Selecione"
          selectedValue={quedas}
          style={{color: 'white'}}
          onValueChange={(value) => setQuedas(value)}>
            <Picker.Item label='Nenhuma' value='nenhuma'/>
            <Picker.Item label='1 a 3' value='alguma' />
            <Picker.Item label='4 ou mais' value='muito'/>
          </Picker>
          <Button 
          title="Formulário Desempenho"
          style={styles.button}
          containerStyle={{borderRadius: 80,width: 320, marginLeft:40}} 
          buttonStyle={{ backgroundColor: 'blue',borderRadius: 80}}
         onPress={handleAvancar}  
          raised={true}></Button>
          <Button title="Voltar" onPress={() => navigation.goBack()}
          style={styles.button}
          containerStyle={{borderRadius: 80,width: 320, marginLeft:40, marginTop:10}} 
          buttonStyle={{ backgroundColor: 'blue',borderRadius: 80}}
         raised={true}></Button>             
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
      fontSize:20,
      marginLeft:10,
      fontWeight: 'bold',
    },
    button: {
      backgroundColor: 'blue',
      borderRadius: 80,
      height: 40,
      width: 400
    },

});
