import React from 'react';
import FastImage from 'react-native-fast-image'
import { styled, css } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { ScrollView ,Image} from 'react-native';
import BookNWaitingCancelModal from '../modal/BookNWaitingCancelModal';
function CalenderClassList({selectedItem,showModal,classList,mainCenter,mainCenterId,handleReload,handleCanceBtn,handleBtn,closeModal}) {

    const reroad = require('../../../assets/img/reroad.png');
    const userIcon = require('../../../assets/img/userIcon.png');



    return (
        <>
            {
            mainCenter && mainCenterId && (
            <ReroadContainer>
                <ReroadBtn onPress={handleReload}>
                    <ReroadIcon 
                    resizeMode={FastImage.resizeMode.contain}
                    source={reroad}/>
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

        </>
    );
}

export default CalenderClassList;

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
const ReroadIcon = styled(FastImage)`
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