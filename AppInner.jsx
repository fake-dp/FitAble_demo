import {NavigationContainer} from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { isLoginState,phoneState } from "./src/store/atom";
import Auth from './Auth';
import AppScreens from './AppScreens';

function AppInner() {
const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
const [myPhone, setMyPhone] = useRecoilState(phoneState);
// console.log('AppInner',isLoggedIn,myPhone);

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