import React, {useState} from "react";
import { View, Text, ImageBackground, StyleSheet,TextInput} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { NavegacaoPrincipalParams } from '../navigation/config';
import { ScrollView } from 'react-native';
import { Button, ButtonGroup, withTheme } from '@rneui/themed';
import RNPickerSelect from 'react-native-picker-select';


export function CadastroPaciente (props: any) {
    const [idade, setIdade] = useState('');
    const [sexo, setSexo ] = useState ('');
    const [ raca, setRaca] = useState(''); 
    const [ peso, setPeso] = useState(''); 
    const [ altura, setAltura] = useState(''); 
    const [ circBraco, setCircBraco] = useState(''); 
    const [ circPant, setCircPant] = useState(''); 
    const [ alturaJoelho, setAlturaJoelho] = useState(''); 
    const [ diametroCintura, setDiametroCintura] = useState(''); 
    const [ diametroQuadril, setDiametroQuadril] = useState('');

   const navigation = useNavigation();
   return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <Text>CADASTRO PACIENTE</Text>
      <TextInput
        placeholder="Idade"
        onChangeText={setIdade}
        value={idade}
        style={{ width: 350,
          height:30,
          borderWidth: 1,
          borderRadius: 80,
          marginBottom:20,
          fontSize:20,
          paddingHorizontal: 10, }}
      />
      <RNPickerSelect
          placeholder={{ label: 'Selecione o sexo', value: null }}
          onValueChange={(value) => setSexo(value)}
          items={[
            { label: 'Feminino', value: 'feminino' },
            { label: 'Masculino', value: 'masculino' },
          ]}
          value={sexo}
          style={pickerSelectStyles}
        />
        <RNPickerSelect
          placeholder={{ label: 'Selecione a raça', value: null }}
          onValueChange={(value) => setRaca(value)}
          items={[
            { label: 'Afrodescendente', value: 'afrodescendente' },
            { label: 'Asiático', value: 'asiatico' },
            { label: 'Caucasiano', value: 'caucasiano' },
          ]}
          value={raca}
          style={pickerSelectStyles}
        />
      <TextInput
        placeholder="Peso"
        onChangeText={setPeso}
        value={peso}
        style={{ width: 350,
          height:30,
          borderWidth: 1,
          borderRadius: 80,
          marginBottom:20,
          fontSize:20,
          paddingHorizontal: 10, }}
      />
    <TextInput
        placeholder="Altura"
        onChangeText={setAltura}
        value={altura}
        style={{ width: 350,
          height:30,
          borderWidth: 1,
          borderRadius: 80,
          marginBottom:20,
          fontSize:20,
          paddingHorizontal: 10, }}
      />
      <TextInput
        placeholder="Circunferência do Braço"
        onChangeText={setCircBraco}
        value={circBraco}
        style={{ width: 350,
          height:30,
          borderWidth: 1,
          borderRadius: 80,
          marginBottom:20,
          fontSize:20,
          paddingHorizontal: 10, }}
      />
      <TextInput
        placeholder="Circunferência da Panturrilha"
        onChangeText={setCircPant}
        value={circPant}
        style={{ width: 350,
          height:30,
          borderWidth: 1,
          borderRadius: 80,
          marginBottom:20,
          fontSize:20,
          paddingHorizontal: 10, }}
      />
      <TextInput
        placeholder="Altura do Joelho"
        onChangeText={setAlturaJoelho}
        value={alturaJoelho}
        style={{ width: 350,
          height:30,
          borderWidth: 1,
          borderRadius: 80,
          marginBottom:20,
          fontSize:20,
          paddingHorizontal: 10, }}
      />
      <TextInput
        placeholder="Diâmetro da Cintura"
        onChangeText={setDiametroCintura}
        value={diametroCintura}
        style={{ width: 350,
          height:30,
          borderWidth: 1,
          borderRadius: 80,
          marginBottom:20,
          fontSize:20,
          paddingHorizontal: 10, }}
      />
    <TextInput
        placeholder="Diâmetro do Quadril"
        onChangeText={setDiametroQuadril}
        value={diametroQuadril}
        style={{ width: 350,
          height:30,
          borderWidth: 1,
          borderRadius: 80,
          marginBottom:20,
          fontSize:20,
          paddingHorizontal: 10, }}
      />
       <Button
          title=" Cadastrar"
          buttonStyle={styles.button}
          containerStyle={{marginTop:15,borderRadius: 80}} 
          raised={true}></Button>
          <Button title="Voltar" onPress={() => navigation.goBack()}
           buttonStyle={styles.botaoVoltar}
           containerStyle={{ borderRadius: 30, marginTop: 15 }}
         raised={true}></Button>
              
    </View>
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
    alignItems: 'center',
    marginTop: 200,
  },
  inputContainer: {
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 80,
    height: 40,
    width: 300
  },
  botaoVoltar:{
    borderRadius: 80,
    height: 40,
    width: 300,
    backgroundColor: 'green' 
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 5,
    marginBottom: 55,
  },

});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 20,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'black',
      marginBottom:20,
      borderRadius: 80,
      color: 'black',
      paddingRight: 30,
      backgroundColor: 'white',  justifyContent: 'center',
      alignItems: 'center',
      width: 350,
      marginLeft:40,
      height: 30, 
    }
});