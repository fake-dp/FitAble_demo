import React from 'react';
import CustomCalendar from '../../ui/custom/CustomCalendar';
import { styled, css } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { useState, useCallback } from 'react';
import {useFocusEffect} from '@react-navigation/native';
import { getMyInfo } from '../../../api/mypageApi';
import { useRecoilState } from 'recoil';
import { myinfoState,selectTodayState } from '../../../store/atom';
import {postReservations, cancelReservation} from '../../../api/lessonsApi';
import { Alert } from 'react-native';
import {getAvailableLessons} from '../../../api/lessonsApi';
import BookNWaitingCancelModal from '../../ui/modal/BookNWaitingCancelModal';
import { useNavigation } from '@react-navigation/native';
import SelectPicker from '../../ui/custom/SelectPicker';
import FastImage from 'react-native-fast-image'
function MainCalenderTemplate({centerName}) {
    
    const navigation = useNavigation();

    const [selectedToday, setSelectedToday] = useRecoilState(selectTodayState);
    const [classList, setClassList] = useState([]); 
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); 

    const [myInfo, setMyInfo] = useRecoilState(myinfoState);
    const [shouldFetch, setShouldFetch] = useState(true);
    const getMyInfoData = async () => {
        if (shouldFetch) {
            const response = await getMyInfo();
            setMyInfo(response);
            setShouldFetch(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getMyInfoData();
        },[]));


    const handleCanceBtn = async(id,status) => {
        console.log('취소클릭',id)
        try{
            const response = await cancelReservation(id);
            if(response){
                getAvailableLessons(myInfo.mainCenterId, selectedToday).then(data => {
                    setClassList(data.content)
                    setShowModal(false);
                }
                ).catch(error => {
                    console.error("Error fetching lesson list", error.response);
                });
            }
        }catch(error){
            if(error.response.data.code === 20903){
                Alert.alert("알림","예약 가능한 인원이 없습니다.",[
                    {text: '확인', onPress: () => 
                    setShowModal(false)
                }
                    ]);
            }else if(error.response.data.code === 20606){
                Alert.alert("취소 불가","취소할 수 있는 시간이 지났습니다",[
                    {text: '확인', onPress: () => 
                    setShowModal(false)
                }
                    ]);
            }
            // console.error('Error getting:@@', error.response.data);
        }
    }
   
    const handleReserveAndWaitingBtn = async(id,status) => {
        // console.log('예약대기클릭',id,status)
        try{
            const response = await postReservations(id);
            console.log('response',response)
            if(response && status === "AVAILABLE"){
                getAvailableLessons(myInfo.mainCenterId, selectedToday).then(data => {
                    setClassList(data.content)
                }
                ).catch(error => {
                    console.error("Error fetching lesson list", error.response);
                });

                Alert.alert("예약 완료","수업이 예약되었습니다",['확인']);
            }else if(response && status === "WAITING_AVAILABLE"){
                getAvailableLessons(myInfo.mainCenterId, selectedToday).then(data => {
                    // console.log('ddd응답',data.content)
                    setClassList(data.content)
                }
                ).catch(error => {
                    console.error("Error fetching lesson list", error.response);
                });
                Alert.alert("대기 완료",`대기번호 ${response.waitingNumber}번\n예약이 완료되면 알림이 울립니다`,['확인']);
            }
        }catch(error){
            if(error.response.data.code === 20904){
                Alert.alert("예약 불가",`예약이 어렵습니다. 다시 시도해주세요.`,['확인']);
            }else if(error.response.data.code === 20905){
                Alert.alert("예약 불가",`예약 가능 횟수를 초과했습니다`,['확인']);
            }else if(error.response.data.code === 20907){
                Alert.alert("예약 불가",`수업 가능 인원을 초과했습니다`,['확인']);
            }else if(error.response.data.code === 20908){
                Alert.alert("예약 불가",`대기 가능 인원을 초과했습니다`,['확인']);
            }
            console.error('Error getting!!:', error.response.data.code);
        }
    }


    const handleBtn = (status, id, item) => {
        console.log('클릭',status, id,item)
        if(status === "WAITING_AVAILABLE" || status === "AVAILABLE"){
            handleReserveAndWaitingBtn(id,status)
        }else if(status === "RESERVED" || status === "WAITING"){
            // handleCanceBtn(id,status)
            setSelectedItem(item);
            setShowModal(true);
    }
}

    const handleReload = () => {
        // console.log('리로드하였습니다.!')
        getAvailableLessons(mainCenterId, selectedToday).then(data => {
            setClassList(data.content)
        }
        ).catch(error => {
            console.error("Error fetching lesson list", error.response);
        });
    }


    const closeModal = () => {
        setShowModal(false);
        setSelectedItem(null);
    }

    const searchCenterScreen = () => {
        navigation.navigate('ExSearchCenter');
    };
    const {mainCenter, mainCenterId} = myInfo
    console.log('classList',classList,mainCenterId)
    const downIcon = require('../../../assets/img/whitedownex.png');

    return (
        <Container>
            {
                mainCenter && mainCenterId ? (
                <TitleContainer>
                    {/* <TitleText>{mainCenter}</TitleText>
                    <DownIcon source={downIcon}/> */}
                <SelectPicker 
                mainCenter={mainCenter}
                centerName={centerName}
                mainCenterId={mainCenterId}
                setMyInfo={setMyInfo}
                />
              </TitleContainer>
                ):(
                <NoMainTitleContainer onPress={searchCenterScreen}>
                    <TitleText>이용하실 센터를 선택해주세요</TitleText>
                    <DownIcon 
                    resizeMode={FastImage.resizeMode.contain}
                    source={downIcon}/>
              </NoMainTitleContainer>
                )
            }
            

       <CustomCalendar 
       classList={classList}
       setClassList={setClassList}
       mainCenterId={mainCenterId}
       mainCenter={mainCenter}
       handleReload={handleReload}
       handleCanceBtn={handleCanceBtn}
       handleBtn={handleBtn}
       closeModal={closeModal}
       showModal={showModal}
       selectedItem={selectedItem}
       />
     
       
        </Container>
    );
}

export default MainCalenderTemplate;


const Container = styled.View`
    flex:1;
    background-color: ${COLORS.sub};
    /* padding: 0 20px; */
`
const TitleContainer = styled.TouchableOpacity`
    padding: 0 20px;
    margin-bottom: 42px;
    flex-direction: row;
    align-items: center;
`

const NoMainTitleContainer = styled.TouchableOpacity`
    padding: 0 20px;
    margin-bottom: 42px;
    flex-direction: row;
    align-items: center;
`
const TitleText = styled.Text`
color: ${COLORS.white};
font-size: 20px;
font-weight: 600;
line-height: 28px;
`
const DownIcon = styled(FastImage)`
margin-left: 8px;
width: 20px;
height: 20px;
`

const CalenderLine = styled.View`
border-top-width: 1px;
border-color: #535258;
margin-top: 30px;
padding: 0 20px;
`
