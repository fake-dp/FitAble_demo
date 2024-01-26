import React,{ useRef} from 'react';
import { WebView } from 'react-native-webview';
import { View } from 'react-native';

function PaymentWebViewScreen(props) {

  const { paymentInfoData, totalPrice, goodsName} = props.route.params;

  console.log('라우터전달',totalPrice, goodsName);


 const webviewRef = useRef(null);

 /** webview 로딩 완료시 */
 const handleEndLoading = () => {
  console.log("handleEndLoading");
  /** rn에서 웹뷰로 정보를 보내는 메소드 */
  webviewRef.current.postMessage(JSON.stringify({ paymentInfoData }));
};
  // test배포용
  const uri = `https://reactpaytest-app.vercel.app/payment?totalPrice=${totalPrice}&goodsName=${goodsName}`;
  // 배포용
  // const uri =`http://175.45.204.94/payment/Payment?totalPrice=${totalPrice}&goodsName=${goodsName}`

  const onNavigationStateChange = (navState) => {
    // navState 객체에는 url, title, loading 등의 정보가 포함되어 있음
    console.log('웹뷰 내비게이션 상태 변경:', navState);

    // 특정 URL로 리디렉션되었는지 확인하고 필요한 작업 수행
    // if (navState.url === 'https://acs.hanacard.co.kr/payapp/C000000000VPQC.web?authToke=') {
    //   console.log('log확인용')
    // }
  };

   return (
    <View style={{ flex: 1 }}>
            <WebView
                onNavigationStateChange={onNavigationStateChange}
                // onLoadProgress={onLoadProgress}
              onLoadEnd={handleEndLoading}
              ref={webviewRef}
              source={{ uri }}
            />
    </View>
  );
}

export default PaymentWebViewScreen;
