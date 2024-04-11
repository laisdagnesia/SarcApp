import { CadastroScreen } from "../cadastroProfissional";
import { MenuScreen } from "../menu";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { CadastroPaciente } from "../cadastroPaciente";
import { AcessoScreen } from "../acesso";
import { FormularioSarcFScreen } from "../formularioSarcF";
import { FormularioDesempenhoScreen } from "../formularioDesempenho";

export type NavegacaoPrincipalParams = {
    acesso: undefined,
    menu: undefined,
    cadastroProfissional: undefined,
    cadastroPaciente: undefined,
    formularioSarcF: undefined,
    formularioDesempenho: undefined,

}

const Stack = createStackNavigator<NavegacaoPrincipalParams>();

export const TelaConfiguracao = () => (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="acesso" component={AcessoScreen}/>
            <Stack.Screen name="menu" component={MenuScreen}/>
            <Stack.Screen name="cadastroProfissional" component={CadastroScreen} />
            <Stack.Screen name="cadastroPaciente" component={CadastroPaciente} />
            <Stack.Screen name="formularioSarcF" component={FormularioSarcFScreen} />
            <Stack.Screen name="formularioDesempenho"component={FormularioDesempenhoScreen}/>
        </Stack.Navigator>

    </NavigationContainer>
)