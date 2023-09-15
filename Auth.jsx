import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/authpage/LoginScreen';
import SignupScreen from './src/screens/authpage/SignupScreen';

import AuthPassword from './src/screens/authpage/AuthPassword';
import AgreementScreen from './src/screens/authpage/AgreementScreen';
import AuthNewPassword from './src/screens/authpage/AuthNewPassword';
import { COLORS } from './src/constants/color';
import SignUpInfoScreen from './src/screens/authpage/SignUpInfoScreen';
import SignUpInfoGenderScreen from './src/screens/authpage/SignUpInfoGenderScreen';

const Stack = createNativeStackNavigator();

function Auth(props) {
    return (
        <Stack.Navigator
            // screenOptions={{
            //     headerShown: true,
            //     headerStyle: {
            //         backgroundColor: COLORS.sub,
            //         shadowColor: 'transparent',
            //         elevation: 0,
            //     },
            //     headerTitleStyle: {
            //         fontWeight: 'bold',
            //     },
            //     headerTintColor: COLORS.white,
            //     title:'',
            // }}>
            screenOptions={{
              title: '',
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: COLORS.sub,
              },
              headerBackTitleVisible: false,
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
          {/* 이건 회원가입 비밀번호 설정할때 */}
            <Stack.Screen
            name="Password"
            component={AuthPassword}
          />
          {/* 이건 로그인 후 비밀번호 설정할 때 */}
            <Stack.Screen
            name="NewPassword"
            component={AuthNewPassword}
          />
            <Stack.Screen
            name="Agreement"
            component={AgreementScreen}
          />


            <Stack.Screen
            name="SignUpInfo"
            component={SignUpInfoScreen}
          />
          <Stack.Screen
            name="SignUpInfoGender"
            component={SignUpInfoGenderScreen}
          />
        </Stack.Navigator>
    );
}

export default Auth;