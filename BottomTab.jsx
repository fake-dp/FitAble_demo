import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainExerciseSreen from './src/screens/exercisepage/MainExerciseScreen';
import StoreScreen from './src/screens/storepage/itmeList/StoreScreen';
import MyScreen from './src/screens/mypage/MyScreen';
import HomeMainScreen from './src/screens/mainpage/HomeMainScreen';
import HomeHeader from './src/components/ui/custom/HomeHeader';
import {COLORS} from './src/constants/color';
import {Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import StoreHomeHeader from './src/components/ui/custom/StoreHomeHeader';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const baseOptions = {
  title: '',
  headerBackVisible: false,
  headerStyle: {
    backgroundColor: COLORS.sub,
  },
  headerBackTitleVisible: false,
  headerShadowVisible: false,
};

const bottonIconSize = {
  width: 24,
  height: 24,
};

// 메인 홈 헤더
function HomeMainScreens({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeMainScreen}
        options={{
          headerTitle: () => <HomeHeader navigation={navigation} />,
          headerStyle: {
            backgroundColor: COLORS.sub,
          },
        }}
      />
    </Stack.Navigator>
  );
}

// 운동하기
function ExerciseMainScreens({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExerciseMain"
        component={MainExerciseSreen}
        options={{
          ...baseOptions,
        }}
      />
    </Stack.Navigator>
  );
}

// 스토어
function StoreMainScreens({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StoreMain"
        component={StoreScreen}
        options={{
          headerTitle: () => <StoreHomeHeader navigation={navigation} />,
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          // ...baseOptions,
        }}
      />
    </Stack.Navigator>
  );
}

// 마이페이지
function MyMainScreen({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyHeader"
        component={MyScreen}
        options={{
          ...baseOptions,
        }}
      />
    </Stack.Navigator>
  );
}

// 하단탭
export function MainTabScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: ({focused}) => ({
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
      }}>
      <Tab.Screen
        name="Home"
        component={HomeMainScreens}
        options={{
          title: '홈',
          tabBarIcon: ({focused}) => (
            <FastImage
              source={
                focused
                  ? require('./src/assets/img/home_active.png')
                  : require('./src/assets/img/home_unactive.png')
              }
              style={{
                ...bottonIconSize,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
            // <Image
            //   source={require('./src/assets/img/home_active.png')}
            //   style={{
            //     ...bottonIconSize,
            //     tintColor: focused ? COLORS.white : COLORS.gray_400 }}
            // />
          ),
        }}
      />
      <Tab.Screen
        name="Exercise"
        component={ExerciseMainScreens}
        options={{
          title: '운동하기',
          tabBarIcon: ({focused}) => (
            <FastImage
              source={
                focused
                  ? require('./src/assets/img/sports_active.png')
                  : require('./src/assets/img/sports_unactive.png')
              }
              style={{
                ...bottonIconSize,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
            // <Image
            //     source={require('./src/assets/img/sports_active.png')}
            //     style={{
            //       ...bottonExIconSize,
            //       tintColor: focused ? COLORS.white : COLORS.gray_400 }}
            //   />
          ),
        }}
      />
      <Tab.Screen
        name="Store"
        component={StoreMainScreens}
        options={{
          title: '스토어',
          tabBarIcon: ({focused}) => (
            <Image
              source={require('./src/assets/img/store_active.png')}
              style={{
                ...bottonIconSize,
                tintColor: focused ? COLORS.white : COLORS.gray_400,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Mypage"
        component={MyMainScreen}
        options={{
          title: '마이',
          tabBarIcon: ({focused}) => (
            //   <FastImage
            //   source={
            //     focused?
            //     require('./src/assets/img/mypage_active.png') :
            //     require('./src/assets/img/mypage_unactive.png')}
            //   style={{
            //     ...bottonIconSize,}}
            //     resizeMode={FastImage.resizeMode.contain}
            // />
            <Image
              source={require('./src/assets/img/mypage_unactive.png')}
              style={{
                ...bottonIconSize,
                tintColor: focused ? COLORS.white : COLORS.gray_400,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
