import React, { useEffect, useState } from 'react';
import { accelerometer } from 'react-native-sensors';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { QRState } from '../store/atom';
import { debounce } from 'lodash'; // lodash의 debounce 함수를 사용합니다.

const useQrAndroidNavigation = () => {
    const navigation = useNavigation();
    const [qr] = useRecoilState(QRState); // setQR 사용하지 않으므로 제거
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        // 디바운스된 흔들림 감지 함수를 정의합니다.
        const handleShake = debounce(({ x, y, z }) => {
            const totalAcceleration = Math.sqrt(x * x + y * y + z * z);
            if (totalAcceleration > 3) { // 임계값 조건
                console.log('Device shaken hard');
                if (qr) { // QR 상태 확인
                    navigation.navigate('Scan');
                }
            }
        }, 500, { leading: true, trailing: false }); // 디바운스 설정

        // QR 상태가 true일 때만 센서를 구독합니다.
        if (qr && !subscription) {
            const newSubscription = accelerometer.subscribe(handleShake);
            setSubscription(newSubscription);
        } else if (!qr && subscription) {
            // QR 상태가 false이거나 구독을 해제해야 할 때
            subscription.unsubscribe();
            setSubscription(null);
        }

        // 컴포넌트가 언마운트될 때 센서 구독을 해제합니다.
        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, [qr, navigation]); // 의존성 배열에 qr 추가

    return null; // 이 훅은 UI를 렌더링하지 않습니다.
};

export default useQrAndroidNavigation;
