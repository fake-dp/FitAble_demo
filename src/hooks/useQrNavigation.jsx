import React, { useEffect, useState } from 'react';
import { accelerometer } from 'react-native-sensors';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { QRState } from '../store/atom';

const useQrNavigation = () => {
    const navigation = useNavigation();
    const [qr, setQR] = useRecoilState(QRState);
    const [subscription, setSubscription] = useState(null);

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
