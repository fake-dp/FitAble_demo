import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import EctInput from '../../ui/inputUi/EctInput';
import MainBtn from '../../ui/buttonUi/MainBtn';
import React, {useCallback, useState, useEffect} from 'react';
import {validatePassword} from '../../../utils/CustomUtils'

function AuthUsePasswordtemplate({navigation}) {

    // 비밀번호 상태관리
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // 비밀번호 입력
    const handlePassword = (text) => {
        setPassword(text);
        
    }

    // 비밀번호 확인 입력
    const handlePasswordCheck = (text) => {
        setPasswordCheck(text);
    }

    // 비밀번호 검증
  const validatePasswordInput = () => {
    const isValid = validatePassword(password);
    setPasswordError(isValid && password.length > 1 ? '' : '형식에 맞게 설정해주세요');
  };



  const isSamePassword = password === passwordCheck;

    // 약관동의 페이지 이동
    const toAuthAgree = useCallback(() => {
        // 비밀번호와 확인창 초기화
        setPassword('');
        setPasswordCheck('');
        setPasswordError('');
  
        navigation.navigate('Agreement');
        }, [navigation]);

        useEffect(() => {
            const unsubscribe = navigation.addListener('beforeRemove', (e) => {
              if (e.data.action.type === 'GO_BACK' || e.data.action.type === 'NAVIGATE') {
                setPassword('');
                setPasswordCheck('');
                setPasswordError('');
              }
            });
        
            return unsubscribe;
          }, [navigation]);
     
    return (
        <AuthContainer>
             <AuthText>사용하실 비밀번호를</AuthText>
             <AuthText>입력해주세요</AuthText>
             <BtnContainer>
                <EctInput 
                text='비밀번호'
                placeholder="영어 소문자, 숫자, 특수문자 포함 8자리~16자리"
                value={password}
                onChangeText={handlePassword}
                onBlur={validatePasswordInput} 
                />
                {
                   passwordError &&  
                   <ErrorTextContainer  key={passwordError}>
                   <ErrorText>{passwordError}</ErrorText> 
                   </ErrorTextContainer>
                }
                <EctInput 
                text='비밀번호 확인'
                placeholder="다시 입력해주세요"
                value={passwordCheck}
                onChangeText={handlePasswordCheck}
                />
                {
                   !isSamePassword && passwordCheck.length > 7 &&
                   <ErrorTextContainer>
                   <ErrorText>비밀번호가 일치하지 않습니다</ErrorText> 
                   </ErrorTextContainer>
                }
             </BtnContainer>

            <BottomBtnContainer>
                <MainBtn
                colorProp={password.length > 7 &&isSamePassword && passwordError.length === 0}
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

const ErrorTextContainer = styled.View`
    width: 100%;
    margin-bottom: 12px;
`;

const ErrorText = styled.Text`
color: #E11616;
font-size: 12px;
font-weight: 400;
line-height: 16.80px;
padding-left: 12px;
`;
