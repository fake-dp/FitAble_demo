import React,{useState, useEffect} from 'react';
import { WebView } from 'react-native-webview';
import { View, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
function PaymentWebViewScreen(props) {

  const { paymentInfoData} = props.route.params;
  console.log('라우터전달', paymentInfoData);


  // const url = `https://reactpaytest-app.vercel.app/paytest/${orderId}`;
  //  const url = `https://reactpaytest-app.vercel.app/payment?orderId=${orderId}&amount=${amount}&goodsName=${goodsName}`;
  
  // test id url
  const url = `https://reactpaytest-app.vercel.app/payment`;
  // const url = `https://reactpaytest-app.vercel.app/paymentlink/ae9a7bf0-1a6e-49eb-b388-43b4cc9f63cc`;
  // const url = `https://reactpaytest-app.vercel.app/paytest/3`;
  

   return (
    <View style={{ flex: 1 }}>
            {/* <WebView/> */}
    </View>
  );
}

export default PaymentWebViewScreen;
