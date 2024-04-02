import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {CadastroScreen} from './src/screens/cadastroProfissional/index'
import {TelaConfiguracao} from './src/screens/navigation/config';
import { MenuScreen } from './src/screens/menu';

export default function App() {
  return (
  <TelaConfiguracao/>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
