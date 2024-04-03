import {PermissionsAndroid, Vibration, Alert,Linking,TextInput} from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState,useRef } from 'react';
import { getHomeQrBanners } from '../../../api/homeApi';
import {getQrTicketCheckInList} from '../../../api/qrApi';
import { Camera, CameraType } from "react-native-camera-kit";
import { Platform } from 'react-native';
import QrCheckModal from '../../ui/modal/QrCheckModal';
import QrCancelModal from '../../ui/modal/QrCancelModal';
import QrDoneModal from '../../ui/modal/QrDoneModal';
import {qrTicketListState,qrFailTextState,mainCenterIdState} from '../../../store/atom';
import { useRecoilState } from 'recoil';
import FastImage from 'react-native-fast-image'


function ScanTemplate(props) {

    const [centerId, setCenterId] = useRecoilState(mainCenterIdState);

    const navigation = useNavigation();
    const [qrBanners, setQrBanners] = useState([]);
    const [showQrModal, setShowQrModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showQrDoneModal, setShowQrDoneModal] = useState(false);
    const [qrCenterId, setQrCenterId] = useState(null);
    const [qrTicketList, setQrTicketList] = useState([]);

    const [myTicketInfo, setMyTicketInfo] = useRecoilState(qrTicketListState);
    const [failText , setFailText] = useRecoilState(qrFailTextState);


    const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);

    useEffect(() => {
        if (Platform.OS === 'android'){
            requestCameraPermission();
        }
    }, []);



    const openAppSettings = () => {
    if(Platform.OS === 'android'){
      Linking.openSettings().catch(() => {
        Alert.alert("오류", "설정 화면을 여는 데 실패했습니다.");
        navigation.navigate('HomeMain');
      });
    }else{
        navigation.navigate('HomeMain');
    }
}
    
    const requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        console.log('grantednever_ask_again',granted,PermissionsAndroid.RESULTS.DENIED,PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN)
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setCameraPermissionGranted(true);
        } else if (granted === PermissionsAndroid.RESULTS.DENIED||PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          Alert.alert("권한 거부", "카메라 권한이 없어 QR 코드를 스캔할 수 없습니다.",
              [{ text: '확인', onPress: () => 
              {
                  openAppSettings()
                  navigation.navigate('HomeMain');
            }
            }]);
        } 
      } catch (err) {
        console.warn(err);
      }
    };
    // useEffect(() => {
    
    //       if (Platform.OS !== "ios" && Platform.OS !== "android") return;
    //       const platformPermissions =
    //         Platform.OS === "ios"
    //           ? PERMISSIONS.IOS.CAMERA
    //           : PERMISSIONS.ANDROID.CAMERA;
    //       const requestCameraPermission = async () => {
    //         try {
    //           const result = await request(platformPermissions);
    //           result === RESULTS.GRANTED
    //             ? setCameraPermissionGranted(true)
    //             : Alert.alert("카메라 권한을 허용해주세요",

    //             );
    //         } catch (err) {
    //           Alert.alert("Camera permission err");
    //           console.warn(err);
    //         }
    //       };
    //       requestCameraPermission();
        
    //   }, []);
    

        const [scaned, setScaned] = useState(true);
        const ref = useRef(null);
        console.log('centerId',centerId)
        useEffect(() => {
          // 종료후 재시작을 했을때 초기화
          setScaned(true);
        }, []);

        useEffect(() => {
            if (showQrModal || showCancelModal || showQrDoneModal) {
                // 모달이 하나라도 열려 있으면 스캔을 멈춤
                setScaned(false);
            } else {
                // 모든 모달이 닫혔으면 스캔을 재개
                setTimeout(() => {
                    setScaned(true);
                }, 3000); // 재개 전에 약간의 지연을 주는 것이 좋을 수 있습니다.
            }
        }, [showQrModal, showCancelModal, showQrDoneModal]);
       
        const onBarCodeRead = async(event) => {
            if (!scaned) return;
            setScaned(false);
            Vibration.vibrate();
            const qrToken = event.nativeEvent.codeStringValue;
            // console.log('qrToken',qrToken)
            console.log('centerIdcenterIdcenterId',centerId)
            try{
                const response = await getQrTicketCheckInList(qrToken);
                // console.log('qrponse',response.tickets.length)

                // 이상한 센터 들 갔을 때
                // if(response.id !== centerId){
                //     console.log('qrponse',response)
                //     Alert.alert('입장 불가', '이용할 센터의 QR 코드를 찍어주세요.', [{ text: '확인', onPress: () =>console.log('end') }]);

                if(response.tickets.length === 0){
                    console.log('qrponse',response)
                    Alert.alert('입장 불가', '이용 가능한 이용권이 없습니다.', [{ text: '확인', onPress: () =>console.log('end') }]);

                }else if(response.tickets.length > 0){
                    console.log('qrponse',response)
                    setQrCenterId(response.id);
                    setQrTicketList(response.tickets);
                    setShowQrModal(true);
                    // navigation.navigate('HomeMain')
                }else{
                    Alert.alert('입장 실패', '입장에 실패하였습니다. \n다시 시도해주세요', [{ text: '확인', onPress: () => navigation.navigate('HomeMain') }]);
                }
            }catch(error){
                console.log('Error getting:', error.response.data);
                if(error.response.data.status === 404){
                    Alert.alert('인식 불가', '이용할 센터의 QR 코드를 찍어주세요', [{ text: '확인', onPress: () => navigation.navigate('HomeMain') }]);
                } else if(error){
                    console.log('error',error.response.data)
                    Alert.alert('인식 불가', '이용할 센터의 QR 코드를 찍어주세요', [{ text: '확인', onPress: () => navigation.navigate('HomeMain') }]);
                }
            } finally {
                setTimeout(() => {
                    setScaned(true); 
                }, 3000);
            }
       
            
            // Alert.alert("QR Code", event.nativeEvent.codeStringValue, [
            //   { text: "OK", onPress: () => setScaned(true) },
            // ]);
          };
      

    const getUseHomeQrBanners = async () => {
        try {
            const response = await getHomeQrBanners();
            setQrBanners([response]);
        } catch (error) {
            console.error('Error getting home banners:', error.response.config.headers)
        }
    };

    useEffect(() => {
        getUseHomeQrBanners();
    }, []);


    const handleBannerPress = (banner) => {
        console.log('Banner Pressed',banner.id);
        switch (banner.pathType) {
          case 'LINK':
            navigation.navigate('BannerWebView', { uri: banner.path });
            console.log('Banner Pressed',banner.path);
            break;
          case 'STORE':
            navigation.navigate('Store');
            break;
          case 'NOTICE_DETAIL':
            navigation.navigate('DetailNotice', { item: banner.path });
            console.log('Banner Pressed',banner.path);
            break;
          case 'STORE_DETAIL':
            // navigation.navigate('Store', { storeId: banner.path });
            navigation.navigate('Store', { storeId: banner.path });
            break;

          default:
            break;
        }
      };

      const closeIcon = require('../../../assets/img/whiteClose.png');
    //   console.log('showQrDoneModal!',showQrDoneModal,showCancelModal)



    return (
        <>
        <Container>
            <GobackContainer onPress={() => navigation.goBack()}>
          
            <FastImage 
            style={{width: 28, height: 28}}
            source={closeIcon}/>
            </GobackContainer>
            <QrContainer>

            <MainContainer>
            <TitleText>입장하기</TitleText>
            <SubText>입장을 위해 QR코드를 인식해주세요</SubText>

            {/* <Rectangular /> */}
        {
            Platform.OS === 'ios' ? (
            <Rectangular>
                {
                    (
                    !showQrModal && !showCancelModal && !showQrDoneModal &&
                    <Camera
                    ref={ref}
                    cameraType={CameraType.Back} // Front/Back(default)
                    zoomMode
                    // focusMode
                    style={{ width: '100%', height: '100%' }} 
                    // Barcode Scanner Props
                    scanBarcode
                    showFrame={false}
                    laserColor="rgba(0, 0, 0, 0)"
                    frameColor="rgba(0, 0, 0, 0)"
                    surfaceColor="rgba(0, 0, 0, 0)"
                    onReadCode={onBarCodeRead}/>
                    )
                }
                 </Rectangular>
                ):(
                    <Rectangular>
                        {
                            (
                    !showQrModal && !showCancelModal && !showQrDoneModal && cameraPermissionGranted &&
                    <Camera
                        ref={ref}
                        cameraType={CameraType.Back} // Front/Back(default)
                        //  focusMode
                        style={{ width: '100%', height: '100%' }} 
                        // Barcode Scanner Props
                        scanBarcode
                        showFrame={false}
                        laserColor="rgba(0, 0, 0, 0)"
                        frameColor="rgba(0, 0, 0, 0)"
                        surfaceColor="rgba(0, 0, 0, 0)"
                        onReadCode={onBarCodeRead}/>
                        )
                    }
                  </Rectangular>
                )
            }
            <SubText>휴대폰을 흔들면 QR코드를 촬영할 수 있어요!</SubText>
            </MainContainer>
            {
                qrBanners.map((banner) => (
                    <ImgContainer key={banner.id} onPress={() => handleBannerPress(banner)}>
                        <BannerImage source={{ uri: banner.imageUrl }} resizeMode="cover" />
                        </ImgContainer>
                ))
            }
            </QrContainer>
        </Container>
        {
            showQrModal && (<QrCheckModal 
                qrTicketList={qrTicketList}
                qrCenterId={qrCenterId}
                setShowQrModal={setShowQrModal}
                setShowQrDoneModal={setShowQrDoneModal}
                setShowCancelModal={setShowCancelModal}
            />)
        }
        {
            showCancelModal && (<QrCancelModal failText={failText}/>)
        }
          {
            showQrDoneModal && (
                <QrDoneModal myTicketInfo={myTicketInfo}/>
            )
        }
        </>
    );
}

export default ScanTemplate;


const Container = styled.View`
    flex: 1;
    background-color: ${COLORS.sub};
`;

const GobackContainer = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-right: 20px;
`

const QrContainer = styled.View`
    flex: 1;
    background-color: ${COLORS.sub};
    align-items: center;
    justify-content: center;
`

const MainContainer = styled.View`
   margin-bottom: 120px;
    align-items: center;
    justify-content: center;
`

const ImgContainer = styled.TouchableOpacity`
    position: absolute;
    bottom: 0;
    width: 100%;
    /* height: 200px; */
`

const Rectangular = styled.View`
    width: 200px;
    height: 200px;
    border: 1px solid ${COLORS.white};
    margin-bottom: 26px;
`

const TitleText  = styled.Text`
    font-size: 20px;
font-weight: 700;
line-height: 30px;
color: ${COLORS.white};
`

const SubText = styled.Text`
font-size: 14px;
font-weight: 400;
line-height: 22.40px;
color: ${COLORS.gray_100};
margin-bottom: 26px;
`

const BannerImage = styled(FastImage)`
    width: 100%;
    height: 140px;
`;
