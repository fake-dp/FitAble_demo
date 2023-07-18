import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from './src/screens/mainpage/HomeScreen';
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
import AuthNewPassword from './src/screens/authpage/AuthNewPassword';
import HomeHeader from './src/components/ui/custom/HomeHeader';

import { Image, View } from 'react-native';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
  

function AppInner() {

const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
console.log('AppInner',isLoggedIn);




  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator
       

        >
          <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: '홈',
           
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('./src/assets/img/home_active.png')}
                style={{ 
                  width: 18, 
                  height: 18.75, 
                  tintColor: focused ? 'white' : COLORS.gray_400 }}
              />
            ),
            tabBarLabelStyle:({ focused }) => ({
              color: focused ? 'white' : COLORS.gray_400,
              fontSize: 12,
              fontWeight: 'bold',
            }),
            tabBarStyle: {
              backgroundColor: COLORS.sub,
            },
            tabBarActiveTintColor: 'white',
            headerStyle: {
              backgroundColor: COLORS.sub,
            },
            headerShown: false,
            
          })}
        
          
        />
          <Tab.Screen
            name="Exercise"
            component={MainExerciseSreen}
            options={{
              title: '운동하기',
              tabBarIcon: ({ focused }) => (
                <Image
                  source={require('./src/assets/img/sports_active.png')}
                  style={{ 
                    width: 18, 
                    height: 18.75, 
                    tintColor: focused ? 'white' : COLORS.gray_400 }}
                />
              ),
              tabBarLabelStyle:({ focused }) => ({
                color: focused ? 'white' : COLORS.gray_400,
                fontSize: 12,
                fontWeight: 'bold',
              }),
              tabBarStyle: {
                backgroundColor: COLORS.sub,
              },
              tabBarActiveTintColor: 'white',
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Store"
            component={StoreScreen}
            options={{
              title: '스토어',
              tabBarIcon: ({ focused }) => (
                <Image
                  source={require('./src/assets/img/store_active.png')}
                  style={{ 
                    width: 18, 
                    height: 18.75, 
                    tintColor: focused ? 'white' : COLORS.gray_400 }}
                />
              ),
              tabBarLabelStyle:({ focused }) => ({
                color: focused ? 'white' : COLORS.gray_400,
                fontSize: 12,
                fontWeight: 'bold',
              }),
              tabBarStyle: {
                backgroundColor: COLORS.sub,
              },
              tabBarActiveTintColor: 'white',
              headerShown: false,
            }}
          />
            <Tab.Screen
            name="Mypage"
            component={MyScreen}
            options={{
              title: '마이',

              tabBarIcon: ({ focused }) => (
                <Image
                  source={require('./src/assets/img/mypage_active.png')}
                  style={{ 
                    width: 18, 
                    height: 18.75, 
                    tintColor: focused ? 'white' : COLORS.gray_400 }}
                />
              ),
              tabBarLabelStyle:({ focused }) => ({
                color: focused ? 'white' : COLORS.gray_400,
                fontSize: 12,
                fontWeight: 'bold',
              }),
              tabBarStyle: {
                backgroundColor: COLORS.sub,
              },
              tabBarActiveTintColor: 'white',
              headerShown: false,
            }}
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
            options={({ navigation }) => ({
              headerShown: true, // 헤더 숨기기
              headerStyle: {
                  backgroundColor: COLORS.sub, // 헤더 배경색
                  shadowColor: 'transparent', // ios
                  elevation: 0, // android
              },
              headerTitleStyle: {
                  fontWeight: 'bold', // 글자 굵기
              },
              headerTintColor: COLORS.white, // 헤더 글자색
              title:'',
              })}
          />
           <Stack.Screen
            name="Pass"
            component={PassScreen}
            options={({ navigation }) => ({
                headerShown: true, // 헤더 숨기기
                headerStyle: {
                    backgroundColor: COLORS.sub, // 헤더 배경색
                    shadowColor: 'transparent', // ios
                    elevation: 0, // android
                },
                headerTitleStyle: {
                    fontWeight: 'bold', // 글자 굵기
                },
                headerTintColor: COLORS.white, // 헤더 글자색
                title:'',
                })}
          />
            <Stack.Screen
            name="Password"
            component={AuthPassword}
            // options={{headerShown: false}}
            options={({ navigation }) => ({
                headerShown: true, // 헤더 숨기기
                headerStyle: {
                    backgroundColor: COLORS.sub, // 헤더 배경색
                    shadowColor: 'transparent', // ios
                    elevation: 0, // android
                },
                headerTitleStyle: {
                    fontWeight: 'bold', // 글자 굵기
                },
                headerTintColor: COLORS.white, // 헤더 글자색
                title:'',
                })}
          />
            <Stack.Screen
            name="NewPassword"
            component={AuthNewPassword}
            // options={{headerShown: false}}
            options={({ navigation }) => ({
                headerShown: true, // 헤더 숨기기
                headerStyle: {
                    backgroundColor: COLORS.sub, // 헤더 배경색
                    shadowColor: 'transparent', // ios
                    elevation: 0, // android
                },
                headerTitleStyle: {
                    fontWeight: 'bold', // 글자 굵기
                },
                headerTintColor: COLORS.white, // 헤더 글자색
                title:'',
                })}
          />
            <Stack.Screen
            name="Agreement"
            component={AgreementScreen}
            // options={{headerShown: false}}
            options={({ navigation }) => ({
                headerShown: true, // 헤더 숨기기
                headerStyle: {
                    backgroundColor: COLORS.sub, // 헤더 배경색
                    shadowColor: 'transparent', // ios
                    elevation: 0, // android
                },
                headerTitleStyle: {
                    fontWeight: 'bold', // 글자 굵기
                },
                headerTintColor: COLORS.white, // 헤더 글자색
                title:'',
                })}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default AppInner;