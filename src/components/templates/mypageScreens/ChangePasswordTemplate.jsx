import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
import { TextInput ,Alert} from 'react-native';
import { useState } from 'react';
import { formatTime } from '../../../utils/CustomUtils';
import {changePassword} from '../../../api/mypageApi';
import {getCertificationNumber,checkCertificationNumber} from '../../../api/certificationApi';
import { useRecoilState } from 'recoil';
import { myinfoState } from '../../../store/atom';
import { validatePassword } from '../../../utils/CustomUtils';

function ChangePasswordTemplate(props) {

    const [myInfo, setMyInfo] = useRecoilState(myinfoState);
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [secondsLeft, setSecondsLeft] = useState(180);
    const [showCertificationInput, setShowCertificationInput] = useState(false);
    const [stepBtn, setStepBtn] = useState(0);

    const navigation = useNavigation();


    const {phone} = myInfo

    const certificationTextChange = (text) => {
        setNumber(text);
        console.log('password',text)
    }

    const passwrdTextChange = (text) => {
        setPassword(text);
        console.log('password',text)
    }

    const checkPasswrdTextChange = (text) => {
        setCheckPassword(text);
    }

      // 비밀번호 검증
    const validatePasswordInput = () => {
    const isValid = validatePassword(password);
    setPasswordError(isValid && password.length > 1 ? '' : '영어 소문자, 숫자, 특수문자 포함 8자리~16자리로 설정해주세요');
  };


  const isSamePassword = password === checkPassword;

    const goBack = () => {
        navigation.goBack();
    }

    const getCertification = async (phone) => {
        console.log('phone',phone)
        try {
            const response = await getCertificationNumber(phone);
            if (response.id) {
                console.log('response',response.id)
                setShowCertificationInput(true);
                setStepBtn(1);
                setSecondsLeft(180);
            const interval = setInterval(() => {
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

    const checkCertificaitonFn = async (phone, number) => {
        try{
            const response = await checkCertificationNumber({phone, number});
            if(response){
                Alert.alert('인증번호 확인', '인증번호를 확인하였습니다',[{text: '확인', onPress: () => console.log('OK Pressed')}]);
                setStepBtn(2);
            }else{
                Alert.alert('인증번호 오류', '정확한 인증번호로 입력해주세요',[{text: '확인', onPress: () => console.log('OK Pressed')}]);
            }
        }catch(error){
            console.error('changePhoneNum error:', error);
            Alert.alert('인증번호 오류', '정확한 인증번호로 입력해주세요', [{text: '확인', onPress: () => console.log('OK Pressed')}]);
        }
        
    }

    const changePasswrod = async (password) => {
        try{
            const response = await changePassword(password);
            if(response){
                Alert.alert('변경 완료', '비밀번호가 변경되었습니다', [
                    {text: '확인', onPress: () => navigation.goBack()},
                    ]);
            }else{
                Alert.alert('인증 실패', '인증 번호를 확인해주세요.');
            }
        }catch(error){
            console.error('changePhoneNum error:', error);
            Alert.alert('에러', '휴대폰번호 변경에 실패했습니다.');
        }
    }

    return (
        <Container>
        <Content>
        <GobackBlackGrid onPress={goBack}>비밀번호 변경</GobackBlackGrid>
        
        {
            stepBtn === 0 && (
                <>
                <TextContainer>
                <GuideText>회원가입시 등록된 휴대폰번호로</GuideText>
                <GuideText>인증번호를 발송합니다</GuideText>
            </TextContainer>
            <GetCertificationBtn onPress={()=>getCertification(phone)}>
                <GetCertificationText>인증번호 요청</GetCertificationText>
            </GetCertificationBtn>
                </>
            )
        }
        {
            showCertificationInput && stepBtn === 1 && (
        <>
        <CertificationTextContainer>
        <CeritText>인증번호</CeritText>
        </CertificationTextContainer> 
            <CertificationIputBox>
            <TextInput
                style={{marginLeft: 10, fontSize: 14}}          
                placeholder="인증번호 6자리를 입력해주세요"
                placeholderTextColor={COLORS.gray_300}
                onChangeText={certificationTextChange}
                // secureTextEntry={true}
                />
                 <CertificationTimer>
                0{formatTime(secondsLeft)}
                </CertificationTimer>
            </CertificationIputBox>
                <ResendBtn onPress={()=>getCertification(phone)}>
                 <ResendText>인증번호 재전송</ResendText>
                </ResendBtn>
        </>)
        }
         {
            showCertificationInput && stepBtn === 2 && (
        <>
        <PasswordContainer>
        <CeritText>새 비밀번호 입력</CeritText>
        </PasswordContainer> 
            <CertificationIputBox>
            <TextInput
                style={{marginLeft: 10, fontSize: 14}}          
                placeholder="영어 소문자, 숫자, 특수문자 포함 8자리~16자리"
                placeholderTextColor={COLORS.gray_300}
                onChangeText={passwrdTextChange}
                onBlur={validatePasswordInput} 
                // secureTextEntry={true}
                />
            </CertificationIputBox>
                {
                   passwordError &&  
                   <ErrorTextContainer  key={passwordError}>
                   <ErrorText>{passwordError}</ErrorText> 
                   </ErrorTextContainer>
                }
            <SecondPasswordContainer>
        <CeritText>새 비밀번호 입력 확인</CeritText>
        </SecondPasswordContainer> 
            <CertificationIputBox>
            <TextInput
                style={{marginLeft: 10, fontSize: 14}}          
                placeholder="한 번 더 입력해주세요"
                placeholderTextColor={COLORS.gray_300}
                onChangeText={checkPasswrdTextChange}
                // secureTextEntry={true}
                />
            </CertificationIputBox>
            {
                   !isSamePassword && checkPassword.length > 7 &&
                   <ErrorTextContainer>
                   <ErrorText>비밀번호가 일치하지 않습니다</ErrorText> 
                   </ErrorTextContainer>
            }
        </>)
        }
        </Content>
                {
                    stepBtn === 1 && (
                    <GetCertificationNextBtn onPress={()=>checkCertificaitonFn(phone, number)}>
                        <GetCertificationNextText>다음</GetCertificationNextText>
                    </GetCertificationNextBtn>
                    )
                }
                {
                    stepBtn === 2 && (
                    <GetCertificationNextBtn props={stepBtn} onPress={()=>changePasswrod(password)}>
                        <GetCertificationNextText props={stepBtn}>수정</GetCertificationNextText>
                    </GetCertificationNextBtn>
                    )
                }
        </Container>
    );
}

export default ChangePasswordTemplate;

const Container = styled.View`
    flex:1;
    padding: 0 20px;
    background-color: ${COLORS.white};
`

const TextContainer = styled.View`
    margin-top: 53px;
    margin-bottom: 20px;
`

const GuideText = styled.Text`
color: ${COLORS.sub};
font-size: 16px;
font-weight: 500;
line-height: 24.80px;
`

const GetCertificationBtn = styled.TouchableOpacity`
 background-color: ${COLORS.gray_100};
 border-radius: 13px;
    align-items: center;
    justify-content: center;
    padding: 14px 0;
`

const GetCertificationText = styled.Text`
font-size: 16px;
font-weight: 500;
line-height: 22.40px;
color: ${COLORS.sub};
`

const CertificationTextContainer = styled.View`
    margin-top: 38px;
    margin-bottom: 8px;
`

const CeritText = styled.Text`
color: ${COLORS.gray_400};
font-size: 14px;
font-weight: 400;
line-height: 22.40px;
`

const CertificationIputBox = styled.View`
flex-direction: row;
border: 1px solid ${COLORS.gray_200}; 
border-radius: 13px;
height: 52px;
align-items: center;
`;

const CertificationTimer = styled.Text`
    position: absolute;
    right: 10px;
    color: #FF7A00;
font-size: 14px;
font-weight: 500;
line-height: 22.40px;

`;



const ResendBtn = styled.TouchableOpacity`
    margin-top: 8px;
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

const Content = styled.View`
    flex: 1;
`;

const GetCertificationNextBtn = styled.TouchableOpacity`
    position: absolute;
    bottom: 20px;
    left: 10px;
    right: 10px;
    /* background-color: ${COLORS.gray_100}; */
    background-color: ${props => props.props === 2 ? COLORS.sub : COLORS.gray_100};
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
color: ${props => props.props === 2 ? COLORS.white : COLORS.gray_300};
`

const PasswordContainer = styled.View`
    margin-top: 38px;
    margin-bottom: 8px;
`

const SecondPasswordContainer = styled.View`
    margin-top: 22px;
    margin-bottom: 8px;
`

const ErrorTextContainer = styled.View`
    width: 100%;
    margin-top: 1px;
`;

const ErrorText = styled.Text`
color: #E11616;
font-size: 12px;
font-weight: 400;
line-height: 16.80px;
padding-left: 2px;
`;


