import React, { useState } from 'react';
import { Text, ImageBackground, StyleSheet,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavegacaoPrincipalParams } from '../navigation/config';
import { Button, Input } from '@rneui/themed';
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin"
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import { getFirestore, setDoc, doc } from '@firebase/firestore';

export function CadastroScreen(props: any) {
  const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [isValidEmail, setIsValidEmail] = useState(true);
   const [isValidPassword, setIsValidPassword] = useState(true);
 
   type navProps = StackNavigationProp<NavegacaoPrincipalParams,  'login' , 'menu'>;
   const navigation = useNavigation<navProps>();
   const auth = getAuth(); 
   const db = getFirestore();

   createUserWithEmailAndPassword(auth, email, password)
            // .then(usuario => console.log('Usuário criado'))
            // .catch(error => console.log('Não criou usuário'))

  const handleSignIn = async () => {
    try {
     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
     const { user } = userCredential;
     await setDoc(doc(db, 'usuarios', email), {email});
     Alert.alert('Error', 'Usuario Criado');
     navigation.navigate('login');
    } 
    catch (error) {
      console.error('Error creating user:', error);
     Alert.alert('Error', 'Não foi possível criar o usuário, tente novamente.');
} 
};

   const logar = async() => {
    try {
      GoogleSignin.configure();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      navigation.navigate('menu')
      console.log(userInfo)
    } catch(e) {
      console.log(e);
    }
  }
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
        placeholderTextColor={'white'}
        onChangeText={setPassword}
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
           onPress= {handleSignIn}
           raised={true}></Button>
           <Button title="Voltar" onPress={() => navigation.goBack()}
            buttonStyle={styles.botaoVoltar}
            containerStyle={{ borderRadius: 30, marginTop: 15, marginBottom:15 }}
            raised={true}></Button>
               
          <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={logar}
        />
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
 