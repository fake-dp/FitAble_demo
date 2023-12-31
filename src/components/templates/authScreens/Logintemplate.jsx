// sr-a-1000
import styled from 'styled-components/native';
import {COLORS} from '../../../constants/color'
import AuthInput from "../../ui/inputUi/AuthInput";
import MainBtn from "../../ui/buttonUi/MainBtn";
import React, {useCallback, useRef, useState} from 'react';
import { useSetRecoilState } from 'recoil';
import { isLoginState,phoneState } from '../../../store/atom';
import { login } from '../../../api/authApi';
import { Alert,TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Logintempate({navigation}) {

    const setIsLoggedIn = useSetRecoilState(isLoginState);
    const setMyPhone = useSetRecoilState(phoneState);

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    // const [isUseAppState, setIsUseAppState] = useState(false);
    // 회원가입 페이지 이동
    const toInfoScreens = useCallback(() => {
        navigation.navigate('SignUpInfo');
      }, [navigation]);

      // 비밀번호 찾기
      const toInfoFindPassScreens = useCallback(() => {
        navigation.navigate('SignUpInfo',{text:'비밀번호 찾기'});
      }, [navigation]);
    
    // pass 페이지 이동
    const toPass = useCallback(() => {
        navigation.navigate('Pass');
        }, [navigation]);


    const handleLogin = async () => {
      try {
          const response = await login(phone, password); // 로그인 함수 호출
  
          // if (!response) {
          //     return Alert.alert('로그인 실패하였습니다.', '', [{ text: '확인', onPress: () => console.log('서버 응답 없음') }]);
          // }
  
          const isValidInput = phone.length > 5 && password.length > 3;
  
          if (response.isUseApp && isValidInput) {
              const { accessToken, refreshToken } = response;
              await AsyncStorage.setItem("accessToken", accessToken);
              await AsyncStorage.setItem("refreshToken", refreshToken);
  
              setMyPhone(phone);
              setPhone('');
              setPassword('');
              setIsLoggedIn(true);
              // return Alert.alert('로그인 성공하였습니다.', '', [{ text: '확인', onPress: () => setIsLoggedIn(true) }]);
          } 
  
          if (response.isUseApp === false && isValidInput) {
            console.log('@useapp값 확인',response.isUseApp)
            const { accessToken, refreshToken } = response;
            await AsyncStorage.setItem("accessToken", accessToken);
            await AsyncStorage.setItem("refreshToken", refreshToken);
              return Alert.alert('추가정보를 입력해주세요.', '', [{ text: '확인', onPress: () => navigation.navigate('SignUpInfoGender', { data: 'newInfo' }) }]);
          }
  
      } catch (error) {
          console.log('Error during login@@:', error);
          if(error.code === 10202){
            Alert.alert('올바른 비밀번호로 입력해주세요.', '', [{ text: '확인', onPress: () => console.log('실패') }]);
          }
      else if(error.code === 10200){
        Alert.alert('가입되지 않은 정보입니다. \n먼저 회원가입을 해주세요.', '', [{ text: '확인', onPress: () => console.log('실패') }]);
      }
    }
  };
  

    const isInputValid = phone.length > 10  && password.length > 7;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <LoginScreenView> 
            <TitleLogo source={require('../../../assets/img/mainLogo.png')}/>
            <AuthInput
             value={phone}
             onChangeText={setPhone}
             placeholder="휴대폰번호"
             maxLength={11}
            />

            <AuthInput
              value={password}
              onChangeText={setPassword}
              placeholder="비밀번호"
              onSubmitEditing={handleLogin}
            />
 

            <MainBtn
            onPress={handleLogin}
            // disabled={!isInputValid}
            colorProp={isInputValid}
            >로그인</MainBtn>
  

            <AboutContainer>
                <AboutTextLeft
                onPress={toInfoFindPassScreens}
                >비밀번호 찾기</AboutTextLeft>
                <AboutTextLine>|</AboutTextLine>
                <AboutTextRigth
                onPress={toInfoScreens}
                >회원가입</AboutTextRigth>
            </AboutContainer>
        </LoginScreenView>
        </TouchableWithoutFeedback>
    );
}

export default Logintempate;


const LoginScreenView = styled.View`
    flex:1;
    background-color: ${COLORS.sub};
    align-items: center;
    justify-content: center;
    padding: 0 20px;
`

const TitleLogo = styled.Image`
    margin-bottom: 30px;
`

const AboutContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    `

const AboutTextLeft = styled.Text`
color: ${COLORS.gray_300};
flex: 1;
text-align: right;
`
const AboutTextLine = styled.Text`
color: ${COLORS.gray_300};
text-align: center;
padding: 0 34px;
`

const AboutTextRigth = styled.Text`
color: ${COLORS.gray_300};
flex: 1;
text-align: left;
`
const StyledText = styled.Text`
color:red;
`