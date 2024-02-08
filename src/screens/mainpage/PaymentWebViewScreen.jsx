import React,{ useRef, useEffect, useState} from 'react';
import { WebView } from 'react-native-webview';
import { View,Text,ActivityIndicator } from 'react-native';
import {postPaymentInfo,postNicepayPayment} from '../../api/cardApi';
import { COLORS } from '../../constants/color';
import { useNavigation } from '@react-navigation/native';
import {getParameterByName} from '../../utils/CustomUtils';
function PaymentWebViewScreen(props) {

  const { totalPrice, goodsName,memberTicketId, moid} = props.route.params;
console.log('@라우터전달',totalPrice, goodsName,memberTicketId, moid)
  const navigation = useNavigation();

  const [isPaymentProcessed, setIsPaymentProcessed] = useState(false);

//   const [memberTicketId, setMemberTicketId] = useState(null);
//   const [moid, setMoid] = useState(null);

//   const postInfoPaymentId = async () => {
//      try {
//        const response = await postPaymentInfo(paymentInfoData);
//         //  console.log('결제정보',response);
//          setMemberTicketId(response.memberTicketId);
//          setMoid(response.moid);
//      } catch (error) {
//        console.error('Error getting:', error.response);
//      }
// }

  const handleNicePayment = async (data) => {

    if (isPaymentProcessed) return;

    try {
      const response = await postNicepayPayment(data);
        console.log('결제정보',response);
        if(response){
          setIsPaymentProcessed(true); 
          navigation.navigate('PaymentResult');
        }
    } catch (error) {
      setIsPaymentProcessed(true); 
      console.error('Error getting:!!@@', error.response.data.code === 20616);
      if(error.response.data.code === 20616){
       console.log('결제중복')
      }
    }finally{
      setIsPaymentProcessed(true);
    }
  }


  // test배포용
  // const uri = `https://reactpaytest-app.vercel.app/payment?totalPrice=${totalPrice}&goodsName=${goodsName}&memberTicketId=${memberTicketId}`;
  // 배포용
  // const uri =`http://175.45.204.94/payment/Payment?totalPrice=${totalPrice}&goodsName=${goodsName}&memberTicketId=${memberTicketId}`

  const uri = 'https://www.noteggdev.co.kr/payRequest_utf.php'


  const onNavigationStateChange = (navState) => {
    console.log('웹뷰 내비게이션 상태 변경:', navState);
  
    // navState.url에서 URL 객체를 생성
    const url = navState.url;
    const successUrl = 'https://www.noteggdev.co.kr/success.html';
    if (url.startsWith(successUrl) && !isPaymentProcessed) {
      const moid = getParameterByName('moid',url);
      const paymentAmt = getParameterByName('paymentAmt',url);
      const paymentMethod = getParameterByName('paymentMethod',url);
      const mid = getParameterByName('mid',url);
      const tid = getParameterByName('tid',url);
      const authCode = getParameterByName('authCode',url);
      const authDate = getParameterByName('authDate',url);
      const acquCardCode = getParameterByName('acquCardCode',url);
      const cardCode = getParameterByName('cardCode',url);
      const cardName = getParameterByName('cardName',url);
      const cardNumber = getParameterByName('cardNumber',url);
      const cardQuota = getParameterByName('cardQuota',url);

      const paymentData = {
        memberTicketId,
        moid,
        paymentAmt,
        paymentMethod,
        mid,
        tid,
        authCode,
        authDate,
        acquCardCode,
        cardCode,
        cardName,
        cardNumber,
        cardQuota
      }

      handleNicePayment(paymentData);

      console.log(`MOID: ${moid}, 
      Payment Amount: ${paymentAmt},
       Payment Method: ${paymentMethod},
       Payment mid: ${mid},
       Payment tid: ${tid},
       Payment authDate: ${authDate},
       Payment acquCardCode: ${acquCardCode},
       Payment authCode: ${authCode},
       Payment cardCode: ${cardCode},
       Payment cardName: ${cardName},
       Payment cardNumber: ${cardNumber},
       Payment cardQuota: ${cardQuota},`);
       }
    }
  

  if (memberTicketId && moid) {
    return (
      <WebView
        onNavigationStateChange={onNavigationStateChange}
        source={{ 
          headers: {
            'Content-Type': "application/x-www-form-urlencoded"
          },
          uri: uri,
          method: 'POST',
          body: `price=${totalPrice}&goodsName=${goodsName}&memberTicketId=${memberTicketId}&moid=${moid}`
        }}
      />
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:COLORS.sub }}>
      <ActivityIndicator size="large" color={COLORS.main} />
    </View>
    )
  }
}

export default PaymentWebViewScreen;
