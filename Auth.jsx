import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/authpage/LoginScreen';
import SignupScreen from './src/screens/authpage/SignupScreen';
import PassScreen from './src/screens/authpage/PassScreen';
import AuthPassword from './src/screens/authpage/AuthPassword';
import AgreementScreen from './src/screens/authpage/AgreementScreen';
import AuthNewPassword from './src/screens/authpage/AuthNewPassword';
import { COLORS } from './src/constants/color';

const Stack = createNativeStackNavigator();

function Auth(props) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: COLORS.sub,
                    shadowColor: 'transparent',
                    elevation: 0,
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerTintColor: COLORS.white,
                title:'',
            }}>
            <Stack.Screen
            name="SignIn"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignupScreen}
          />
           <Stack.Screen
            name="Pass"
            component={PassScreen}
          />
            <Stack.Screen
            name="Password"
            component={AuthPassword}
          />
            <Stack.Screen
            name="NewPassword"
            component={AuthNewPassword}
          />
            <Stack.Screen
            name="Agreement"
            component={AgreementScreen}
          />
        </Stack.Navigator>
    );
}

export default Auth;