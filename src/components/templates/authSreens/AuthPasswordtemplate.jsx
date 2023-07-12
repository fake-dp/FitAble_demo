import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import PassBtn from '../../ui/buttonUi/PassBtn';
import React, {useCallback, useRef, useState} from 'react';


function AuthPasswordtemplate({navigation}) {
    // authpassword 페이지 이동
    const toAuthPassword = useCallback(() => {
        navigation.navigate('Password');
      }, [navigation]);

    return (
    <AuthContainer>
        <AuthText>회원가입을 위해</AuthText>
        <AuthText>본인인증을 해주세요</AuthText>
        <PassBtnContainer>

        <PassBtn 
        onPress={toAuthPassword}
        />
        </PassBtnContainer>
    </AuthContainer>
    );
}

export default AuthPasswordtemplate;

const AuthContainer = styled.View`
flex: 1;
background-color: ${COLORS.sub};
padding: 44px 20px 0 20px;
`

const AuthText = styled.Text`
color: ${COLORS.white};
font-size: 28px;
font-weight: 500;
line-height: 37.80px;
`;

const PassBtnContainer = styled.View`
align-items: center;
`