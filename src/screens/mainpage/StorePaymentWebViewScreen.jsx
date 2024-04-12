import React, {useRef, useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import {View, Text, ActivityIndicator} from 'react-native';
import {postPaymentInfo} from '../../api/storeApi';
import {v4 as uuidv4} from "uuid";
import {COLORS} from '../../constants/color';
import {useNavigation} from '@react-navigation/native';
import {getParameterByName} from '../../utils/CustomUtils';
function StorePaymentWebViewScreen(props) {
  const {paymentInfoData, totalPrice, goodsName} = props.route.params;
  console.log('@라우터전달', totalPrice, goodsName);
  const navigation = useNavigation();

  console.log('paymentInfoData', paymentInfoData);
  const [isPaymentProcessed, setIsPaymentProcessed] = useState(false);

  const [memberTicketId, setMemberTicketId] = useState(null);
  // const [moid, setMoid] = useState(null);
 const moid = uuidv4();

 console.log('moid',moid)
  // const postInfoPaymentId = async () => {
  //   try {
  //     const response = await postPaymentInfo(paymentInfoData);
  //     //  console.log('결제정보',response);
  //     setMemberTicketId(response.memberTicketId);
  //     setMoid(response.moid);
  //   } catch (error) {
  //     console.error('Error getting:', error.response);
  //   }
  // };

  const handleNicePayment = async data => {
    if (isPaymentProcessed) return;

    try {
      const response = await postPaymentInfo(data);
      console.log('결제정보', response);
      if (response) {
        setIsPaymentProcessed(true);
        console.log('결제성공', response.tid)
        navigation.pop()
        navigation.navigate('StorePaymentResult', {data:paymentInfoData, tid:response.tid});
      }
    } catch (error) {
      setIsPaymentProcessed(true);
      console.error('Error getting:!!@@', error.response.data.code === 20616);
      if (error.response.data.code === 20616) {
        console.log('결제중복');
      }
    } finally {
      setIsPaymentProcessed(true);
    }
  };

  // useEffect(() => {
  //   if (paymentInfoData) {
  //     postInfoPaymentId();
  //   }
  // }, []);

  // test배포용
  // const uri = `https://reactpaytest-app.vercel.app/payment?totalPrice=${totalPrice}&goodsName=${goodsName}&memberTicketId=${memberTicketId}`;
  // 배포용
  // const uri =`http://175.45.204.94/payment/Payment?totalPrice=${totalPrice}&goodsName=${goodsName}&memberTicketId=${memberTicketId}`
  // 118.67.133.204
  //테스트 결제
  const uri = 'https://www.noteggdev.co.kr/payRequest_utf.php';
  //실제 결제
  // const uri = 'http://118.67.133.204/payRequest_utf.php'

  const onNavigationStateChange = navState => {
    console.log('웹뷰 내비게이션 상태 변경:', navState);
    // navState.url에서 URL 객체를 생성
    const url = navState.url;
    const successUrl = 'https://www.noteggdev.co.kr/success.html';
    if (url.startsWith(successUrl) && !isPaymentProcessed) {
      const moid = getParameterByName('moid', url);
      const paymentAmt = getParameterByName('paymentAmt', url);
      const paymentMethod = getParameterByName('paymentMethod', url);
      const mid = getParameterByName('mid', url);
      const tid = getParameterByName('tid', url);
      const authCode = getParameterByName('authCode', url);
      const authDate = getParameterByName('authDate', url);
      const acquCardCode = getParameterByName('acquCardCode', url);
      const cardCode = getParameterByName('cardCode', url);
      const cardName = getParameterByName('cardName', url);
      const cardNumber = getParameterByName('cardNumber', url);
      const cardQuota = getParameterByName('cardQuota', url);

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
        cardQuota,
      };

  if(!isPaymentProcessed){
    handleNicePayment(paymentData);
  }

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
  };

  // if (memberTicketId && moid) {
  return (
    <WebView
      onNavigationStateChange={onNavigationStateChange}
      source={{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        uri: uri,
        method: 'POST',
        body: `price=${totalPrice}&goodsName=${goodsName}&moid=${moid}`,
      }}
    />
  );
}

export default StorePaymentWebViewScreen;
