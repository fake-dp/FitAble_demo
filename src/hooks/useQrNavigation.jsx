import React, { useEffect, useState } from 'react';
import { accelerometer } from 'react-native-sensors';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { QRState } from '../store/atom';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useQrNavigation = () => {
    const navigation = useNavigation();
    const [qr, setQr] = useRecoilState(QRState);
    const [subscription, setSubscription] = useState(null);


    useEffect(() => {
        const loadQrStatus = async () => {
          try {
            const value = await AsyncStorage.getItem('qr');
            if (value !== null) {
              // AsyncStorage에서 가져온 값을 Boolean으로 변환하여 상태로 설정
              setQr(value === 'true');
            }
          } catch (error) {
            console.error("Error loading qr status:", error);
          }
        };
      
        loadQrStatus();
      }, []);

    useEffect(() => {
        if (qr) {
            if (!subscription) {
                const newSubscription = accelerometer.subscribe(({ x, y, z, timestamp }) => {
                    const totalAcceleration = Math.sqrt(x * x + y * y + z * z);
                    if (totalAcceleration > 3) { 
                        console.log('Device shaken');
                        navigation.navigate('Scan');
                    }
                });

                setSubscription(newSubscription);
            }
        } else {
            if (subscription) {
                subscription.unsubscribe();
                setSubscription(null);
            }
        }

        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, [qr, navigation]);

};

export default useQrNavigation;
