import styled from 'styled-components/native';
import {COLORS} from '../../../constants/color'
import GobackGrid from '../../grid/GobackGrid';
import {useNavigation} from '@react-navigation/native';
import EctInput from '../../ui/inputUi/EctInput';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {TextInput, Alert,TouchableWithoutFeedback, Keyboard} from 'react-native';
import {signUpInfoState} from '../../../store/atom';
import { useRecoilState } from 'recoil';
import { formatTime } from '../../../utils/CustomUtils';
import {getCertificationNumber,checkCertificationNumber,checkPhone} from '../../../api/certificationApi';
import { useRoute } from '@react-navigation/native';

function SignUpInfoTemplate(props) {

    const navigation = useNavigation();
    const route = useRoute();

    const findPass = route.params?.text;


    
//  console.log('route.params@', findPass)

    const [signUpInfo, setSignUpInfo] = useRecoilState(signUpInfoState);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const [secondsLeft, setSecondsLeft] = useState(180);
    const [showCertificationInput, setShowCertificationInput] = useState(false);
    const [number, setNumber] = useState('');
    const [stepBtn, setStepBtn] = useState(0);
    // console.log('회원가입 정보',signUpInfo)

    const handleNameTextChange = (text) => {
        setName(text);
    }

    const handlePhoneTextChange = (text) => {
        setPhone(text);
    }

    const handleCertiNumberTextChange = (text) => {
        setNumber(text);
    }

    const goBackNavigation = () => {
        navigation.goBack();
        setSignUpInfo({...signUpInfo, name: '', phone: ''});
    }

    // 핸드폰 중복 확인
    const checkPhoneNum = async (phone) => {
        console.log('dd',phone)
        try{
            const response = await checkPhone(phone);
            console.log('읍답코드',response)
            if(response){
                Alert.alert('사용 가능', '사용 가능한 번호입니다.', [
                    {text: '확인', onPress: () => getCertification(phone)},
                    ]);
                    
            }
        }catch(error){
            console.log('error',error)
            if(error.response.data.code === 10201){
            Alert.alert('휴대폰번호 오류', '가입되지 않은 휴대폰번호로\n 인증해주시길 바랍니다.', [
                {text: '확인', onPress: () => console.log('OK Pressed')}
                ]);
            }
        }
    }

    let interval; 

     // 인증번호 받아오기 & 재인증
     const getCertification = async (phone) => {
        try {
            const response = await getCertificationNumber(phone);
            if (response.id) {
                setShowCertificationInput(true);
                setStepBtn(1);
                setSecondsLeft(180);
            interval = setInterval(() => {
                setSecondsLeft(prevSeconds => {
                    if (prevSeconds <= 1) {
                        clearInterval(interval); 
                        return 0;
                    }
                    return prevSeconds - 1;
                });
            }, 1000);
            } else {
                Alert.alert('인증 실패', '인증 번호를 받아오는데 실패했습니다.');
            }
        } catch (error) {
            console.error('getCertification error:', error);
            Alert.alert('에러', '인증 번호를 받아오는데 문제가 발생했습니다.');
        }
    }

    // 인증번호 확인
    const checkCerityNumber = async (phone, number) => {
        // navigation.navigate('SignUpInfoGender')
        if(number.length===0){
            Alert.alert('인증번호 오류', '인증번호를 입력해주세요', [{text: '확인', onPress: () => console.log('OK Pressed')}]);
        }
        try{
            const response = await checkCertificationNumber({phone, number});
            console.log('response',response)
            if(response){
            clearInterval(interval); 
            setSignUpInfo({...signUpInfo, name: name, phone: phone});
            Alert.alert('인증번호 확인', '인증번호를 확인하였습니다.',[{text: '확인', onPress: () => navigation.navigate('SignUpInfoGender')}]);
            }
        }catch(error){
            if(error.response.data.code === 10106){
            Alert.alert('인증번호 오류', '올바른 인증번호로 입력해주세요', [{text: '확인', onPress: () => console.log('OK Pressed')}]);
        }
    }
}

// 인증번호 확인 (비밀번호 찾기)
const checkCerityNumberfindPasswrod = async (phone, number) => {
    // console.log('dfasdf')
    // navigation.navigate('NewPassword')

    if(number.length===0){
        Alert.alert('인증번호 오류', '인증번호를 입력해주세요', [{text: '확인', onPress: () => console.log('OK Pressed')}]);
    }
    try{
        const response = await checkCertificationNumber({phone, number});
        if(response){
        clearInterval(interval); 
        setSignUpInfo({...signUpInfo, name: name, phone: phone});
        Alert.alert('인증번호 확인', '인증번호를 확인하였습니다.',[{text: '확인', onPress: () => navigation.navigate('NewPassword')}]);
        }
    }catch(error){
        if(error.response.data.code === 10106){
        Alert.alert('인증번호 오류', '올바른 인증번호로 입력해주세요', [{text: '확인', onPress: () => console.log('OK Pressed')}]);
    }
}
}



    const nextBtn = (phone) => {
        const phoneRegex = /^010\d{8}$/;
        if(!phoneRegex.test(phone)){
            Alert.alert('휴대폰번호 오류', '올바른 휴대폰번호로 11자리를 입력해주세요', [
                {text: '확인', onPress: () => console.log('OK Pressed')},
              ]);
            return;
        }else{
            checkPhoneNum(phone);
        }
    }

    // 비번찾기용
    const nextFindPasswordBtn = (phone) => {

        const phoneRegex = /^010\d{8}$/;

        if(!phoneRegex.test(phone)){
            Alert.alert('휴대폰번호 오류', '올바른 휴대폰번호로 11자리를 입력해주세요', [
                {text: '확인', onPress: () => console.log('OK Pressed')},
              ]);
            return;
        }else{
            getCertification(phone)
            // checkPhoneNum(phone);
        }
    }

    const isNameValid = name.trim().split(/\s+/).length === 1 && /^[a-zA-Z가-힣\s]*$/.test(name);
    const isCertiActive = isNameValid && phone.length === 11;
    // console.log('회원가입 정보',name, phone)

    //인증번호 유효성
    const isCertiNumberValid = number.length === 6;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            <GobackGrid onPress={goBackNavigation}/>
            {
                findPass && findPass ? (
                <SignUpInfoContainer>
                    <SignUpText>휴대폰번호 인증으로</SignUpText>
                    <SignUpText>비밀번호를 다시 설정합니다</SignUpText>
                </SignUpInfoContainer>
                ) : (
                <SignUpInfoContainer>
                    <SignUpText>회원가입을 위해</SignUpText>
                    <SignUpText>정보를 입력해주세요</SignUpText>
                </SignUpInfoContainer>
                )
            }
           

            <KeyboardAwareScrollView extraScrollHeight={20} style={{flex: 1}}>
                <SignInputBox>
                  <EctInput 
                   text='이름'
                   placeholder="이름을 입력해주세요"
                   isSignUp={false}
                   onChangeText={handleNameTextChange}
                   />

                   <EctInput 
                   text='연락처'
                   placeholder="-없이 번호를 입력해주세요"
                   isSignUp={false}
                   maxLength={11}
                     onChangeText={handlePhoneTextChange}
                   />

                {
                    showCertificationInput && (
                <>
                <CertificationIputBox>
                  <EctInput 
                   text='인증번호'
                   placeholder="6자리를 입력해주세요"
                   isSignUp={false}
                   onChangeText={handleCertiNumberTextChange}
                   maxLength={6}
                     keyboardType="numeric"
                   />
                    <CertificationTimer>0{formatTime(secondsLeft)}</CertificationTimer>
                </CertificationIputBox>
                <ResendBtn onPress={()=>getCertification(phone)}>
                    <ResendText>인증번호 재전송</ResendText>
                </ResendBtn>
                </>
                    )
                }

                </SignInputBox>
        </KeyboardAwareScrollView>
                {
                    stepBtn === 0 ? (
                        <GetCertificationNextBtn 
                        onPress={findPass ? ()=>nextFindPasswordBtn(phone):()=>nextBtn(phone)} 
                        isActive={isCertiActive}
                        disabled={!isCertiActive}
                        >
                        <GetCertificationNextText isActive={isCertiActive}>인증번호 받기</GetCertificationNextText>
                        </GetCertificationNextBtn>
                    ):(
                        <GetCertificationNextBtn 
                        onPress={findPass ? ()=>checkCerityNumberfindPasswrod(phone,number):()=>checkCerityNumber(phone,number)}
                        isActive={isCertiNumberValid}
                        disabled={!isCertiNumberValid}
                        >
                        <GetCertificationNextText isActive={isCertiNumberValid}>다음</GetCertificationNextText>
                        </GetCertificationNextBtn>
                    )
                }
        </Container>
        </TouchableWithoutFeedback>
    );
}

export default SignUpInfoTemplate;

const Container = styled.View`
  flex: 1;
  padding: 0 20px;
  background-color: ${COLORS.sub};
`;

const SignUpInfoContainer = styled.View`
margin-top: 44px;
`

const SignUpText = styled.Text`
color: ${COLORS.white};
font-size: 28px;
font-weight: 500;
line-height: 37.80px;
`;

const SignInputBox = styled.View`
margin-top: 50px;
`

const GetCertificationNextBtn = styled.TouchableOpacity`
    position: absolute;
    bottom: 40px;
    left: 10px;
    right: 10px;
    /* background-color: ${COLORS.box}; */
    background-color: ${props => props.isActive ? COLORS.main : COLORS.box};
    border-radius: 90px;
    align-items: center;
    justify-content: center;
    padding: 14px 0;
`;

const GetCertificationNextText = styled.Text`
font-size: 16px;
font-weight: 600;
line-height: 22.40px;
/* color: ${COLORS.gray_300}; */
color: ${props => props.isActive ? '#000000' : COLORS.gray_300};
`

const ResendBtn = styled.TouchableOpacity`
    align-self: flex-end;
`

const ResendText = styled.Text`
color: ${COLORS.gray_300};
font-size: 12px;
font-weight: 500;
text-decoration: underline;
line-height: 19.20px;
text-decoration-color: ${COLORS.gray_300};
`

const CertificationTimer = styled.Text`
    position: absolute;
    right: 20px;
    bottom: 22px;
    color: #FF7A00;
font-size: 14px;
font-weight: 500;
line-height: 22.40px;
`;

const CertificationIputBox = styled.View`
flex-direction: row;
align-items: center;
justify-content: center;
`;