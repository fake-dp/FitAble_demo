// sr-a-1000
import styled from 'styled-components/native';
import {COLORS} from '../../../constants/color'
import AuthInput from "../../ui/inputUi/AuthInput";
import MainBtn from "../../ui/buttonUi/MainBtn";
import React, {useCallback, useRef, useState} from 'react';
import { useRecoilState } from 'recoil';
import { isLoginState } from '../../../store/atom';



function Logintempate({navigation}) {

    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    console.log('Logintempate',isLoggedIn)

    // 회원가입 페이지 이동
    const toSignUp = useCallback(() => {
        navigation.navigate('SignUp');
      }, [navigation]);
    
    // pass 페이지 이동
    const toPass = useCallback(() => {
        navigation.navigate('Pass');
        }, [navigation]);


    const handleLogin = () => {
     
        if (phoneNumber.length > 5  && password.length > 5) {
            // setIsLoggedIn(true);
            console.log('로그인 성공')
        }else{
            console.log('로그인 실패')
        }
    }

    const isInputValid = phoneNumber.length > 5  && password.length > 5;

    console.log('phoneNumber',phoneNumber, 'password',password, 'isInputValid',isInputValid)

    return (
        <LoginScreenView> 
            <TitleLogo source={require('../../../assets/img/mainLogo.png')}/>
            <AuthInput
             value={phoneNumber}
             onChangeText={setPhoneNumber}
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
                onPress={toPass}
                >비밀번호 찾기</AboutTextLeft>
                <AboutTextLine>|</AboutTextLine>
                <AboutTextRigth
                onPress={toPass}
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