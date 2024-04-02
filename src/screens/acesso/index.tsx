import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TextInput} from 'react-native';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'
import { NavegacaoPrincipalParams } from '../../screens/navigation/config';

export function AcessoScreen(props: any) {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [isValidEmail, setIsValidEmail] = useState(true);
     const [isValidPassword, setIsValidPassword] = useState(true);

     type navProps = StackNavigationProp<NavegacaoPrincipalParams,  'menu' , 'cadastroPaciente'>;
     const navigation = useNavigation<navProps>();
      
     return (
        <ImageBackground style={styles.container}
          source={require('./../../../assets/images/acesso.png')}
        > 
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
          title="Login"
          style={styles.button}
          containerStyle={{   marginTop:15,borderRadius: 80}} 
          buttonStyle={{ backgroundColor: 'green' ,borderRadius: 80}}
        onPress= {() => navigation.navigate('menu')} 
          raised={true}></Button>
           <Text style={{ marginTop: 20,fontSize:15 }}>Não possui cadastro?{' '}
          <Text style={{ color: 'blue', textDecorationLine: 'underline' }}
        onPress={() => navigation.navigate('cadastroProfissional')}>Clique aqui</Text>.</Text>
                 
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
   
   });
   