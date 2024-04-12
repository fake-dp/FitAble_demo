import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../constants/color';
import {useNavigation} from '@react-navigation/native';
import {postPayment} from '../../api/storeApi';

function StorePaymentResultScreen(props) {
  const paymentInfoData = props.route.params.data;
  const tid = props.route.params.tid;

  console.log('paymentInfoDatapaymentInfoData', props.route.params);
  console.log('paymentInfoDatapaymentInfoData', paymentInfoData);

  const navigation = useNavigation();

  const handlegoHome = () => {
    navigation.pop()
    navigation.navigate('Product');
  };

  const formattedOptions = Object.values(paymentInfoData.product).map(
    option => ({
      cartId: option.cartId ?? null,
      optionId: option.optionId ?? null,

      quantity: option.quantity || 0, // 예시, 실제 데이터에 맞게 조정 필요
    }),
  );

  const postData = {
    tid: tid,
    products: formattedOptions,
    mileage: paymentInfoData.mileage,
  };

  const postPaymentInfo = async () => {
    try {
      const response = await postPayment(postData);
      console.log('postData', postData);

      if (response) {
        console.log(response);
      } else {
        return;
      }
      // 화면으로 이동
    } catch (error) {
      console.error('err', error);
    }
  };

  useEffect(() => {
    if (paymentInfoData) {
      postPaymentInfo();
    }
  }, [props]);

  return (
    <Container>
      <PaymentBoxContainer>
        <PaymentTextContainer>
          <PaymentResultText>결제가 완료되었습니다.</PaymentResultText>
          <PaymentSubText>
            주문상품 확인 화면으로 이동해주시길 바랍니다
          </PaymentSubText>
        </PaymentTextContainer>

        <PaymentResultBtn onPress={handlegoHome}>
          <PaymentResultBtnText>주문상품 확인</PaymentResultBtnText>
        </PaymentResultBtn>
      </PaymentBoxContainer>
    </Container>
  );
}

export default StorePaymentResultScreen;

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.sub};
  padding: 0 20px;
  padding-top: 50%;
  justify-content: center;
`;

const PaymentResultText = styled.Text`
  color: ${COLORS.white};
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: 37.8px;
  letter-spacing: -0.7px;
  text-align: center;
`;

const PaymentSubText = styled.Text`
  color: ${COLORS.white};
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22.4px;
  letter-spacing: -0.35px;
`;

const PaymentBoxContainer = styled.View`
  flex-direction: column;
  justify-content: space-between;
  height: 70%;
`;

const PaymentTextContainer = styled.View``;

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
  line-height: 22.4px;
`;
