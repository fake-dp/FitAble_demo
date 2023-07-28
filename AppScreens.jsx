import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainExerciseSreen from './src/screens/exercisepage/MainExerciseSreen';
import StoreScreen from './src/screens/storepage/StoreScreen';
import MyScreen from './src/screens/mypage/MyScreen';
import HomeMainScreen from './src/screens/mainpage/HomeMainScreen';
import HomeHeader from './src/components/ui/custom/HomeHeader';
import { COLORS } from './src/constants/color';
import { Image } from 'react-native';

// 홈 관련 스크린
import HomeScan from './src/screens/mainpage/HomeScan';
import BellScreen from './src/screens/mainpage/BellScreen';
import SearchCenterScreen from './src/screens/mainpage/SearchCenterScreen';
import ConsultingScreen from './src/screens/mainpage/ConsultingScreen';
import DetailCenterScreen from './src/screens/mainpage/DetailCenterScreen';
import SubscribeScreen from './src/screens/mainpage/SubscribeScreen';
import PtScreen from './src/screens/mainpage/PtScreen';
import UseScreen from './src/screens/mainpage/UseScreen';
import InfoCardScreen from './src/screens/mainpage/InfoCardScreen';
import PtDetailSrceen from './src/screens/mainpage/PtDetailSrceen';
import MyAppSettingScreen from './src/screens/mypage/MyAppSettingScreen';
import MyProfileScreen from './src/screens/mypage/MyProfileScreen';
import CenterRegistration from './src/screens/mypage/CenterRegistration';
import MyBookListScreen from './src/screens/mypage/MyBookListScreen';
import MyCenterMarkScreen from './src/screens/mypage/MyCenterMarkScreen';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 메인 홈 헤더 
function HomeMainScreens({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeMain" component={HomeMainScreen} 
          options={{ 
             headerTitle: ()=><HomeHeader navigation={navigation}/>,
  
               headerStyle: {
              backgroundColor: COLORS.sub,
            },
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
            
            }}
      />
    </Stack.Navigator>
  );
}

// 운동하기
function ExerciseMainScreens({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ExerciseMain" component={MainExerciseSreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: COLORS.sub,
          },
        }}
      />
    </Stack.Navigator>
  );
}

// 스토어
function StoreMainScreens({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="StoreMain" component={StoreScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: COLORS.sub,
          },
        }}
      />
    </Stack.Navigator>
  );
}

// 마이페이지
function MyMainScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Myheader" component={MyScreen}
         options={{
          title: '',
          headerStyle: {
            backgroundColor: COLORS.sub,
          },
        }}
      />
    </Stack.Navigator>
  );
}


function MainTabScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
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
      }}
    >
      <Tab.Screen name="Home" component={HomeMainScreens} 
        options={{
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
          
        }}
      /> 
      <Tab.Screen name="Exercise" component={ExerciseMainScreens} 
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
            }}
      />
      <Tab.Screen name="Store" component={StoreMainScreens} 
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
                    }}
      />
      <Tab.Screen name="Mypage" component={MyMainScreen} 
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
                }}
      />
    </Tab.Navigator>
  );
}


// 여기서 스크린 등록하장 !!
function AppScreens({navigation}) {
  return (
  
      <Stack.Navigator
        screenOptions={{
          headerTintColor: 'white',
            headerStyle: {
                backgroundColor: COLORS.sub,
                borderBottomWidth: 0,
              },
              // title 없에기
                // headerShown: false,
                headerShadowVisible: false,
                headerBackTitleVisible: false,
                shadowColor: 'transparent', // this covers iOS
                elevation: 0, // this covers Android
          }}
      >
        <Stack.Screen name="MainTab" component={MainTabScreen} options={{ headerShown: false }} />
        {/* 홈 스크린 등록 */}
        <Stack.Screen name="Scan" component={HomeScan} 
           
        />
        <Stack.Screen name="Bell" component={BellScreen} 
         options={{
            title: '알람',
        }}
        />
          <Stack.Screen name="SearchCenter" component={SearchCenterScreen} 
           options={{
            title: '',
            headerBackVisible: false,
        }}
          />
          <Stack.Screen name="Consulting" component={ConsultingScreen} 
          options={{
            title: '',
            headerBackVisible: false,
        }}
          />

          <Stack.Screen name="DetailCenter" component={DetailCenterScreen} 
            options={{
                headerShown: false,
            }}
          />

          <Stack.Screen name="Subscribe" component={SubscribeScreen} 
          options={{
            title: '',
            headerBackVisible: false,
        }}
          />
          <Stack.Screen name="PT" component={PtScreen} 
           options={{
            title: '',
            headerBackVisible: false,
        }}
          />
          <Stack.Screen name="PtDetail" component={PtDetailSrceen}
          options={{
            headerShown: false,
        }}
          />

          <Stack.Screen name="Use" component={UseScreen} 
         options={{
          title: '',
          headerBackVisible: false,
      }}
          />

          <Stack.Screen name="InfoCard" component={InfoCardScreen} 
           options={{
            title: '',
            // headerBackVisible: false,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
            headerBackTitleVisible: false,
        }}
          />
        {/* 운동하기 스크린 등록 */}


        {/* 스토어 스크린 등록 */}

        {/* 마이 스크린 등록 */}
        <Stack.Screen name="AppSetting" component={MyAppSettingScreen} 
           options={{
            title: '',
            headerBackVisible: false,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
            headerBackTitleVisible: false,
        }}
          />

          <Stack.Screen name="MyProfile" component={MyProfileScreen} 
           options={{
            title: '',
            headerBackVisible: false,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
            headerBackTitleVisible: false,
        }}
          />

            <Stack.Screen name="CenterRegist" component={CenterRegistration} 
           options={{
            title: '',
            // headerBackVisible: false,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
            headerBackTitleVisible: false,
        }}
          />

            <Stack.Screen name="MyBookList" component={MyBookListScreen} 
           options={{
            title: '',
            // headerBackVisible: false,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
            headerBackTitleVisible: false,
        }}
          />

            <Stack.Screen name="MyCenter" component={MyCenterMarkScreen} 
           options={{
            title: '',
            // headerBackVisible: false,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
            headerBackTitleVisible: false,
        }}
          />
       
      </Stack.Navigator>

  );
}

export default AppScreens;
