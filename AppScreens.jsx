import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from './src/constants/color';
import { MainTabScreen } from './BottomTab';
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

// 마이페이지 관련 스크린
import MyAppSettingScreen from './src/screens/mypage/MyAppSettingScreen';
import MyProfileScreen from './src/screens/mypage/MyProfileScreen';
import CenterRegistration from './src/screens/mypage/CenterRegistration';
import MyBookListScreen from './src/screens/mypage/MyBookListScreen';
import MyCenterMarkScreen from './src/screens/mypage/MyCenterMarkScreen';
import MileageScreen from './src/screens/mypage/MileageScreen';
import FitableQnAScreen from './src/screens/mypage/FitableQnAScreen';
import CenterTicketListScreen from './src/screens/mypage/CenterTicketListScreen';
import MyProductScreen from './src/screens/mypage/MyProductScreen';



const Stack = createNativeStackNavigator();

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
                shadowColor: 'transparent',
                elevation: 0, 
          }}>
        <Stack.Screen name="MainTab" component={MainTabScreen} options={{ headerShown: false }} />

        {/* 홈 스크린 등록 */}
        <Stack.Group
          screenOptions={{
              title: '',
              headerBackVisible: false,
          }}>

          <Stack.Screen name="Scan" component={HomeScan} options={{title: '알람',headerBackVisible:true,}}/>
          <Stack.Screen name="Bell" component={BellScreen} options={{title: '알람',headerBackVisible:true,}}/>
          <Stack.Screen name="SearchCenter" component={SearchCenterScreen}/>
          <Stack.Screen name="Consulting" component={ConsultingScreen} />
          <Stack.Screen name="DetailCenter" component={DetailCenterScreen} options={{ headerShown: false, }}/>
          <Stack.Screen name="Subscribe" component={SubscribeScreen} />
          <Stack.Screen name="PT" component={PtScreen}/>
          <Stack.Screen name="PtDetail" component={PtDetailSrceen} options={{ headerShown: false,}}/>
          <Stack.Screen name="Use" component={UseScreen} />

          </Stack.Group>

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
        <Stack.Group
          screenOptions={{
            title: '',
            headerBackVisible: false,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
            headerBackTitleVisible: false,
        }}>
            <Stack.Screen name="MyProfile" component={MyProfileScreen} />
            <Stack.Screen name="AppSetting" component={MyAppSettingScreen} />
            <Stack.Screen name="CenterRegist" component={CenterRegistration} options={{headerStyle: {backgroundColor: COLORS.sub,},}}/>
            <Stack.Screen name="MyBookList" component={MyBookListScreen}  />
            <Stack.Screen name="CenterTicket" component={CenterTicketListScreen}  />
            <Stack.Screen name="MyCenter" component={MyCenterMarkScreen}  />
            <Stack.Screen name="Mileage" component={MileageScreen}  />
            <Stack.Screen name="Product" component={MyProductScreen}  />
            <Stack.Screen name="FitableQnA" component={FitableQnAScreen}  />
            {/* 문의, 상품 문의 이용약관 정책 이용권 목록 */}
        </Stack.Group>
       
      </Stack.Navigator>
  );
}

export default AppScreens;
