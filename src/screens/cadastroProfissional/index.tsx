import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet,TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavegacaoPrincipalParams } from '../navigation/config';
import { ScrollView } from 'react-native';
import { Button, ButtonGroup, withTheme } from '@rneui/themed';


export function CadastroScreen(props: any) {
  const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [isValidEmail, setIsValidEmail] = useState(true);
   const [isValidPassword, setIsValidPassword] = useState(true);
 
  type navProps = StackNavigationProp<NavegacaoPrincipalParams, 'cadastroProfissional'>;
   const navigation = useNavigation();
    
   return (
     <ScrollView contentContainerStyle={styles.scrollContainer}>
     <View style={styles.container}>
       <TextInput
         placeholder="Nome Completo"
         onChangeText={setName}
         value={name}
         style={{ width: 350,
           height:30,
           borderWidth: 1,
           borderRadius: 80,
           marginBottom:20,
           fontSize:20,
           paddingHorizontal: 10, }}
       />
       <TextInput
         placeholder="Email"
         onChangeText={(text) => {
           setEmail(text);
           setIsValidEmail(true);
         }}
         value={email}
         style={{
           width: 350,
           height:30,
           borderWidth: 1,
           borderRadius: 80,
           marginBottom:20,
           fontSize:20,
           paddingHorizontal: 10,
           borderColor: isValidEmail ? 'black' : 'red',
         }}
       />
       {!isValidEmail && <Text style={{ color: 'red',marginTop:-15}}>Email Inválido
 </Text>}
       <TextInput
         placeholder="  Senha"
        onChangeText={setPassword}
         value={password}
         secureTextEntry={true}
         style={{
           width: 350,
           height:30,
           borderWidth: 1,
           borderRadius: 80,
           marginBottom:20,
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
 