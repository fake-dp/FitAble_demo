import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { useNavigation } from '@react-navigation/native';

function PaymentResultScreen(props) {

    const navigation = useNavigation();

    const handlegoHome = () => {
        navigation.navigate('Home');
    }

    return (
        <Container>
            <PaymentBoxContainer>

            <PaymentTextContainer>
            <PaymentResultText>결제가 완료되었습니다.</PaymentResultText>
            <PaymentSubText>결제되었습니다. 운동을 시작해주세요!</PaymentSubText>
            </PaymentTextContainer>
 

            <PaymentResultBtn onPress={handlegoHome}>
                <PaymentResultBtnText>홈으로</PaymentResultBtnText>
            </PaymentResultBtn>
            </PaymentBoxContainer>
        </Container>
    );
}

export default PaymentResultScreen;

const Container = styled.View`
    flex: 1;
    background-color: ${COLORS.sub};
    padding: 0 20px;
    padding-top: 50%;
    justify-content: center;
`

const PaymentResultText = styled.Text`
    color: ${COLORS.white};
    font-size: 28px;
font-style: normal;
font-weight: 400;
line-height: 37.8px; 
letter-spacing: -0.7px;
text-align: center;
`

const PaymentSubText = styled.Text`
    color: ${COLORS.white};
text-align: center;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height:22.4px;
letter-spacing: -0.35px;
`

const PaymentBoxContainer = styled.View`
    flex-direction: column;
    justify-content: space-between;
    height:70%;
`

const PaymentTextContainer = styled.View`
`

const PaymentResultBtn = styled.TouchableOpacity`
    width: 100%;
    height: 56px;
    background-color: ${COLORS.main};
    border-radius: 50px;
    align-items: center;
    justify-content: center;
`;

const PaymentResultBtnText = styled.Text`
    color: ${COLORS.sub};
    font-size: 16px;
    font-weight: 600;
    line-height: 22.40px;
`;