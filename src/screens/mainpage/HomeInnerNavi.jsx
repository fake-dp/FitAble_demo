import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeMainScreen from "./HomeMainScreen";
import HomeScan from "./HomeScan";
import BellScreen from "./BellScreen";
import SearchCenterScreen from "./SearchCenterScreen";
import SubscribeScreen from "./SubscribeScreen";
import PtScreen from "./PtScreen";
import UseScreen from "./UseScreen";
import ConsultingScreen from "./ConsultingScreen";
import DetailCenterScreen from "./DetailCenterScreen";
import InfoCardScreen from "./InfoCardScreen";

import { COLORS } from '../../constants/color';
import HomeHeader from '../../components/ui/custom/HomeHeader';

const Stack = createNativeStackNavigator();

function HomeInnerNavi({navigation}) {


    return (
  
        <Stack.Navigator>
          <Stack.Screen name="HomeMain" component={HomeMainScreen} 
          options={({ navigation }) => ({
             headerTitle: ()=><HomeHeader 
              navigation={navigation}
            />,
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
            
            })}
          />
          <Stack.Screen name="Scan" component={HomeScan} 
          options={{
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: COLORS.sub,
              },
              // title 없에기
                // headerShown: false,
                headerBackTitleVisible: false,
          }}
          />
          <Stack.Screen name="Bell" component={BellScreen} 
          options={{
            headerTintColor: 'white',
            headerTitleAlign: 'left',
            headerStyle: {
                backgroundColor: COLORS.sub,
              },
              headerBackTitleVisible: false,
              title: '알림',
          }}
          />

          <Stack.Screen name="SearchCenter" component={SearchCenterScreen} />
          <Stack.Screen name="Consulting" component={ConsultingScreen} />

          <Stack.Screen name="DetailCenter" component={DetailCenterScreen} 
            options={({ navigation }) => ({
                headerTitle: ()=><HomeHeader
                    navigation={navigation}
                />,
            })}
          />

          <Stack.Screen name="Subscribe" component={SubscribeScreen} />
          <Stack.Screen name="PT" component={PtScreen} />
          <Stack.Screen name="Use" component={UseScreen} />

          <Stack.Screen name="InfoCard" component={InfoCardScreen} />
        </Stack.Navigator>
  
    );
}

export default HomeInnerNavi;