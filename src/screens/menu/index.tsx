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
        source={require('./../../../assets/images/menu.png')}
      >

        <Button 
          title="Iniciar Avaliação"
          style={styles.button}
          buttonStyle={styles.button}
          titleStyle={{ color: 'blue' }}
          containerStyle={{marginTop:40,borderRadius: 80}}
          onPress= {() => navigation.navigate('cadastroPaciente')} 
          raised={true}></Button>
          <Button title="Voltar" onPress={() => navigation.goBack()}
         buttonStyle={styles.botaoVoltar}
         containerStyle={{marginTop:40,borderRadius: 80}}
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
    backgroundColor: 'white',
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