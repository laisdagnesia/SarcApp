import React, {useState} from "react";
import { Text, ImageBackground, StyleSheet,TextInput,ScrollView, Alert} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { NavegacaoPrincipalParams } from '../navigation/config';
import { Button,Input } from '@rneui/themed';
//import RNPickerSelect from 'react-native-picker-select';
import { Picker } from '@react-native-picker/picker'
import { usePacienteContext } from "../../context/pacientes";
export function CadastroPaciente (props: any) {
    const [idade, setIdade] = useState('');
    const [sexo, setSexo ] = useState('');
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
      if (idade.trim() === '' || isNaN(Number(idade))) {
        Alert.alert('Por favor, insira uma idade válida.');
        return; 
      }
      if (sexo.trim() === '') {
        Alert.alert('Por favor, selecione o sexo.');
        return; 
      }
      if (raca.trim() === '') {
        Alert.alert('Por favor, selecione a raça.');
        return; 
      }
      navigation.navigate('formularioSarcF')
    }
    // ================================
   return (
    <ScrollView >
       <ImageBackground style={styles.container}
        source={require('./../../../assets/images/dadosPaciente.png')}
      >
      <Text style={[styles.texto, { marginTop: 110 }]}>Idade</Text>
        <Input
          placeholder=""
          placeholderTextColor={'white'}
          onChangeText={setIdade}
          value={idade}
          keyboardType="number-pad"
          style={{ width: 200,color: 'white', marginBottom:-5}}
        />
        <Text style={[styles.texto, { marginTop: 10, marginBottom:10 }]}>Selecione o sexo</Text>
        <Picker
          placeholder=""
          selectedValue={sexo}
          style={{color: 'white'}}
          onValueChange={(value) => setSexo(value)}
          selectionColor={'white'}
          >
            <Picker.Item label='Selecione o sexo' value='' />
            <Picker.Item label='Feminino' value='feminino'/>
            <Picker.Item label='Masculino' value='masculino' />
          </Picker>
          <Text style={[styles.texto, { marginTop: 10, marginBottom:10 }]}>Selecione a raça</Text>
          <Picker
          placeholder=""
          style={{color: 'white'}}
          selectedValue={raca}
          onValueChange={(value) => setRaca(value)}
          >
            <Picker.Item label='Selecione a raça' value='' />
            <Picker.Item label='Afrodescendente' value='afrodescendente'/>
            <Picker.Item label='Asiático' value='asiatico' />
            <Picker.Item label='Caucasiano' value='caucasiano'/>
          </Picker>

      <Text style={[styles.texto,{ marginTop: 20}]}>Peso</Text>
        <Input
         placeholder="Ex: 65.8"
         placeholderTextColor="white" 
         onChangeText={setPeso}
         value={peso}
         keyboardType="number-pad"
          style={{color: 'white',marginBottom:-5}}
        />
      <Text style={[styles.texto]}>Altura</Text>
        <Input
          placeholder="Ex: 1.70"
          placeholderTextColor="white" 
          onChangeText={setAltura}
          value={altura}
          keyboardType="number-pad"
          style={{color: 'white',marginBottom:-5 }}
        />
      <Text style={[styles.texto]}>Circunferência do Braço</Text>
        <Input
         placeholder="Em cm"
         placeholderTextColor="white" 
         onChangeText={setCircBraco}
         value={circBraco}
         keyboardType="number-pad"
          style={{color: 'white',marginBottom:-5 }}
        />
      <Text style={[styles.texto]}>Circunferência da Panturrilha</Text>
        <Input
       placeholder="Em cm"
       placeholderTextColor="white" 
       onChangeText={setCircPant}
       keyboardType="number-pad"
       value={circPant}
          style={{color: 'white',marginBottom:-5 }}
        /> 
      <Text style={[styles.texto]}>Altura do Joelho</Text>
        <Input
          placeholder="Em cm"
          placeholderTextColor="white" 
          onChangeText={setAlturaJoelho}
          value={alturaJoelho}
          keyboardType="number-pad"
          style={{color: 'white',marginBottom:-5 }}
          />
      <Text style={[styles.texto]}>Diâmetro da Cintura</Text>
        <Input
          placeholder="Em cm"
          placeholderTextColor="white" 
          onChangeText={setDiametroCintura}
          value={diametroCintura}
          keyboardType="number-pad"
          style={{color: 'white',marginBottom:-5 }}
          />
      <Text style={[styles.texto]}>Diâmetro do Quadril</Text>
        <Input
        placeholder="Em cm"
        placeholderTextColor="white" 
        onChangeText={setDiametroQuadril}
        value={diametroQuadril}
        keyboardType="number-pad"
          style={{color: 'white',marginBottom:-5 }}
        />


          <Button 
          title="Preencher Sarc-F"
          style={styles.button}
          titleStyle={{ color: 'blue' }}
          containerStyle={{borderRadius: 80,width: 320, marginLeft:30}} 
          buttonStyle={{ backgroundColor: 'white',borderRadius: 80}}
         onPress={handleAvancar}  
          raised={true}></Button>
          <Button title="Voltar" onPress={() => navigation.goBack()}
            containerStyle={{borderRadius: 80,width: 320, marginLeft:30,marginTop:10}} 
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
  },
  inputContainer: {
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'white',
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

  // scrollContainer: {
  // // // marginBottom: 55,
  // //  // marginTop: 190,
  // //   //marginRight:150
  // }
});