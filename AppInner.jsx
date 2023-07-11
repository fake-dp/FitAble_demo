import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useState} from 'react';

import HomeSreen from './src/screens/mainpage/HomeSreen';
import MainExerciseSreen from './src/screens/exercisepage/MainExerciseSreen';
import StoreScreen from './src/screens/storepage/StoreScreen';
import MyScreen from './src/screens/mypage/MyScreen';
import LoginScreen from './src/screens/authpage/LoginScreen';
import SignupScreen from './src/screens/authpage/SignupScreen';

import { useRecoilState } from 'recoil';
import { isLoginState } from "./src/store/atom";
import PassScreen from './src/screens/authpage/PassScreen';
import AuthPassword from './src/screens/authpage/AuthPassword';
import AgreementScreen from './src/screens/authpage/AgreementScreen';

import { COLORS } from './src/constants/color';

import { StyleSheet,TouchableOpacity, Image } from 'react-native';
import BackIcon from './src/assets/img/back_arrow.svg'
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
  

function AppInner() {

const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
console.log('AppInner',isLoggedIn);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeSreen}
            options={{title: '홈'}}
          />
          <Tab.Screen
            name="Exercise"
            component={MainExerciseSreen}
            options={{title: '운동하기'}}
          />
          <Tab.Screen
            name="Store"
            component={StoreScreen}
            options={{title: '스토어'}}
          />
            <Tab.Screen
            name="Mypage"
            component={MyScreen}
            options={{title: '마이'}}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignupScreen}
            // options={{headerShown: false}}
            options={{title: '회원가입'}}
          />
           <Stack.Screen
            name="Pass"
            component={PassScreen}
            options={({ navigation }) => ({
                headerShown: true, // 헤더 숨기기
                // headerLeft: () => (
                //     <TouchableOpacity onPress={() => navigation.goBack()} >
                //       <Image source={BackIcon}style={styles.backIcon} />
                //     </TouchableOpacity>
                //   ),
                
                headerStyle: {
                    backgroundColor: COLORS.sub, // 헤더 배경색
                    shadowColor: 'transparent', // ios
                    elevation: 0, // android
                },
                headerTitleStyle: {
                    fontWeight: 'bold', // 글자 굵기
                },
                headerTintColor: COLORS.main, // 헤더 글자색
                title:'',
                })}
          />
            <Stack.Screen
            name="Password"
            component={AuthPassword}
            // options={{headerShown: false}}
            options={{title: '비밀번호'}}
          />
            <Stack.Screen
            name="Agreement"
            component={AgreementScreen}
            // options={{headerShown: false}}
            options={{title: '약관동의'}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default AppInner;