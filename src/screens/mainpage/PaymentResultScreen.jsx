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
            <PaymentResultText>결제가 완료되었습니다.</PaymentResultText>
            <PaymentResultBtn onPress={handlegoHome}>
                <PaymentResultBtnText>확인</PaymentResultBtnText>
            </PaymentResultBtn>
        </Container>
    );
}

export default PaymentResultScreen;

const Container = styled.View`
    flex: 1;
    background-color: ${COLORS.sub};
    padding: 0 20px;
`

const PaymentResultText = styled.Text`
    color: ${COLORS.gray_300};
    font-size: 16px;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
`

const PaymentResultBtn = styled.TouchableOpacity`
    width: 200px;
    height: 56px;
    background-color: ${COLORS.main};
    border-radius: 4px;
    align-items: center;
    justify-content: center;
`;

const PaymentResultBtnText = styled.Text`
    color: ${COLORS.white};
    font-size: 16px;
    font-weight: 500;
    line-height: 22.40px;
`;