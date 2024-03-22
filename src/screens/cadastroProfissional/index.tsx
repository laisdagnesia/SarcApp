import React, { useState } from 'react';
//import comida from './../../../assets/images/comida.jpeg';
import { View, Text, ImageBackground, StyleSheet, Alert,TextInput} from 'react-native';
import { Button,Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { StackNavigationProp } from '@react-navigation/stack';
//import { NavegacaoPrincipalParams } from '../../navigation/configuracoes';
//import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
//import { getFirestore, setDoc, doc } from '@firebase/firestore';
import { ScrollView } from 'react-native';

export interface LoginscreenProps {
}


export function Loginscreen (props: LoginscreenProps) {
    return (
      <View>
          <TextInput placeholder='Nome Completo'/>
      </View>
    );
}

// export function CadastroProfissionalScreen(props: LoginscreenProps){
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [isValidEmail, setIsValidEmail] = useState(true);
//     const [isValidPassword, setIsValidPassword] = useState(true);
// }

// const handleSignIn =async ()=> {

// return (
// <TextInput 
// placeholder='Nome Completo'
// //onChange={setName}
// />

// }