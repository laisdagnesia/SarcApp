import React, {useState} from "react";
import { Text, ImageBackground, StyleSheet,TextInput} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { NavegacaoPrincipalParams } from '../navigation/config';
import { ScrollView } from 'react-native';
import { Button, ButtonGroup, withTheme } from '@rneui/themed';
import RNPickerSelect from 'react-native-picker-select';
import { color } from "@rneui/base";


export function FormularioSarcFScreen (props: any) {
    const [forca, setForca] = useState('');
    const [assistencia, setAssistencia] = useState ('');
    const [ levantar, setLevantar] = useState(''); 
    const [ subir, setSubir] = useState(''); 
    const [ quedas, setQuedas] = useState(''); 


    type navProps = StackNavigationProp<NavegacaoPrincipalParams,  'menu' , 'formularioDesempenho'>;
    const navigation = useNavigation<navProps>();

   return (
       <ImageBackground style={styles.container}
        source={require('./../../../assets/images/formSarcF.png')}
      >
        <Text style={[styles.texto, { marginTop: 100 }]}>Qual a sua dificuldade em carregar 10 libras (4.5kg)?</Text>
      <RNPickerSelect
          placeholder={{ label: 'Selecione', value: null }}
          onValueChange={(value) => setForca(value)}
          items={[
            { label: 'Nenhuma', value: 'nenhuma' },
            { label: 'Alguma', value: 'alguma' },
            { label: 'Muito', value: 'muito' },
            { label: 'Incapaz', value: 'incapaz' },
          ]}
          value={forca}
          style={pickerSelectStyles}
        />
        <Text style={styles.texto}>Qual a sua dificuldade em caminhar através de um cômodo?</Text>
        <RNPickerSelect
          placeholder={{ label: 'Selecione', value: null }}
          onValueChange={(value) => setAssistencia(value)}
          items={[
            { label: 'Nenhuma', value: 'nenhuma' },
            { label: 'Alguma', value: 'alguma' },
            { label: 'Muita', value: 'muita' },
            { label: 'Incapaz', value: 'incapaz' },
          ]}
          value={assistencia}
         style={pickerSelectStyles}
        />
        <Text style={styles.texto}>Qual a sua dificuldade para levantar de uma cadeira ou cama?</Text>
         <RNPickerSelect
          placeholder={{ label: 'Selecione', value: null }}
          onValueChange={(value) => setLevantar(value)}
          items={[
            { label: 'Nenhuma', value: 'nenhuma' },
            { label: 'Alguma', value: 'alguma' },
            { label: 'Muito', value: 'muito' },
            { label: 'Incapaz sem ajuda', value: 'incapaz' },
          ]}
          value={levantar}
         style={pickerSelectStyles}
        />
        <Text style={styles.texto}>Qual a sua dificuldade em subir 10 degraus?</Text>
        <RNPickerSelect
          placeholder={{ label: 'Selecione', value: null }}
          onValueChange={(value) => setSubir(value)}
          items={[
            { label: 'Nenhuma', value: 'nenhuma' },
            { label: 'Alguma', value: 'alguma' },
            { label: 'Muito', value: 'muito' },
            { label: 'Incapaz', value: 'incapaz' },
          ]}
          value={subir}
         style={pickerSelectStyles}
        />
        <Text style={styles.texto}>Quantas vezes você caiu no último ano ?</Text>
         <RNPickerSelect
          placeholder={{ label: 'Selecione', value: null }}
          onValueChange={(value) => setQuedas(value)}
          items={[
            { label: 'Nenhuma', value: 'nenhuma' },
            { label: ' 1 a 3', value: '1 a 3' },
            { label: '4 ou mais', value: '4 ou mais' },
          ]}
          value={quedas}
        style={pickerSelectStyles}
        />
          <Button 
          title="Formulário Desempenho"
          style={styles.button}
          containerStyle={{borderRadius: 80,width: 320, marginLeft:40}} 
          buttonStyle={{ backgroundColor: 'blue',borderRadius: 80}}
         onPress={() => navigation.navigate('formularioDesempenho')}  
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
      marginLeft:10
    },
    button: {
      backgroundColor: 'blue',
      borderRadius: 80,
      height: 40,
      width: 400
    },

});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 20,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'white',
      marginBottom:20,
      borderRadius: 80,
      color: 'white',
      paddingRight: 30,
      backgroundColor: 'white',  justifyContent: 'center',
      alignItems: 'center',
    }
});