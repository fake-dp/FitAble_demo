import React from 'react';
import CustomCalendar from '../../ui/custom/CustomCalendar';
import { styled, css } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { ScrollView ,Image} from 'react-native';
import { useState, useEffect,useCallback } from 'react';
import { getMyInfo } from '../../../api/mypageApi';
import { useRecoilState } from 'recoil';
import { myinfoState,selectTodayState } from '../../../store/atom';
import {postReservations, cancelReservation} from '../../../api/lessonsApi';
import { Alert } from 'react-native';
import {getAvailableLessons} from '../../../api/lessonsApi';
import BookNWaitingCancelModal from '../../ui/modal/BookNWaitingCancelModal';
import { useNavigation } from '@react-navigation/native';

function MainCalenderTemplate(props) {
    
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

    useEffect(() => {
        getMyInfoData();
    },[])

    const handleCanceBtn = async(id,status) => {
        // console.log('취소클릭',id)
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
    const reroad = require('../../../assets/img/reroad.png');
    const userIcon = require('../../../assets/img/userIcon.png');

    return (
        <Container>
            {
                mainCenter && mainCenterId ? (
                <TitleContainer>
                    <TitleText>{mainCenter}</TitleText>
                    <DownIcon source={downIcon}/>
              </TitleContainer>
                ):(
                <NoMainTitleContainer onPress={searchCenterScreen}>
                    <TitleText>이용하실 센터를 선택해주세요</TitleText>
                    <DownIcon source={downIcon}/>
              </NoMainTitleContainer>
                )
            }
            

       <CustomCalendar 
       classList={classList}
       setClassList={setClassList}
       mainCenterId={mainCenterId}
   
       />
       <CalenderLine/>
       {
            mainCenter && mainCenterId && (
            <ReroadContainer>
                <ReroadBtn onPress={handleReload}>
                    <ReroadIcon source={reroad}/>
                    <ReroadText>새로고침</ReroadText>
                </ReroadBtn>
            </ReroadContainer>
            )
       }
        <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
        >
            {
                mainCenter && mainCenterId && classList.length === 0 ? (
                    
                        <NoListContainer>
                            <NoListText>등록된 수업이 없습니다</NoListText>
                        </NoListContainer>
                   
                ) : null
            }
        {
           classList && classList.map((item, index) => (
                
                <CenterListContainer key={index} isLastItem={index === classList.length - 1}>
                    <CenterList>
                        <CenterListText>{item.name}</CenterListText>
                        <CenterListDate
                        status={item.status}
                        >{item.startTime} ~ {item.endTime}</CenterListDate>
                        <CenterListText>{item.trainers.join(', ')} 강사 | {item.location}</CenterListText>

                        <CenterRecruitContainer>
                        <Image source={userIcon}/>
                        <CenterRecruitmentText>{item.reservationMembers.current} / {item.reservationMembers.max}</CenterRecruitmentText>
                        {
                            item.status === "WAITING" ? (
                                <CenterRecruitmentText>대기 {item.waitingNumber}번</CenterRecruitmentText>
                            ):(
                                null
                            )
                        }
                        </CenterRecruitContainer>
                    </CenterList>

                        {
                            item.status === "NOT_AVAILABLE" ? 
                            (null):(
                                <CenterListRight>
                                <CenterListBtn onPress={item.status !== "END" ? () => handleBtn(item.status,item.id, item) : null}>
                                    <CenterListRightTopText
                                    status={item.status}>
                                        {/* {item.status} */}
                                    {item.status === "AVAILABLE"? '예약' : item.status ==="WAITING_AVAILABLE"? '대기' : item.status ==="END"? '종료' : item.status === "RESERVED" || item.status === "WAITING" ? '취소':''}
                                    </CenterListRightTopText>
                                </CenterListBtn>
                            </CenterListRight>
                            )
                        }
                  
                    {
                showModal && (
                    <BookNWaitingCancelModal 
                        closeModal={closeModal}
                        text={selectedItem.status === "RESERVED" ? "예약" : selectedItem.status === "WAITING" ? "대기" : ""}
                        onPress={()=>handleCanceBtn(selectedItem.id, selectedItem.status)}
                    />
                     )
                 }
                </CenterListContainer>
            ))
        }
        </ScrollView>
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
const DownIcon = styled.Image`
margin-left: 8px;
`

const CalenderLine = styled.View`
border-top-width: 1px;
border-color: #535258;
margin-top: 30px;
padding: 0 20px;
`

const ReroadContainer = styled.View`
margin-top: 28px;
/* border-top-width: 1px;
border-color: #535258; */
padding: 0 20px;
background-color: ${COLORS.sub};
`
const ReroadBtn = styled.TouchableOpacity`
flex-direction: row;
align-items: center;
justify-content: flex-end;
`
const ReroadIcon = styled.Image`
width: 15px;
height: 15px;
margin-right: 8px;
`
const ReroadText = styled.Text`
font-size: 14px;
color: ${COLORS.white};
font-weight: 500;
line-height: 22.40px;
`
    
const CenterListContainer = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 20px 20px;
border-bottom-width: ${(props) => (props.isLastItem ? '0px' : '1px')};
border-color: #535258;
background-color: ${COLORS.sub};

`

const CenterList = styled.View`
flex: 1;

`

const CenterListText = styled.Text`
font-size: 16px;
color: ${COLORS.gray_300};
font-weight: 400;
line-height: 22.40px;
margin-bottom: 4px;
`

const NoListContainer = styled.View`
justify-content: center;
align-items: center;
flex:1;
margin-top: 50px;
background-color: ${COLORS.sub};
`

const NoListText = styled.Text`
font-size: 16px;
color: ${COLORS.gray_300};
font-weight: 500;
line-height: 22.40px;
background-color: ${COLORS.sub};
`

const CenterListDate = styled.Text`
font-size: 20px;
color: ${COLORS.gray_300};
font-weight: 600;
line-height: 28px;
    ${(props) => 
    props.status === "RESERVED"&& css`
      color: ${COLORS.main}; /* 취소일 때의 글자 색 */
    `}
    ${(props) => 
    props.status === "WAITING" && css`
      color: ${COLORS.main}; /* 취소일 때의 글자 색 */
    `}
`

const CenterRecruitmentText = styled.Text`
font-size: 14px;
color: ${COLORS.gray_300};
font-weight: 500;
line-height: 22.40px;
margin-left: 8px;
`

const CenterRecruitContainer = styled.View`
flex-direction: row;
align-items: center;
`



const CenterListRight = styled.View`
width: 30%;
align-items: flex-end;
`

const CenterListBtn = styled.TouchableOpacity`
background-color: ${COLORS.box};
border-radius: 100px;
padding: 9px 26px;
align-items: center;
justify-content: center;
`

const CenterListRightTopText = styled.Text`
font-size: 16px;
color: ${COLORS.gray_400};
font-weight: 500;
line-height: 22.40px;
${(props) => 
    props.status === "AVAILABLE" && css`
      color: ${COLORS.main}; /* 예약일 때의 글자 색 */
    `}
    ${(props) => 
    props.status === "WAITING_AVAILABLE" && css`
      color: ${COLORS.main}; /* 예약일 때의 글자 색 */
    `}
  ${(props) => 
    props.status === "RESERVED"&& css`
      color: ${COLORS.white}; /* 취소일 때의 글자 색 */
    `}
    ${(props) => 
    props.status === "WAITING" && css`
      color: ${COLORS.white}; /* 취소일 때의 글자 색 */
    `}
  ${(props) => 
    props.status ==="END" && css`
      color: ${COLORS.gray_400}; /* 종료일 때의 글자 색 */
    `}
`;