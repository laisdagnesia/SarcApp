import { CadastroScreen } from "../cadastroProfissional";
import { MenuScreen } from "../menu";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { CadastroPaciente } from "../cadastroPaciente";


export type NavegacaoPrincipalParams = {
    menu: undefined,
    cadastroProfissional: undefined,
    cadastroPaciente: undefined,

}

const Stack = createStackNavigator<NavegacaoPrincipalParams>();


export const TelaConfiguracao = () => (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="menu" component={MenuScreen}/>
            <Stack.Screen name="cadastroProfissional" component={CadastroScreen} />
            <Stack.Screen name="cadastroPaciente" component={CadastroPaciente} />
        </Stack.Navigator>

    </NavigationContainer>
)