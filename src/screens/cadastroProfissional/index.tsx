import React, { useState } from 'react';
import { Text, ImageBackground, StyleSheet,TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavegacaoPrincipalParams } from '../navigation/config';
import { ScrollView } from 'react-native';
import { Button, Input } from '@rneui/themed';

export function CadastroScreen(props: any) {
  const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [isValidEmail, setIsValidEmail] = useState(true);
   const [isValidPassword, setIsValidPassword] = useState(true);
 
   type navProps = StackNavigationProp<NavegacaoPrincipalParams,  'menu' , 'cadastroPaciente'>;
   const navigation = useNavigation<navProps>();
    
   return (
    
      <ImageBackground style={styles.container}
        source={require('./../../../assets/images/novo.png')}
      >
       <Input
         placeholder="Nome Completo"
         placeholderTextColor={'white'}
         onChangeText={setName}
         value={name}
         style={{ width: 350,
           height:30,
          color:'white',
          marginBottom:10,
           fontSize:20,
           paddingHorizontal: 10, }}
       />
       <Input
         placeholder="Email"
         placeholderTextColor={'white'}
         onChangeText={(text) => {
           setEmail(text);
           setIsValidEmail(true);
         }}
         value={email}
         style={{
           width: 350,
           height:30,
           color:'white',
           fontSize:20,
           marginBottom:10,
           paddingHorizontal: 10,
           borderColor: isValidEmail ? 'black' : 'red',
         }}
       />
       {!isValidEmail && <Text style={{ color: 'red',marginTop:-15}}>Email Inválido
 </Text>}
       <Input
         placeholder="  Senha"
        onChangeText={setPassword}
        placeholderTextColor={'white'}
         value={password}
         secureTextEntry={true}
         style={{
           width: 350,
           height:30,
           color:'white',
           marginBottom:10,
           fontSize:20,
           borderColor: isValidPassword ? 'black' : 'red',
         }}
       />
         {!isValidPassword && <Text style={{ color: 'red', marginTop:-15 }}>Senha Inválida
 !</Text>}
        <Button
           title=" Cadastrar"
           buttonStyle={styles.button}
           containerStyle={{marginTop:15,borderRadius: 80}} 
           onPress= {() => navigation.navigate('menu')} 
           raised={true}></Button>
           <Button title="Voltar" onPress={() => navigation.goBack()}
            buttonStyle={styles.botaoVoltar}
            containerStyle={{ borderRadius: 30, marginTop: 15 }}
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
     alignItems: 'center',
   },
   inputContainer: {
     backgroundColor: 'white',
   },
   button: {
    backgroundColor: 'blue' ,
     borderRadius: 80,
     height: 40,
     width: 300
   },
   botaoVoltar:{
     borderRadius: 80,
     height: 40,
     width: 300,
     backgroundColor: 'blue'  
   },
 });
 