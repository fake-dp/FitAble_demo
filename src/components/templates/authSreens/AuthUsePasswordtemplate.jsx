import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import EctInput from '../../ui/inputUi/EctInput';
import MainBtn from '../../ui/buttonUi/MainBtn';
import React, {useCallback, useRef, useState} from 'react';

function AuthUsePasswordtemplate({navigation}) {

    // 약관동의 페이지 이동
    const toAuthAgree = useCallback(() => {
        navigation.navigate('Agreement');
        }, [navigation]);

    return (
        <AuthContainer>
             <AuthText>사용하실 비밀번호를</AuthText>
             <AuthText>입력해주세요</AuthText>
             <BtnContainer>
                <EctInput />
                <EctInput />
             </BtnContainer>

            <BottomBtnContainer>
                <MainBtn
                onPress={toAuthAgree}
                >다음</MainBtn>
            </BottomBtnContainer>
        </AuthContainer>
    );
}

export default AuthUsePasswordtemplate;


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

const BtnContainer = styled.View`
margin-top: 50px;
align-items: center;
`;


const BottomBtnContainer = styled.View`
   align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 34px;
  left: 0;
  right: 0;
    
    `;