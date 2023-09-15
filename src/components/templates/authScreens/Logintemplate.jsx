// sr-a-1000
import styled from 'styled-components/native';
import {COLORS} from '../../../constants/color'
import AuthInput from "../../ui/inputUi/AuthInput";
import MainBtn from "../../ui/buttonUi/MainBtn";
import React, {useCallback, useRef, useState} from 'react';
import { useSetRecoilState } from 'recoil';
import { isLoginState,phoneState } from '../../../store/atom';
import { login } from '../../../api/authApi';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Logintempate({navigation}) {

    const setIsLoggedIn = useSetRecoilState(isLoginState);
    const setMyPhone = useSetRecoilState(phoneState);

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

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


    const handleLogin = async() => {
        try {
            const response = await login(phone, password); // 로그인 함수 호출
            if (response && response.isUseApp && phone.length > 5  && password.length > 3) {
              const { accessToken, refreshToken } = response;
              await AsyncStorage.setItem("accessToken", accessToken);
              await AsyncStorage.setItem("refreshToken", refreshToken);
              // 로그인 성공 처리
              setMyPhone(phone);
              setPhone('');
              setPassword('');

              Alert.alert('로그인 성공하였습니다. ', '', [{ text: '확인', onPress: () => setIsLoggedIn(true) }]);
            } else {
              // 로그인 실패 처리
              Alert.alert('로그인 실패하였습니다. ', '', [{ text: '확인', onPress: () => console.log('실패') }]);
            }
          } catch (error) {
            console.error('Error during login:', error);
        Alert.alert('로그인 실패하였습니다.', '', [{ text: '확인', onPress: () => console.log('실패')  }]);
          }
    }

    const isInputValid = phone.length > 5  && password.length > 3;

    return (
        <LoginScreenView> 
            <TitleLogo source={require('../../../assets/img/mainLogo.png')}/>
            <AuthInput
             value={phone}
             onChangeText={setPhone}
             placeholder="핸드폰 번호"
            />

            <AuthInput
              value={password}
              onChangeText={setPassword}
              placeholder="비밀번호"
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
    );
}

export default Logintempate;


const LoginScreenView = styled.View`
    flex:1;
    background-color: ${COLORS.sub};
    align-items: center;
    justify-content: center;
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