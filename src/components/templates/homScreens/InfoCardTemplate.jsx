import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
import { TextInput,Alert,TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {getCardInfo,getIsExistCard, postCardInfo,postPaymentSubscription} from '../../../api/cardApi';
import { useEffect, useState,useRef } from 'react';
import {formatCardExpirationDate ,formatCardNumber} from '../../../utils/CustomUtils';
import {showSubModalState} from '../../../store/atom';
import { useRecoilState } from 'recoil';
import SubPaymentModal from '../../ui/modal/SubPaymentModal';
function InfoCardTemplate(props) {
    const route = useRoute();
    const isCardState = route?.params?.text
    const subPaymentInfoData = route?.params?.subPaymentInfoData
    const navigation = useNavigation();

    const [cardNumber, setCardNumber] = useState('');
    const [cardDate, setCardDate] = useState('');
    const [cardPassword, setCardPassword] = useState('');

    const [isFirstFocused, setIsFirstFocused] = useState(false);
    const [isSecondFocused, setIsSecondFocused] = useState(false);
    const [isThirdFocused, setIsThirdFocused] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentModal, setPaymentModal] = useRecoilState(showSubModalState);
    const [paymentModalData, setPaymentModalData] = useState('');
    console.log('@@paymentModalData',subPaymentInfoData,isCardState)

    const firstRef = useRef();
    const secondRef = useRef();
    const thirdRef = useRef();


    const getCardInfoDate = async () => {
        try {
            const response = await getCardInfo();
            console.log('response123123',response);
            setCardNumber(isCardState === 'isChange'&& response?.cardNumber?.length > 0 ? response.cardNumber+'********': '');
        } catch (error) {
            console.error('Error getting:', error);
        }
    }


    const cardRegistrationBtn = async () => {
        console.log('일단 등록')
        if(isValid){
            const [expirationMonth, expirationYear] = cardDate.split('/');
            const formattedCardNumber = cardNumber.replace(/ - /g, '');
            const data = {
                cardNumber: formattedCardNumber,
                expirationYear: expirationYear,
                expirationMonth: expirationMonth,
                password: cardPassword
            }
                try {
            const response = await postCardInfo(data);
            console.log('response',response);
           
            if(response && isCardState === 'isChange'){
                Alert.alert('변경 완료 ', '정기 결제 카드가 변경되었습니다. \n정기 결제일은 매월 25일입니다.', [{ text: '확인', onPress: () =>  navigation.goBack() }]);;
            }else if(response && isCardState === 'isCard'){
                Alert.alert('등록 완료 ', '정기 결제 카드가 등록되었습니다. \n이달 구독권을 결제합니다. \n다음 달의 구독권은 오는 25일에 결제됩니다.', [{ text: '다음', onPress: () => subPaymentBtn(subPaymentInfoData) }]);
            }else if(response && isCardState === 'isUseCard'){
                Alert.alert('등록 완료 ', '결제 카드가 등록되었습니다. \n결제하기 버튼을 클릭해주세요', [{ text: '다음', onPress: () => navigation.goBack() }]);
                return;
            }
        } catch (error) {
            console.error('Error getting11:', error.response.data);
            if(error.response.data.code === 10400){
                Alert.alert('결제 실패', '정기 결제가 정상적으로 이루어지지 않았습니다 \n다른 카드로 시도해주세요', [{ text: '확인', onPress: () => console.log(error.response.data) }]);
            }else if(error.response.data.code === 10407){
                Alert.alert('정보 오류', '생년월일이 정확하지 않습니다 \n생년월일 확인 화면으로 이동합니다', [{ text: '확인', onPress: () => navigation.navigate('InfoCardbirt') }]);
            }else if(error.response.data.code === 10408){
                Alert.alert('결제 실패', '카드 비밀번호가 올바르지 않습니다', [{ text: '확인', onPress: () => console.log(error.response.data) }]);
            }else if(error.response.data.code === 10401){
                Alert.alert('결제 실패', '유효하지 않은 카드입니다 \n다른 카드로 시도해주세요', [{ text: '확인', onPress: () => console.log(error.response.data) }]);
            }else{
                Alert.alert('결제 실패', '정기 결제가 정상적으로 이루어지지 않았습니다 \n다른 카드로 시도해주세요', [{ text: '확인', onPress: () => console.log(error.response.data) }]);
            }
        }
            console.log('data',data)
        }
    }

    const subPaymentBtn = async(subPaymentInfoData) => {
        console.log('subPaymentInfoData@@!@#!@#',subPaymentInfoData)
        if (isSubmitting) {
            // 이미 제출 중이면 추가 처리를 방지
            console.log('Already submitting, please wait...');
            return;
        }
        setIsSubmitting(true);
            try{
                const response = await postPaymentSubscription(subPaymentInfoData);
                console.log('response',response)
                if(response){
                    setPaymentModal(true);
                    setPaymentModalData(response);
                }
            }catch(error){
                console.error('Error getting:', error.response.data);
            }finally{
                setTimeout(() => {
                    setPaymentModal(false);
                    navigation.navigate('Home');
                    setIsSubmitting(false); 
                }, 3000);
            }
        }
        console.log('cardNumber',cardNumber)


    useEffect(() => {
        if(isCardState === 'isChange'){
            getCardInfoDate();
        }
    },[]);



    const goBackScreens = () => {
        navigation.goBack();
    };
const isValid = cardNumber?.length === 25 && cardDate?.length === 5 && cardPassword?.length === 2

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            <GobackBlackGrid onPress={goBackScreens}>카드 등록</GobackBlackGrid>
                <TitleContainer>
                    <TitleText>카드 정보를</TitleText>
                    <TitleText>입력해주세요</TitleText>
                </TitleContainer>

                <CardContainer>
                        <CardInfoFirstInput
                            isFocused={isFirstFocused}
                            ref={firstRef}
                             placeholder="1234 - 1234 - 1234 -1234"
                             placeholderTextColor={COLORS.gray_300}
                             value={cardNumber&&formatCardNumber(cardNumber)}
                             onChangeText={(text)=>{
                                    setCardNumber(text);
                                    if (text.length === 25) {
                                        secondRef.current.focus();
                                    }
                             }}
                             maxLength={25}
                             keyboardType="numeric"
                             onFocus={() => setIsFirstFocused(true)}
                             onBlur={() => setIsFirstFocused(false)}
                            //  returnKeyType="done"
                        />
                    <CardSmallBoxContainer>

                        <CardInfoTextInput 
                             isFocused={isSecondFocused}
                            ref={secondRef}
                            placeholder="MM/YY"
                            placeholderTextColor={COLORS.gray_300}
                            value={cardDate&&formatCardExpirationDate(cardDate)}
                            // onChangeText={setCardDate}
                            onChangeText={(text)=>{
                                setCardDate(text);
                                if (text.length === 5) {
                                    thirdRef.current.focus();
                                }
                            }}
                            onKeyPress={({ nativeEvent }) => {
                                if (nativeEvent.key === 'Backspace' && cardDate.length === 0) {
                                    firstRef.current.focus();
                                }
                            }
                            }
                            maxLength={5}
                            keyboardType="numeric"
                            // returnKeyType="done"
                            onFocus={() => setIsSecondFocused(true)}
                            onBlur={() => setIsSecondFocused(false)}
                            />
                        

                     <CardInfoTextInput
                     isFocused={isThirdFocused}
                            ref={thirdRef}
                            placeholder="비밀번호 앞 2자리"
                            placeholderTextColor={COLORS.gray_300}
                            value={cardPassword}
                            onChangeText={setCardPassword}
                            onKeyPress={({ nativeEvent }) => {
                                if (nativeEvent.key === 'Backspace' && cardPassword.length === 0) {
                                    secondRef.current.focus();
                                }
                            }
                            }
                            maxLength={2}
                            secureTextEntry={true}
                            keyboardType="numeric"
                            returnKeyType="done"
                            onFocus={() => setIsThirdFocused(true)}
                            onBlur={() => setIsThirdFocused(false)}
                            onSubmitEditing={cardRegistrationBtn}
                            />

                    </CardSmallBoxContainer>

                <CardGuideContainer>
                    <CardGuideText>· 본인 명의의 카드만 등록할 수 있습니다.</CardGuideText>
                    <CardGuideText>· 카드는 한 개만 등록할 수 있습니다.</CardGuideText>
                </CardGuideContainer>
                </CardContainer>

                    <CardBtnContainer
                    colorProp={isValid}
                    onPress={cardRegistrationBtn}
                    disabled={!isValid}
                    >
                        <CardBtnText
                        colorProp={isValid}
                        >등록</CardBtnText>
                    </CardBtnContainer>
        {
            paymentModal && (
                <SubPaymentModal 
                paymentModalData={paymentModalData}
                />
            )
        }
        </Container>
        </TouchableWithoutFeedback>
    );
}


export default InfoCardTemplate;

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
padding: 0px;
`

const CardSmallBoxContainer = styled.View`
    flex-direction: row;
    margin-top: 12px;
    margin-bottom: 8px;
    justify-content: space-between;
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


const CardInfoTextInput = styled.TextInput`
    flex-direction: row;
    border: 1px solid ${({ isFocused }) => (isFocused ? COLORS.sub : COLORS.gray_300)};
    border-radius: 13px;
    height: 50px;
    align-items: center;
    width: 48%;
    padding-left: 10px;
`

const CardInfoFirstInput = styled.TextInput`
    border: 1px solid ${({ isFocused }) => (isFocused ? COLORS.sub : COLORS.gray_300)};
    border-radius: 13px;
    height: 50px;
    padding-left: 10px;
    width: 100%;
`;
