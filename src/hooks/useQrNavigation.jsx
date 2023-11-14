import { useEffect } from 'react';
import { Platform } from 'react-native';
import { accelerometer } from 'react-native-sensors';
// if (Platform.OS === 'ios') {
//   // 안드로이드에서는 'react-native-camera-kit'를 사용하지 않음
//   accelerometer = require('react-native-sensors').accelerometer;
// } 
const THRESHOLD = 1.5;
// console.log('accelerometer',accelerometer)
const useQrNavigation = (navigation) => {
  useEffect(() => {
    const subscription = accelerometer.subscribe(({ x, y, z }) => {
      if (Math.abs(x) > THRESHOLD || Math.abs(y) > THRESHOLD || Math.abs(z) > THRESHOLD) {
        navigation.navigate('Scan');
      }
    });

    // 구독 해제
    return () => subscription.unsubscribe();
  }, [navigation]); 


};

export default useQrNavigation;
