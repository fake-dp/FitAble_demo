import HomeMainTemplate from '../../components/templates/homScreens/HomeMainTemplate';
import useQrNavigation from '../../hooks/useQrNavigation';
import { Platform } from 'react-native';
function HomeMainScreen({ navigation }) {
  // if(Platform.OS === 'ios') {
  //   useQrNavigation(navigation);
  // }

  return (
    <HomeMainTemplate />
  );
}

export default HomeMainScreen;