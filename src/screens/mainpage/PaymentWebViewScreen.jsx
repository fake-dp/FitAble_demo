import React from 'react';
import { WebView } from 'react-native-webview';
import { View, TouchableOpacity, Text } from 'react-native';

function PaymentWebViewScreen(props) {


  const { orderId, amount, goodsName } = props.route.params;
  console.log('라우터전달', orderId, amount, goodsName);


   const url = `https://reactpaytest-app.vercel.app/payment?orderId=${orderId}&amount=${amount}&goodsName=${goodsName}`;
  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ url }} />
    </View>
  );
}

export default PaymentWebViewScreen;
