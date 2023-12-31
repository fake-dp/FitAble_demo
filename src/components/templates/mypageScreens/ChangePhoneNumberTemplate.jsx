import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
import { TextInput ,Alert,TouchableWithoutFeedback, Keyboard} from 'react-native';
import { useState } from 'react';
import { formatTime } from '../../../utils/CustomUtils';
import {changePhone} from '../../../api/mypageApi';
import {getCertificationNumber,checkCertificationNumber} from '../../../api/certificationApi';
import { useRecoilState } from 'recoil';
import { myinfoState } from '../../../store/atom';

function ChangePhoneNumberTemplate(props) {
    const navigation = useNavigation();
    const [myInfo, setMyInfo] = useRecoilState(myinfoState);

    const [phone, setPhone] = useState('');
    const [number, setNumber] = useState('');

    const [secondsLeft, setSecondsLeft] = useState(180);
    const [showCertificationInput, setShowCertificationInput] = useState(false);
    const [stepBtn, setStepBtn] = useState(0);
   
    const phoneTextChange = (text) => {
        setPhone(text);
    }

    const certificationTextChange = (text) => {
        setNumber(text);
    }

    // 휴대폰번호 변경
    const changePhoneNum = async (phone, number) => {
        try{
            const response = await checkCertificationNumber({phone, number});
            if(response){
                changePhoneNumInnerFc(phone)
            }else{
                Alert.alert('인증번호 오류', '정확한 인증번호로 입력해주세요',[{text: '확인', onPress: () => console.log('OK Pressed')}]);
            }
        }catch(error){
            console.error('changePhoneNum error:', error);
            Alert.alert('인증번호 오류', '정확한 인증번호로 입력해주세요', [{text: '확인', onPress: () => console.log('OK Pressed')}]);
        }
        
    }

    // 번호 변경 내부 함수
    const changePhoneNumInnerFc = async (phone) => {
        try{
            const response = await changePhone(phone);
            if(response){
                setMyInfo({...myInfo, phone: phone});
                Alert.alert('변경 완료', '휴대폰번호가 변경되었습니다', [
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

    // 인증번호 받아오기 & 재인증
    const getCertification = async (phone) => {
        try {
            const response = await getCertificationNumber(phone);
            if (response.id) {
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
    
    const goBack = () => {
        navigation.goBack();
    }

    const nextBtn = (phone) => {

        const phoneRegex = /^010\d{8}$/;

        if(!phoneRegex.test(phone)){
            Alert.alert('휴대폰번호 오류', '입력하신 휴대폰번호가 올바른지\n 다시 한 번 확인해주세요', [
                {text: '확인', onPress: () => console.log('OK Pressed')},
              ]);
            return;
        }else{
            getCertification(phone);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            <Content>

        <GobackBlackGrid onPress={goBack}>휴대폰번호 변경</GobackBlackGrid>

        <TextContainer>
            <GuideText>새로운 휴대폰번호</GuideText>
        </TextContainer> 
        <PasswordIputBox>
            <TextInput
                style={{marginLeft: 10, fontSize: 14}}
                placeholder="변경할 휴대폰번호 11자리를 - 없이 입력해주세요"
                placeholderTextColor={COLORS.gray_300}
                onChangeText={phoneTextChange}
                maxLength={11}
                keyboardType="numeric"
                />
        </PasswordIputBox>
        
        {
            showCertificationInput && (
                <>
                <CertificationTextContainer>
                <GuideText>인증번호</GuideText>
     </CertificationTextContainer> 
     <CertificationIputBox>
        <TextInput
            style={{marginLeft: 10, fontSize: 14}}
            placeholder="인증번호 6자리를 입력해주세요"
            placeholderTextColor={COLORS.gray_300}
            onChangeText={certificationTextChange}
            maxLength={6}
            onSubmitEditing={() => changePhoneNum(phone, number)}
            // secureTextEntry={true}
            />
             <CertificationTimer>
            0{formatTime(secondsLeft)}
            </CertificationTimer>
        </CertificationIputBox>
        <ResendBtn onPress={()=>getCertification(phone)}>
            <ResendText>
                인증번호 재전송
            </ResendText>
        </ResendBtn>
            </>
            )
        }
                </Content>
                {
                    stepBtn === 0 ? (
                        <GetCertificationNextBtn isActive={phone.length > 10} onPress={()=>nextBtn(phone)}>
                        <GetCertificationNextText isActive={phone.length > 10}>다음</GetCertificationNextText>
                    </GetCertificationNextBtn>
                    ) : (
                        <GetCertificationNextBtn isActive={number.length > 5} onPress={()=>changePhoneNum(phone, number)}>
                        <GetCertificationNextText isActive={number.length > 5}>다음</GetCertificationNextText>
                    </GetCertificationNextBtn>
                    )
                }

        </Container>
        </TouchableWithoutFeedback>
    );
}

export default ChangePhoneNumberTemplate;

const Container = styled.View`
    flex:1;
    padding: 0 20px;
    background-color: ${COLORS.white};
`

const TextContainer = styled.View`
    margin-top: 53px;
    margin-bottom: 8px;
`

const CertificationTextContainer = styled.View`
    margin-top: 23px;
    margin-bottom: 8px;
`

const GuideText = styled.Text`
color: ${COLORS.gray_400};
font-size: 14px;
font-weight: 400;
line-height: 22.40px;
`

const PasswordIputBox = styled.View`
flex-direction: row;
border: 1px solid ${COLORS.gray_200}; 
border-radius: 13px;
height: 52px;
align-items: center;
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

const Content = styled.View`
    flex: 1;
`;

const GetCertificationNextBtn = styled.TouchableOpacity`
    position: absolute;
    bottom: 20px;
    left: 10px;
    right: 10px;
    /* background-color: ${COLORS.gray_100}; */
    background-color: ${props => props.isActive ? COLORS.sub : COLORS.gray_100};
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
color: ${props => props.isActive ? COLORS.white : COLORS.gray_300};
`

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