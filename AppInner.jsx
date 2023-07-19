import {NavigationContainer} from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { isLoginState } from "./src/store/atom";
import Auth from './Auth';
import AppScreens from './AppScreens';

function AppInner() {
const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
console.log('AppInner',isLoggedIn);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <AppScreens />
      ) : (
        <Auth />
      )}
    </NavigationContainer>
  );
}

export default AppInner;