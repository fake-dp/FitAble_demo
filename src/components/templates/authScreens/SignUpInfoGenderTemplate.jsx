import styled from 'styled-components/native';
import {COLORS} from '../../../constants/color'
import GobackGrid from '../../grid/GobackGrid';
import {useNavigation} from '@react-navigation/native';
import EctInput from '../../ui/inputUi/EctInput';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {TextInput, Alert} from 'react-native';
import {signUpInfoState} from '../../../store/atom';
import { useRecoilState } from 'recoil';
import { formatTime } from '../../../utils/CustomUtils';
import {getCertificationNumber,checkCertificationNumber,checkPhone} from '../../../api/certificationApi';
import SelectDatePicker from '../../ui/custom/SelectDatePicker';

function SignUpInfoGenderTemplate(props) {

    const navigation = useNavigation();

    const [signUpInfo, setSignUpInfo] = useRecoilState(signUpInfoState);
    const [selectedGender, setSelectedGender] = useState(null);
    const [showDateText, setShowDateText] = useState(false);
    // setShowStopTicketPicker,setStopShowModal

    const [showModal ,setShowModal] = useState(false);
    const [showSelectDatePicker, setShowSelectDatePicker] = useState(false);

    const [selectedYear, setSelectedYear] = useState('1970');
    const [selectedMonth, setSelectedMonth] = useState('01');
    const [selectedDay, setSelectedDay] = useState('01');


    const goBackNavigation = () => {
        // 로그인 화면으로 이동
        navigation.navigate('SignIn');
        setSignUpInfo({...signUpInfo, name: '', phone: ''});
    }

    // 날짜 선택
    const selectDateBtn = () => {
        setShowModal(true)
        // navigation.setOptions({
        //     headerStyle: {
        //         backgroundColor: "#00000080", // 투명도 적용
        //     },
        //     // headerTransparent: true, // 헤더 투명도 설정
        // });
    }



    const handleOutsideClick = () => {
        // setShowSelectDatePicker(false);
        setSignUpInfo({...signUpInfo, birthDay: `${selectedYear}-${selectedMonth}-${selectedDay}`})
        setShowDateText(true)
        setShowModal(false)
        navigation.setOptions({
            headerStyle: {
              backgroundColor: COLORS.sub, // 원래의 헤더 색상으로 변경
            },
          });
      };

    //
    const nextStepBtn = () => {
        if(showDateText === false){
            console.log('ddfasdfasdf')
            Alert.alert('생년월일 선택', '생년월일을 선택해주세요.', [
                {text: '확인', onPress: () => console.log('OK Pressed')}
                ]);
            }else
            
            if(!selectedGender){
            Alert.alert('성별 선택', '성별을 선택해주세요.', [
                {text: '확인', onPress: () => console.log('OK Pressed')}
                ]);
        }else{
        //     //lll 성공로직
          console.log('ddddd',signUpInfo)
            navigation.navigate('Password');
          setSignUpInfo({
            ...signUpInfo, 
            gender : selectedGender === "남자" ? "MALE" : "FEMALE",
            birthDay: `${selectedYear}-${selectedMonth}-${selectedDay}`
          })
        }
    
    }




    const isActiveBtn = selectedGender !== null && showDateText === true ? true : false;

    console.log('daaa', signUpInfo)
    // console.log('회원가입 정보',signUpInfo,selectedGender)

    return (
        <>
        <Container>
            <GobackGrid onPress={goBackNavigation}/>
            <SignUpInfoContainer>
                <SignUpText>생년월일과 성별을</SignUpText>
                <SignUpText>입력해주세요</SignUpText>
            </SignUpInfoContainer>

            <KeyboardAwareScrollView extraScrollHeight={20} style={{flex: 1}}>
                <SignInputBox>
                    <SelectDateContainer onPress={selectDateBtn}>
                        <SelectDateText isActive={showDateText}>
                            {
                                showDateText ? `${selectedYear}.${selectedMonth}.${selectedDay}` :'생년월일을 선택해주세요'
                            }
                            </SelectDateText>
                    </SelectDateContainer>
                    
                    <SelectGenderContainer>
                        <SelectGenderBoxTouch 
                            style={{marginRight: 8}}
                            onPress={() => setSelectedGender('남자')}
                            >
                            <SelectGenderText style={{color: selectedGender === '남자' ? COLORS.main : COLORS.gray_400}}>남자</SelectGenderText>
                        </SelectGenderBoxTouch>
                        <SelectGenderBoxTouch
                            onPress={() => setSelectedGender('여자')}
                            >
                            <SelectGenderText style={{color: selectedGender === '여자' ? COLORS.main : COLORS.gray_400}}>여자</SelectGenderText>
                        </SelectGenderBoxTouch>
                    </SelectGenderContainer>

                 </SignInputBox>  
            </KeyboardAwareScrollView>
                
                        <GetCertificationNextBtn 
                         onPress={nextStepBtn}
                        isActive={isActiveBtn}>
                        <GetCertificationNextText 
                        isActive={isActiveBtn}>다음</GetCertificationNextText>
                        </GetCertificationNextBtn>
                   
               
        </Container>
                {
                    showModal && (
                        <SelectDatePicker 
                            setShowModal={setShowModal}
                           
                            setSelectedYear={setSelectedYear}
                            setSelectedMonth={setSelectedMonth}
                            setSelectedDay={setSelectedDay}
                           
                            handleOutsideClick={handleOutsideClick}
                        />
                    )
                }
        </>
    );
}



export default SignUpInfoGenderTemplate;

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

const SelectDateContainer = styled.TouchableOpacity`
flex-direction: row;
justify-content: center;
align-items: center;
background-color: ${COLORS.box};
width: 100%;
height: 70px;
border-radius: 15px;
`;

const SelectDateText = styled.Text`
font-size: 16px;
font-weight: 500;
line-height: 22.40px;
/* color: ${COLORS.gray_400}; */
color: ${props => props.isActive ? COLORS.white : COLORS.gray_400};
`

const SelectGenderContainer = styled.View`
flex-direction: row;
margin-top: 12px;
`

const SelectGenderBoxTouch = styled.TouchableOpacity`
flex: 1;
background-color: ${COLORS.box};
height: 70px;
border-radius: 15px;
align-items: center;
justify-content: center;
`

const SelectGenderText = styled.Text`
font-size: 16px;
font-weight: 500;
line-height: 22.40px;
color: ${COLORS.gray_400};
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

