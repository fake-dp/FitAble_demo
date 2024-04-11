import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/authpage/LoginScreen';

import AuthPassword from './src/screens/authpage/AuthPassword';
import AgreementScreen from './src/screens/authpage/AgreementScreen';
import AuthNewPassword from './src/screens/authpage/AuthNewPassword';
import { COLORS } from './src/constants/color';
import SignUpInfoScreen from './src/screens/authpage/SignUpInfoScreen';
import SignUpInfoGenderScreen from './src/screens/authpage/SignUpInfoGenderScreen';
import TermWebViewScreen from './src/screens/authpage/TermWebViewScreen';

const Stack = createNativeStackNavigator();

function Auth(props) {
    return (
        <Stack.Navigator
            screenOptions={{
              title: '',
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: COLORS.sub,
              },
              headerBackTitleVisible: false,
              headerShadowVisible: false,
          }}>
          
            <Stack.Screen
            name="SignIn"
            component={LoginScreen}
            options={{headerShown: false}}
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
          <Stack.Screen
            name="TermWebView"
            component={TermWebViewScreen}
          />
        </Stack.Navigator>
    );
}

export default Auth;