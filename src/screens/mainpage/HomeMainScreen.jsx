import HomeMainTemplate from '../../components/templates/homScreens/HomeMainTemplate';
import useQrNavigation from '../../hooks/useQrNavigation';
import { Platform } from 'react-native';
function HomeMainScreen({ navigation }) {
  // const currentRouteName = useNavigationState((state) => state.routes[state.index].name);
  // console.log('currentRouteName',currentRouteName)
  // if(Platform.OS === 'ios' && currentRouteName === 'HomeMain'){
  //   useQrNavigation(navigation);
  // }

  return (
    <HomeMainTemplate />
  );
}

export default HomeMainScreen;