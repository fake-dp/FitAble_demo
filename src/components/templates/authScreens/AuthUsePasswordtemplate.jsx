import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import {EctInput} from '../../ui/inputUi/EctInput';
import MainBtn from '../../ui/buttonUi/MainBtn';
import React, {useCallback, useState, useEffect,useRef} from 'react';
import {validatePassword} from '../../../utils/CustomUtils'
import GobackGrid from '../../grid/GobackGrid';
import {signUpInfoState} from '../../../store/atom';
import { useRecoilState } from 'recoil';
import { useRoute } from '@react-navigation/native';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
function AuthUsePasswordtemplate({navigation}) {

    const [signUpInfo, setSignUpInfo] = useRecoilState(signUpInfoState);
    // console.log('signUpInfo:', signUpInfo.phone, pass

    const route = useRoute();
    const phoneInputRef = useRef();
    const updateInfo = route.params?.data;
    console.log('dd@@@',updateInfo)

    // 비밀번호 상태관리
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // 비밀번호 입력
    const handlePassword = (text) => {
        setPassword(text);
    }
    // console.log('signUpInfo:', signUpInfo.phone, password)
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
    const toAuthAgree = useCallback((password) => {
        // 비밀번호와 확인창 초기화
        // setPassword('');
        // setPasswordCheck('');
        // setPasswordError('');

        // 비밀번호 저장
        setSignUpInfo({...signUpInfo, password: password});
        navigation.navigate('Agreement',{data:updateInfo});
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <AuthContainer>
          <GobackGrid onPress={()=>navigation.goBack()}/>
          <PasswordContainer>
             <AuthText>사용하실 비밀번호를</AuthText>
             <AuthText>입력해주세요</AuthText>
          </PasswordContainer>
          <KeyboardAwareScrollView extraScrollHeight={20} style={{flex: 1}}>
             <BtnContainer>
                <EctInput 
                text='비밀번호'
                placeholder="영어 소문자, 숫자, 특수문자 포함 8자리~16자리"
                value={password}
                onChangeText={handlePassword}
                onBlur={validatePasswordInput} 
                secureTextEntry={true}
                hasError={!!passwordError} 
                onSubmitEditing={() =>phoneInputRef.current.focus()} 
                />
                {
                   passwordError &&  
                   <ErrorTextContainer  key={passwordError}>
                   <ErrorText>{passwordError}</ErrorText> 
                   </ErrorTextContainer>
                }
                <EctInput 
                ref={phoneInputRef}
                text='비밀번호 확인'
                placeholder="다시 입력해주세요"
                value={passwordCheck}
                onChangeText={handlePasswordCheck}
                secureTextEntry={true}
                onSubmitEditing={()=>toAuthAgree(password)}
                returnKeyType='done'
                hasError={!isSamePassword && passwordCheck.length > 7}
                />
                {
                   !isSamePassword && passwordCheck.length > 7 &&
                   <ErrorTextContainer>
                   <ErrorText>비밀번호가 일치하지 않습니다</ErrorText> 
                   </ErrorTextContainer>
                }
             </BtnContainer>
                </KeyboardAwareScrollView>
            <BottomBtnContainer>
                <MainBtn
                colorProp={password.length > 7 &&isSamePassword && passwordError.length === 0}
                onPress={()=>toAuthAgree(password)}
                >다음</MainBtn>
            </BottomBtnContainer>
        </AuthContainer>
        </TouchableWithoutFeedback>
    );
}

export default AuthUsePasswordtemplate;


const AuthContainer = styled.View`
flex: 1;
background-color: ${COLORS.sub};
padding: 0 20px;
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
  left: 20px;
  right: 20px;
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

const PasswordContainer = styled.View`
margin-top: 44px;
`