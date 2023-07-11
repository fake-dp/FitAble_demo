// sr-a-1000
import styled from 'styled-components/native';
import {COLORS} from '../../../constants/color'
import AuthInput from "../../ui/inputUi/AuthInput";
import MainBtn from "../../ui/buttonUi/MainBtn";
import React, {useCallback, useRef, useState} from 'react';
import { useRecoilState } from 'recoil';
import { isLoginState } from '../../../../src/store/atom';

const LoginScreenView = styled.View`
    flex:1;
    background-color: ${COLORS.sub};
    align-items: center;
    justify-content: center;
`

const TitleText = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: ${COLORS.main};
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

function Logintempate({navigation}) {

    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);

    console.log('Logintempate',isLoggedIn)

    // 회원가입 페이지 이동
    const toSignUp = useCallback(() => {
        console.log('dd')
        navigation.navigate('SignUp');
      }, [navigation]);
    

    const handleLogin = () => {
        console.log('로그인');
        // setIsLoggedIn(true);
    }


    return (
        <LoginScreenView>
            <TitleText>FTI ABLE</TitleText>
            <AuthInput>핸드폰 번호</AuthInput>
            <AuthInput>비밀번호</AuthInput>
            <MainBtn
            onPress={handleLogin}
            >로그인</MainBtn>

            <AboutContainer>
                <AboutTextLeft>비밀번호 찾기</AboutTextLeft>
                <AboutTextLine>|</AboutTextLine>
                <AboutTextRigth
                onPress={toSignUp}
                >회원가입</AboutTextRigth>
            </AboutContainer>
        </LoginScreenView>
    );
}

export default Logintempate;