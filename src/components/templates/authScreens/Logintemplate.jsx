// sr-a-1000
import styled from 'styled-components/native';
import {COLORS} from '../../../constants/color'
import {AuthInput} from "../../ui/inputUi/AuthInput";
import MainBtn from "../../ui/buttonUi/MainBtn";
import React, {useCallback, useRef, useState} from 'react';
import { useSetRecoilState,useRecoilState } from 'recoil';
import { isLoginState,phoneState,fcmTokenState } from '../../../store/atom';
import { login } from '../../../api/authApi';
import { Alert,TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image'
function Logintempate({navigation}) {

    const setIsLoggedIn = useSetRecoilState(isLoginState);
    const setMyPhone = useSetRecoilState(phoneState);
    const [fcmToken, setFcmToken] = useRecoilState(fcmTokenState);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef();
  
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

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
          const response = await login(phone, password, fcmToken); // 로그인 함수 호출
          const isValidInput = phone.length > 10  && password.length > 7;

          // if (!response) {
          //     return Alert.alert('로그인 실패하였습니다.', '', [{ text: '확인', onPress: () => console.log('서버 응답 없음') }]);
          // }
  
        console.log('로그인 응답:',response.isUseApp, response)
          if (response.isUseApp && isValidInput) {
              // const { accessToken, refreshToken } = response;
              // await AsyncStorage.setItem("accessToken", accessToken);
              // await AsyncStorage.setItem("refreshToken", refreshToken);
  
              // setMyPhone(phone);
              // setPhone('');
              // setPassword('');
              setIsLoggedIn(true);
              // return Alert.alert('로그인 성공하였습니다.', '', [{ text: '확인', onPress: () => console.log('로그인 성공') }]);
          } 
  
          if (response.isUseApp === false && isValidInput) {
            // console.log('@useapp값 확인',response.isUseApp)
            // const { accessToken, refreshToken } = response;
            // await AsyncStorage.setItem("accessToken", accessToken);
            // await AsyncStorage.setItem("refreshToken", refreshToken);
              return Alert.alert('추가정보를 입력해주세요.', '', [{ text: '확인', onPress: () => navigation.navigate('SignUpInfoGender', { data: 'newInfo' }) }]);
          }
  
      } catch (error) {
          console.log('Error during login@@:', error.response.data);
          if(error.response.data.code === 10202){
            Alert.alert('올바른 비밀번호로 입력해주세요.', '', [{ text: '확인', onPress: () => console.log('실패') }]);
          }
          else if(error.response.data.code === 20000){
        Alert.alert('가입되지 않은 정보입니다. \n먼저 회원가입을 해주세요.', '', [{ text: '확인', onPress: () => console.log('실패') }]);
      }
    }
  };
  

    const isInputValid = phone.length > 10  && password.length > 7;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <InputContainer>
        <LoginScreenView focus={isFocused}> 
            <TitleLogo 
            //  resizeMode={FastImage.resizeMode.contain}

            source={require('../../../assets/img/mainLogo.png')}/>
            <AuthInput
             value={phone}
             onChangeText={setPhone}
             placeholder="휴대폰번호"
             maxLength={11}
             ref={inputRef}
             onFocus={handleFocus}
             onBlur={handleBlur}
            />

            <AuthInput
              value={password}
              onChangeText={setPassword}
              placeholder="비밀번호"
              onSubmitEditing={handleLogin}
              ref={inputRef}
              onFocus={handleFocus}
              onBlur={handleBlur}
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
            </InputContainer>
        </TouchableWithoutFeedback>
    );
}

export default Logintempate;


const LoginScreenView = styled.View`
    /* flex: .9; */
    flex: ${props => props.focus ? 0.88 : 1};
    background-color: ${COLORS.sub};
    align-items: center;
    justify-content: flex-end;
    padding: 0 20px;
`

const InputContainer = styled.View`
  flex:1;
  background-color: ${COLORS.sub};
`

const TitleLogo = styled(FastImage)`
    margin-bottom: 50px;
    width: 180px;
    height: 34px;
    /* background-color: red; */
`

const AboutContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 100px;
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