import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { QRState } from '../store/atom';
import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import { Subscription } from 'rxjs';

const useQrAndroidNavigation=()=> {
    const navigation = useNavigation();
    const [qr] = useRecoilState(QRState);
    const [lastShake, setLastShake] = useState(Date.now());

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
};

export default useQrAndroidNavigation;
