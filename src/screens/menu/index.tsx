import * as React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'
import { NavegacaoPrincipalParams } from '../../screens/navigation/config';

export function MenuScreen(props: any) {
  type navProps = StackNavigationProp<NavegacaoPrincipalParams,  'menu' , 'cadastroPaciente'>;
  const navigation = useNavigation<navProps>();
  return (
  
      <ImageBackground style={styles.container}
        source={require('./../../../assets/images/verde.jpg')}
      >
        <Text>  MENU  </Text>
      <Button 
          title="Profissional da Saúde"
          style={styles.button}
          containerStyle={{ marginTop: 250, borderRadius: 80}} 
          buttonStyle={{ backgroundColor: 'green',borderRadius: 80}}
         onPress={() => navigation.navigate('cadastroProfissional')}  
          raised={true}></Button>
        <Button 
          title="Cadastro Paciente"
          style={styles.button}
          containerStyle={{   marginTop:15,borderRadius: 80}} 
          buttonStyle={{ backgroundColor: 'green' ,borderRadius: 80}}
        onPress= {() => navigation.navigate('cadastroPaciente')} 
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
  button: {
    borderRadius: 80,
    height: 40,
    width: 160,
  },
});