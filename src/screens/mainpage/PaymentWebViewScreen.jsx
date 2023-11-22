import React from 'react';
import { WebView } from 'react-native-webview';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function PaymentWebViewScreen() {
  const navigation = useNavigation();
  const url = `https://reactpaytest-app.vercel.app/1`;
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{ padding: 10, backgroundColor: 'lightgray' }}
        onPress={() => navigation.goBack()}
      >
        <Text>Go Back</Text>
      </TouchableOpacity>
      <WebView source={{ url }} />
    </View>
  );
}

export default PaymentWebViewScreen;
