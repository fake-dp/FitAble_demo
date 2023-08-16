import React from 'react';
import { WebView } from 'react-native-webview';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function WebViewScreen({ route }) {
  const { uri } = route.params;
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{ padding: 10, backgroundColor: 'lightgray' }}
        onPress={() => navigation.goBack()}
      >
        <Text>Go Back</Text>
      </TouchableOpacity>
      <WebView source={{ uri }} />
    </View>
  );
}

export default WebViewScreen;
