import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { QRState } from '../store/atom';
import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import { Subscription } from 'rxjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useQrAndroidNavigation = () => {
    const navigation = useNavigation();
    const [qr, setQr] = useRecoilState(QRState); // QRState를 사용하여 QR 상태를 가져오고 설정
    const [lastShake, setLastShake] = useState(Date.now());

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
        setUpdateIntervalForType(SensorTypes.accelerometer, 100);

        let subscription;
        if (qr) {
            subscription = accelerometer.subscribe(({ x, y, z }) => {
                const current = Date.now();
                const max = Math.max(x, y, z);
                if (max > 12 && current - lastShake > 1000) {
                    setLastShake(current);
                    navigation.navigate('Scan');
                }
            }, error => {
                console.log("The sensor is not available");
            });
        }

        return () => {
            if (subscription instanceof Subscription) {
                subscription.unsubscribe();
            }
        };
    }, [qr, navigation, lastShake]);

    return null; // 사용자 정의 Hook에서는 일반적으로 렌더링할 컴포넌트가 없으므로 null을 반환
};

export default useQrAndroidNavigation;
