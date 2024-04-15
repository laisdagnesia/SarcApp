import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TextInput} from 'react-native';
import { Button, Input } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'
import { NavegacaoPrincipalParams } from '../navigation/config';
import { Icon } from 'react-native-elements'
export function AcessoScreen(props: any) {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [isValidEmail, setIsValidEmail] = useState(true);
     const [isValidPassword, setIsValidPassword] = useState(true);

     type navProps = StackNavigationProp<NavegacaoPrincipalParams,  'menu' , 'cadastroPaciente'>;
     const navigation = useNavigation<navProps>();
      
     return (
        <ImageBackground style={styles.container}
          source={require('./../../../assets/images/acesso.jpeg')}
        > 
        <Input placeholder='E-mail' 
        placeholderTextColor={'white'}
       leftIcon={{name:'person', color:'white'}}
       inputStyle={{color:'white'}} 
       onChangeText={(text) => {
        setEmail(text);
        setIsValidEmail(true);
      }}
      value={email}/>
      {!isValidEmail && <Text style={{ color: 'red',marginTop:-15}}>Email Inválido
   </Text>}
       <Input placeholder='Senha' 
       placeholderTextColor={'white'}
       leftIcon={{name:'lock', color:'white'}}
       inputStyle={{color:'white'}}
       secureTextEntry={true} 
       onChangeText={setPassword}
      value={password}/>
           {!isValidPassword && <Text style={{ color: 'red', marginTop:-15 }}>Senha Inválida
           !</Text>}

         {/* <TextInput
           placeholder="Email"
           placeholderTextColor={'black'}
           onChangeText={(text) => {
             setEmail(text);
             setIsValidEmail(true);
           }}
           value={email}
           style={{
             width: 350,
             height:30,
             color:'black',
             borderWidth: 1,
             backgroundColor:'white',
             borderRadius: 80,
             marginBottom:20,
             fontSize:20,
             paddingHorizontal: 10,
             borderColor: isValidEmail ? 'black' : 'red',
           }}
         />
         {!isValidEmail && <Text style={{ color: 'red',marginTop:-15}}>Email Inválido
   </Text>} */}
         {/* <TextInput
           placeholder="  Senha"
           placeholderTextColor={'black'}
          onChangeText={setPassword}
           value={password}
           secureTextEntry={true}
           style={{
             width: 350,
             height:30,
             borderWidth: 1,
             backgroundColor:'white',
             borderRadius: 80,
             marginBottom:20,
             fontSize:20,
             borderColor: isValidPassword ? 'black' : 'red',
           }}
         />
           {!isValidPassword && <Text style={{ color: 'red', marginTop:-15 }}>Senha Inválida
   !</Text>} */}
   <Button 
          title="LOGIN"
          style={styles.button} 
          buttonStyle={styles.button}
          containerStyle={{marginTop:15,borderRadius: 80}} 
          onPress= {() => navigation.navigate('menu')} 
          raised={true}></Button>
           <Text style={{ marginTop: 20,fontSize:15, color:'white' }}>Não possui cadastro?{' '}
          <Text style={{ color: 'blue', textDecorationLine: 'underline' }}
          onPress={() => navigation.navigate('cadastroProfissional')}>Clique aqui</Text>.</Text>
          <Text style={{ marginTop: 20,fontSize:15, color:'white' }}>Esqueceu a senha?{' '}
          <Text style={{ color: 'blue', textDecorationLine: 'underline' }}
        // onPress={() => navigation.navigate('cadastroProfissional')}
        >Clique aqui</Text>.</Text>
                 
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
       backgroundColor: 'blue',
       color: 'red',
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
   