import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
import { useState, useRef,useEffect } from 'react';
import { TouchableWithoutFeedback, Keyboard,Alert, Platform } from 'react-native';
import {postCardBirth} from '../../../api/cardApi';
function InfoCardBirthdayTemplate(props) {

    const navigation = useNavigation();
    const [birth, setBirth] = useState('');

    const [btnClick, setBtnClick] = useState(false)

    const [first, setFirst] = useState('');
    const [second, setSecond] = useState('');
    const [third, setThird] = useState('');
    const goBackScreens = () => {
        navigation.goBack();
    };

    useEffect(() => {
        setBirth(`${first}-${second}-${third}`);
    }, [first, second, third]);

    const firstRef = useRef();
    const secondRef = useRef();
    const thirdRef = useRef();

    const [isFirstFocused, setIsFirstFocused] = useState(false);
    const [isSecondFocused, setIsSecondFocused] = useState(false);
    const [isThirdFocused, setIsThirdFocused] = useState(false);

    const rigistBirthday = async() => {
        if(btnClick){
            return;
        }
        setBtnClick(true);

      try{
        const response = await postCardBirth({birth});
        console.log('생일등록',response)
        if(response){
            navigation.navigate('InfoCard')
        }
      }catch(error){
            console.log('생일등록error',error)
            if(error.response.data.code === 10200){
                Alert.alert('정보 오류', '해당 회원을 찾을 수 없습니다', [{ text: '확인', onPress: () => console.log(error.response.data) }]);
            }else if(error.response.data.code === 10000){
                Alert.alert('정보 오류', '생년월일을 다시 입력해주세요', [{ text: '확인', onPress: () => console.log(error.response.data) }]);
            }
            else{
                Alert.alert('정보 오류', '생년월일을 다시 확인해주세요', [{ text: '확인', onPress: () => console.log(error.response.data) }]);
            }
      }finally{
        setBtnClick(false);
      }  
    }

    const isValid = first.length === 4 && second.length === 2 && third.length === 2;


    console.log('birthDay',birth)
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            <GobackBlackGrid onPress={goBackScreens}>카드 등록</GobackBlackGrid>
                <TitleContainer>
                    <TitleText>생년월일을</TitleText>
                    <TitleText>확인해주세요</TitleText>
                </TitleContainer>


                <CardContainer>

                <PhoneInputContainer>
            <PhoneInputFirstText 
                isFocus={isFirstFocused}
                ref={firstRef}
                value={first}
                onChangeText={(text) => {
                    setFirst(text);
                    if (text.length === 4) {
                        secondRef.current.focus();
                    }
                }}
                placeholder={'0000'}
                maxLength={4}
                keyboardType="number-pad"
                onFocus={() => setIsFirstFocused(true)}
                onBlur={() => {
                    setIsFirstFocused(false);
                    if (first.length===4 && !(/^\d{4}$/.test(first) && parseInt(first) >= 1930 && parseInt(first) <= 2099)) {
                        Alert.alert('입력 오류', '연도를 올바르게 입력해주세요');
                        setFirst('');
                        firstRef.current.focus();
                    }
                }}

            />

            <LineText>년</LineText>

            <PhoneInputText 
                isFocus={isSecondFocused}
                ref={secondRef}
                value={second}
                onChangeText={(text) => {
                    setSecond(text);
                    if (text.length === 2) {
                        thirdRef.current.focus();
                    }
                }}
                onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key === 'Backspace' && second.length === 0) {
                        firstRef.current.focus();
                    }
                }}
                placeholder={'00'}
                maxLength={2}
                keyboardType="number-pad"
                onFocus={() => setIsSecondFocused(true)}
                onBlur={() => {
                    setIsSecondFocused(false);
                    if (second.length===2 &&!(/^\d{2}$/.test(second) && parseInt(second) >= 1 && parseInt(second) <= 12)) {
                    Alert.alert('입력 오류', '월은 01~12월 내로 입력해주세요');
                        setSecond('');
                        secondRef.current.focus();
                    }
                }}
            />

            <LineText>월</LineText>

            <PhoneInputText 
                isFocus={isThirdFocused}
                ref={thirdRef}
                value={third}
                onChangeText={setThird}
                onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key === 'Backspace' && third.length === 0) {
                        secondRef.current.focus();
                    }
                }}
                placeholder={'00'}
                maxLength={2}
                keyboardType="number-pad"
                onFocus={() => setIsThirdFocused(true)}
                onBlur={() => {
                    setIsThirdFocused(false);
                    if (third.length===2 &&!(/^\d{2}$/.test(third) && parseInt(third) >= 1 && parseInt(third) <= 31)) {
                        Alert.alert('입력 오류', '일은 01~31일 내로 입력해주세요');
                        setThird('');
                        thirdRef.current.focus();
                    }
                }}
                onSubmitEditing={rigistBirthday}
                returnKeyType="done"
            />
              <LineText>일</LineText>
        </PhoneInputContainer>


                <CardGuideContainer>
                    <CardGuideText>· 카드는 본인 명의의 카드만 등록할 수 있어서</CardGuideText>
                    <CardGuideText>&nbsp; 정확한 생년월일이 필요합니다.</CardGuideText>
                </CardGuideContainer>
                </CardContainer>

                <CardBtnContainer
                    colorProp={isValid}
                    onPress={rigistBirthday}
                    disabled={!isValid}
                    >
                        <CardBtnText
                        colorProp={isValid}
                        >등록</CardBtnText>
                    </CardBtnContainer>

        </Container>
        </TouchableWithoutFeedback>
    );
}

export default InfoCardBirthdayTemplate;

const Container = styled.View`
    flex:1;
    padding: 0 20px;
    background-color: ${COLORS.white};
`

const TitleContainer = styled.View`
    margin-top: 64px;
`

const TitleText = styled.Text`
    font-size: 28px;
    color: ${COLORS.sub};
    font-weight: 400;
    line-height: 37.80px;
`

const CardContainer = styled.View`
margin-top: 46px;
width: 100%;
`

const CardGuideContainer = styled.View`
    margin-top: 29px;
`

const CardGuideText = styled.Text`
    font-size: 14px;
color: ${COLORS.gray_400};
font-weight: 400;
line-height: 22.40px;
`


const CardBtnContainer = styled.TouchableOpacity`
    width: 100%;
    height: 60px;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
    background-color: ${({ colorProp }) => (colorProp ? COLORS.box : COLORS.gray_100)};
    margin-top: 49px;
    margin-bottom: 23px;
    /* 맨아래 */
    position: absolute;
    bottom: 10px;
    left: 20px;
    right: 20px;
`

const CardBtnText = styled.Text`
     color: ${({ colorProp }) => (colorProp ? COLORS.white : COLORS.gray_300)};
`


const PhoneInputContainer = styled.View`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
width: 100%;
`

const PhoneInputFirstText = styled.TextInput`
 padding: 16px;
 width: 26%;
 height: 50px;
  border-radius: 13px;
  border: 1px solid ${props => (props.isFocus ? COLORS.sub : COLORS.gray_200)};
  text-align: center;
`

const PhoneInputText = styled.TextInput`
 padding: 16px;
 width: 24%;
 height: 50px;
  border-radius: 13px;
  border: 1px solid ${props => (props.isFocus ? COLORS.sub : COLORS.gray_200)};
  text-align: center;
`

const LineText = styled.Text`
color: ${COLORS.sub};
margin-right: 20px;
margin-left: 2px;
`