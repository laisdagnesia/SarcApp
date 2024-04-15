import React, {useState} from "react";
import { View, Text, ImageBackground, StyleSheet,TextInput,ScrollView} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { NavegacaoPrincipalParams } from '../navigation/config';
import { Button,Input } from '@rneui/themed';
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

    type navProps = StackNavigationProp<NavegacaoPrincipalParams,  'formularioSarcF' , 'cadastroPaciente'>;
    const navigation = useNavigation<navProps>();

  
   return (
       <ImageBackground style={styles.container}
        source={require('./../../../assets/images/dados.png')}
      >
      {/* <Text style={[styles.label, {marginTop: 200, marginBottom:-150}]}>Idade</Text> */} 
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Input
          placeholder="Idade"
          placeholderTextColor={'white'}
          onChangeText={setIdade}
          value={idade}
          style={{ width: 200, marginBottom: 10, marginTop:140,color: 'white'}}
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
        <Input
         placeholder="Peso"
         placeholderTextColor="white" 
         onChangeText={setPeso}
         value={peso}
          style={{ width: 200, marginBottom: 10,color: 'white'  }}
        />
        <Input
          placeholder="Altura"
          placeholderTextColor="white" 
          onChangeText={setAltura}
          value={altura}
          style={{ width: 200, marginBottom: 10,color: 'white' }}
        />
        <Input
         placeholder="Circunferência do Braço"
         placeholderTextColor="white" 
         onChangeText={setCircBraco}
         value={circBraco}
          style={{ width: 200, marginBottom: 10,color: 'white' }}
        />
        <Input
       placeholder="Circunferência da Panturrilha"
       placeholderTextColor="white" 
       onChangeText={setCircPant}
       value={circPant}
          style={{ width: 200, marginBottom: 10,color: 'white' }}
        /> 
     <Input
      placeholder="Altura do Joelho"
      placeholderTextColor="white" 
      onChangeText={setAlturaJoelho}
      value={alturaJoelho}
         style={{ width: 200, marginBottom: 10,color: 'white' }}
       />
       <Input
      placeholder="Diâmetro da Cintura"
      placeholderTextColor="white" 
      onChangeText={setDiametroCintura}
      value={diametroCintura}
         style={{ width: 200, marginBottom: 10,color: 'white' }}
       />
       <Input
      placeholder="Diâmetro do Quadril"
      placeholderTextColor="white" 
      onChangeText={setDiametroQuadril}
      value={diametroQuadril}
         style={{ width: 200, marginBottom: 10,color: 'white' }}
       />
          <Button 
          title="Preencher Formulario"
          style={styles.button}
          containerStyle={{ marginTop: 10, borderRadius: 80}} 
          buttonStyle={{ backgroundColor: 'blue',borderRadius: 80}}
         onPress={() => navigation.navigate('formularioSarcF')}  
          raised={true}></Button>
          <Button title="Voltar" onPress={() => navigation.goBack()}
          containerStyle={{ marginTop: 10, borderRadius: 80}} 
          buttonStyle={{ backgroundColor: 'blue',borderRadius: 80}}
         raised={true}></Button>
      </View>
      </ScrollView>
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
    padding: 5,
   //alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 80,
    height: 40,
    width: 300
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 5,
    marginBottom: 55,
    //marginRight:150
  }
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom:30,
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    backgroundColor: 'transparent',

  },  
});