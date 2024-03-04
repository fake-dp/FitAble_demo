import React, { useState ,useEffect} from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import ToggleBtn from '../../ui/toggle/ToggleBtn';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
import WithdrawalModal from '../../ui/modal/WithdrawalModal';
import {putStoreMarketing,putPushAlarm,putPushMarketing} from '../../../api/pushApi';
import { useRecoilState } from 'recoil';
import { myinfoState, fcmTokenState,isLoginState, QRState } from '../../../store/atom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image'

function MyAppSettingTemplate(props) {
  
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false);
    const [myInfo, setMyInfo] = useRecoilState(myinfoState);
    const [fcmToken, setFcmToken] = useRecoilState(fcmTokenState);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
    const [qr, setQR] = useRecoilState(QRState);
 



    
    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }
    const goBackScreens = () => {
        navigation.goBack();
    };


    const goTermsScreens = () => {
        navigation.navigate('Terms');
    };

    const handleTogglePushAlarm = async () => {
        try {
            const updatedValue = !myInfo.pushAlarm;
            const fcmTokenToSend = updatedValue ? fcmToken : null;
            console.log('updatedValuefcmTokenToSend',updatedValue,fcmTokenToSend)
            const response = await putPushAlarm({ isOn: updatedValue, fcmToken: fcmTokenToSend });  // FCM 토큰 값 설정 필요
            // 성공적으로 업데이트 된 경우 Recoil 상태 업데이트
            console.log('응답v푸시',response)
            setMyInfo(prev => ({ ...prev, pushAlarm: updatedValue }));
        } catch (error) {
            console.error("Error updating push alarm status:", error);
        }
    };

    const handleTogglePushMarketing = async () => {
        try {
            const updatedValue = !myInfo.marketing;
            const response = await putPushMarketing(updatedValue);
            // 성공적으로 업데이트 된 경우 Recoil 상태 업데이트
            console.log('마케팅알림',response)
            setMyInfo(prev => ({ ...prev, marketing: updatedValue }));
        } catch (error) {
            console.error("Error updating push marketing status:", error);
        }
    };

    const handleToggleStoreMarketing = async () => {
        try {
            const updatedValue = !myInfo.storeMarketing;
            const response = await putStoreMarketing(updatedValue);
            console.log('스토어ㅋ마케팅',response)
            // 성공적으로 업데이트 된 경우 Recoil 상태 업데이트
            setMyInfo(prev => ({ ...prev, storeMarketing: updatedValue }));
        } catch (error) {
            console.error("Error updating store marketing status:", error);
        }
    };
    

    const handleLogout = async () => {
        try {
          // AsyncStorage에서 토큰 삭제
          await AsyncStorage.removeItem("accessToken");
          await AsyncStorage.removeItem("refreshToken");
          // fcmtoken 삭제
            await AsyncStorage.removeItem("fcmToken");
            setFcmToken(null);
          // 다른 로그아웃 관련 로직 추가 가능
      
          // 사용자 로그인 상태를 false로 업데이트
          setIsLoggedIn(false);
        } catch (error) {
          console.error('Error during logout:', error);
        }
      };

    const rightIcon = require('../../../assets/img/rightIcon.png');

    const {pushAlarm, storeMarketing,marketing} = myInfo
    console.log('myInfo',myInfo)
    // console.log('myInfomyInfo',pushAlarm,marketing,storeMarketing,fcmToken)

  return (
    <Container>
        <GobackBlackGrid onPress={goBackScreens}>앱 설정</GobackBlackGrid>
        <AppSettingContainer>

                <SettingList>
                    <SettingTextContainer>
                    <SettingListText>PUSH 알림</SettingListText>
                    <SettingSubListText>공지사항, 출석, 결제 알림</SettingSubListText>
                    </SettingTextContainer>
                    <ToggleBtn isActive={myInfo.pushAlarm} toggleActive={handleTogglePushAlarm} />
                </SettingList>
                <SettingList>
                    <SettingTextContainer>
                    <SettingListText>센터 마케팅 알림</SettingListText>
                    <SettingSubListText>센터 이벤트,쿠폰 지급, 할인 소식</SettingSubListText>
                    </SettingTextContainer>
                    <ToggleBtn isActive={myInfo.marketing} toggleActive={handleTogglePushMarketing} />
                </SettingList>
                <SettingList>
                    <SettingTextContainer>
                    <SettingListText>스토어 마케팅 알람</SettingListText>
                    <SettingSubListText>핏에이블 스토어 이벤트, 할인 소식</SettingSubListText>
                    </SettingTextContainer>
                    <ToggleBtn isActive={myInfo.storeMarketing} toggleActive={handleToggleStoreMarketing} />
                </SettingList>
                <SettingList>
                     <SettingListText>QR 출입증</SettingListText>
                     <ToggleBtn isActive={qr} toggleActive={() => setQR(!qr)} />
                </SettingList>


                <GridLine/>
                <SettingListBtn onPress={goTermsScreens}>
                    <SettingListText>이용약관 및 정책</SettingListText>
                    <SettingListRightIcon source={rightIcon}/>
                </SettingListBtn>
                <GridLine/>
                
                <GoodByeBtn
                onPress={openModal}
                >
                    <GoodByeText>
                        회원 탈퇴(임시로그아웃)
                    </GoodByeText>
                </GoodByeBtn>
                {
                    showModal && (
                        <WithdrawalModal 
                        handleLogout={handleLogout}
                        closeModal={closeModal}
                        />
                    )
                }
        </AppSettingContainer>
    </Container>
  );
}

export default MyAppSettingTemplate;

const Container = styled.View`
  flex: 1;
  padding: 0 20px;
  background-color: ${COLORS.white};
`;


const SettingList = styled.View`
    flex-direction: row;
    justify-content: space-between;
    /* align-items: center; */
    padding: 15px 0;
    margin-bottom: 14px;
`

const SettingTextContainer = styled.View`

`

const SettingListBtn = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
    
const SettingListText = styled.Text`
font-size: 16px;
color: ${COLORS.sub};
font-weight: 500;
line-height: 22.40px;
`
const SettingSubListText = styled.Text`
color: ${COLORS.gray_400};
font-size: 12px;
font-weight: 400;
`

const SettingListRightIcon = styled(FastImage)`
    width: 20px;
    height: 20px;
`

const AppSettingContainer = styled.View`
    margin-top: 42px;
`

const GoodByeBtn = styled.TouchableOpacity`
 
`

const GoodByeText = styled.Text`
   font-size: 14px;
font-weight: 400;
text-decoration: underline;
line-height: 22.40px;
color: ${COLORS.gray_400};
`

const GridLine = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${COLORS.gray_200};
    margin-bottom: 30px;
    margin-top: 30px;
`