import React, {useState} from "react";
import { Text, ImageBackground, StyleSheet,TextInput,ScrollView} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { NavegacaoPrincipalParams } from '../navigation/config';
import { Button,Input } from '@rneui/themed';
//import RNPickerSelect from 'react-native-picker-select';
import { Picker } from '@react-native-picker/picker'
import { usePacienteContext } from "../../context/pacientes";
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
    const { setPaciente } = usePacienteContext();
    // ================================
    const handleAvancar = () => {
      setPaciente({
        idade, sexo, raca, peso, altura, circBraco, circPant, alturaJoelho, diametroCintura, diametroQuadril
      })
      navigation.navigate('formularioSarcF')
    }
    // ================================
   return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
       <ImageBackground style={styles.container}
        source={require('./../../../assets/images/dadosPaciente.png')}
      >
      <Text style={[styles.texto, { marginTop: 110 }]}>Idade</Text>
        <Input
          placeholder=""
          placeholderTextColor={'white'}
          onChangeText={setIdade}
          value={idade}
          style={{ width: 200,color: 'white', marginBottom:-10}}
        />
        <Text style={[styles.texto, { marginTop: 10, marginBottom:10 }]}>Selecione o sexo</Text>
        <Picker
          selectedValue={sexo}
          style={{color: 'white'}}
          onValueChange={(value) => setSexo(value)}
          placeholder="Selecione o sexo"
          selectionColor={'white'}
          >
            <Picker.Item label='Feminino' value='feminino'/>
            <Picker.Item label='Masculino' value='masculino' />
          </Picker>
          <Text style={[styles.texto, { marginTop: 10, marginBottom:10 }]}>Selecione a raça</Text>
          <Picker
          placeholder="Selecione a raça"
          style={{color: 'white'}}
          selectedValue={raca}
          onValueChange={(value) => setRaca(value)}
          >
            <Picker.Item label='Afrodescendente' value='afrodescendente'/>
            <Picker.Item label='Asiático' value='asiatico' />
            <Picker.Item label='Caucasiano' value='caucasiano'/>
          </Picker>

      <Text style={[styles.texto,{ marginTop: 20}]}>Peso</Text>
        <Input
         placeholder=""
         placeholderTextColor="white" 
         onChangeText={setPeso}
         value={peso}
          style={{color: 'white',marginBottom:-10, marginBottom:-10}}
        />
      <Text style={[styles.texto]}>Altura</Text>
        <Input
          placeholder=""
          placeholderTextColor="white" 
          onChangeText={setAltura}
          value={altura}
          style={{color: 'white',marginBottom:-10 }}
        />
      <Text style={[styles.texto]}>Circunferência do Braço</Text>
        <Input
         placeholder=""
         placeholderTextColor="white" 
         onChangeText={setCircBraco}
         value={circBraco}
          style={{color: 'white',marginBottom:-10 }}
        />
      <Text style={[styles.texto]}>Circunferência da Panturrilha</Text>
        <Input
       placeholder=""
       placeholderTextColor="white" 
       onChangeText={setCircPant}
       value={circPant}
          style={{color: 'white',marginBottom:-10 }}
        /> 
      <Text style={[styles.texto]}>Altura do Joelho</Text>
        <Input
          placeholder=""
          placeholderTextColor="white" 
          onChangeText={setAlturaJoelho}
          value={alturaJoelho}
          style={{color: 'white',marginBottom:-10 }}
          />
      <Text style={[styles.texto]}>Diâmetro da Cintura</Text>
        <Input
          placeholder=""
          placeholderTextColor="white" 
          onChangeText={setDiametroCintura}
          value={diametroCintura}
          style={{color: 'white',marginBottom:-10 }}
          />
      <Text style={[styles.texto]}>Diâmetro do Quadril</Text>
        <Input
        placeholder=""
        placeholderTextColor="white" 
        onChangeText={setDiametroQuadril}
        value={diametroQuadril}
          style={{color: 'white',marginBottom:-10 }}
        />
          <Button 
          title="Preencher Formulario"
          style={styles.button}
          containerStyle={{ marginTop: 10, borderRadius: 80}} 
          buttonStyle={{ backgroundColor: 'blue',borderRadius: 80}}
         onPress={handleAvancar}  
          raised={true}></Button>
          <Button title="Voltar" onPress={() => navigation.goBack()}
          containerStyle={{ marginTop: 10, borderRadius: 80}} 
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
    paddingTop: 300
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
  texto:{
    color:'white',
    fontSize:20,
    marginLeft:10,
    fontWeight: 'bold',
  },

  scrollContainer: {
  // marginBottom: 55,
   // marginTop: 190,
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