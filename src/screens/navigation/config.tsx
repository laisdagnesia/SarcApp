import { CadastroScreen } from "../cadastroProfissional";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


export type NavegacaoPrincipalParams = {
    cadastroProfissional: undefined,
}

const Stack = createStackNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="cadastro" component={CadastroScreen}/>
    </NavigationContainer>
)