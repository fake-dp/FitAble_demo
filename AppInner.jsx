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
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default AppInner;