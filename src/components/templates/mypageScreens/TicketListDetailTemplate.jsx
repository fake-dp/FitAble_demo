import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { useNavigation } from '@react-navigation/native';
import GobackGrid from '../../grid/GobackGrid';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import React, { useEffect, useState } from 'react';
import { View,Text, ScrollView, SafeAreaView ,TouchableOpacity} from 'react-native';
import { useRoute } from '@react-navigation/native';
import MyBtn from '../../ui/buttonUi/MyBtn';
import {getDetailTicket} from '../../../api/useTicketsApi';
import {formatReplaceString} from'../../../utils/CustomUtils';
function TicketListDetailTemplate(props) {
    const navigation = useNavigation();
    const route = useRoute();
    const { data, id } = route.params;
  
    const [showContent, setShowContent] = useState(false);
    const [detailTicketData, setDetailTicketData] = useState([]);

    useEffect(() => {
        // console.log('Received Data:', data, id);
        if(id) {
            getDetailTicketData(id);
        }
    }, [id]);
   

    const getDetailTicketData = async (id) => {
        try {
            const response = await getDetailTicket(id);
            // console.log('response',response)
            setDetailTicketData(response);
        } catch (error) {
            console.error('Error getting:', error);
        }
    };

    const goBackScreens = () => {
        navigation.goBack();
    };

    const goExerciseScreens = () => {
        navigation.navigate('Exercise');
    };

    const toggleContent = () => {
        setShowContent(!showContent);
    };
    console.log('detailTicketData',detailTicketData)

    const downIcon = require('../../../assets/img/downcoupon.png');
    const upIcon = require('../../../assets/img/upcoupon.png');

    // console.log('detailTicketData',detailTicketData?.status)

    const {name,type,status,center,startDate,endDate,leftDay,leftTime,week,daily,leftReservation,leftCancelReservation,periodOfStopTicket,numberOfStopTicket,options,availableCenter ={}} = detailTicketData || {};
    const {number, centers}=availableCenter
//TICKET_TIME(일반이용권 횟수제), PT_TIME(P.T 횟수제), RENTAL_SPORTSWEAR_TIME
    console.log('data',type,number, centers)
    console.log('options',options&&options.length )
    return (
        <Container>
            <SafeAreaView/>
            <HeaderContainer isUsed={detailTicketData?.status}>
                <GobackContainer>
                    {
                        status&&status !=='IN_USE' ? <GobackBlackGrid onPress={goBackScreens}/> : <GobackGrid onPress={goBackScreens}/>
                    }
                </GobackContainer>

                <SpotTitleText isUsed={detailTicketData?.status}>{center?.name}</SpotTitleText>
                <UseTicketTitleText isUsed={detailTicketData?.status} isLength={detailTicketData?.name?.length}>
                    {name && name}
                    </UseTicketTitleText>
            <SubTextContainer>
            <SubText isUsed={detailTicketData?.status}>{startDate && formatReplaceString(startDate)}~{endDate&&formatReplaceString(endDate)}</SubText>
             <SubText isUsed={detailTicketData?.status}>
             {type === 'TICKET_TIME' ||type === 'PT_TIME' ||type === 'RENTAL_SPORTSWEAR_TIME' ? `${leftTime&&leftTime}회` : `${leftDay&&leftDay}일`} 남음{status&&status ==='STOP' && '(중지)'}</SubText>
            </SubTextContainer>
            <SubText>type:{type&&type}, status:{status&&status}</SubText>
            </HeaderContainer>

            <TicketListContentsContainer>
                <ScrollView
                showsVerticalScrollIndicator={false}
                >
                    <TicketTextContainer>
                            <TicketTitleText>잔여</TicketTitleText>
                            <TicketContentsText>{type === 'TICKET_TIME' ||type === 'PT_TIME' ||type === 'RENTAL_SPORTSWEAR_TIME' ? `${leftTime&&leftTime}회` : `${leftDay&&leftDay}일`}</TicketContentsText>
                    </TicketTextContainer>
                    <TicketTextContainer>
                            <TicketTitleText>주간이용</TicketTitleText>
                            {
                                week ? <TicketContentsText>{week?.numberOfLeft}회 남음 | 일 {week?.numberOfTotal}회</TicketContentsText> : <TicketContentsText>무제한</TicketContentsText>
                            }
                            {/* <TicketContentsText>{week?.numberOfLeft}회 남음 | 일 {week?.numberOfTotal}회</TicketContentsText> */}
                    </TicketTextContainer>
                    <TicketTextContainer>
                            <TicketTitleText>1일 이용</TicketTitleText>
                            {
                                daily ? <TicketContentsText>{daily?.numberOfLeft}회 남음 | 일 {daily?.numberOfTotal}회</TicketContentsText> : <TicketContentsText>무제한</TicketContentsText>
                            }
                            {/* <TicketContentsText>{daily?.numberOfLeft}회 남음 | 일 {daily?.numberOfTotal}회</TicketContentsText> */}
                    </TicketTextContainer>
                    <TicketTextContainer>
                            <TicketTitleText>최대 예약 가능 횟수</TicketTitleText>
                            {
                                leftReservation === null ? <TicketContentsText>무제한</TicketContentsText> : <TicketContentsText>{leftReservation}회</TicketContentsText>
                            }
                            {/* <TicketContentsText>{leftReservation}회</TicketContentsText> */}
                    </TicketTextContainer>
                    <TicketTextContainer>
                            <TicketTitleText>예약 취소 가능 횟수</TicketTitleText>
                            {
                                leftCancelReservation === null ? <TicketContentsText>무제한</TicketContentsText> : <TicketContentsText>{leftCancelReservation}회</TicketContentsText>
                            }
                            {/* <TicketContentsText>{leftCancelReservation}회</TicketContentsText> */}
                    </TicketTextContainer>
                    {
                        numberOfStopTicket === null && periodOfStopTicket === null ? null : (
                            <TicketTextContainer>
                                    <TicketTitleText>중지권</TicketTitleText>
                                    <TicketContentsText>{numberOfStopTicket}개({periodOfStopTicket}일)</TicketContentsText>
                             </TicketTextContainer>
                        )
                    }
                    {
                                options&&options.length!==0 && (
                                    <TicketOptionTextContainer>
                                    <TicketTitleText>옵션</TicketTitleText>
                                    <OptionContainer>
                                    {
                                     options && options.map((option, index) => (
                                         <TicketContentsText key={index}>
                                             {option.type}
                                             {option.name}
                                             ({option.type === 'TICKET_TIME' ||option.type === 'PT_TIME' ||option.type === 'RENTAL_SPORTSWEAR_TIME' ? `${option?.left&&option?.left}회` : `${option?.left&&option?.left}일`})
                                         </TicketContentsText>)) }
                                    </OptionContainer>
                            </TicketOptionTextContainer>
                                )
                            }
                    {
                   centers && number!== 0 &&
                    <CenterListContainerBox onPress={toggleContent} activeOpacity={0.8}>
                        <CenterContainer>
                         <CenterListText>이용 가능 센터 {number&&number}</CenterListText>
                         <UpdownImg source={showContent ? upIcon : downIcon} />
                        </CenterContainer>

                        {
                            showContent && (
                                <CenterListContainer>
                                    <CenterListLongText>{centers&&centers.join(', ')}</CenterListLongText>
                                </CenterListContainer>
                            )
                        }

                    </CenterListContainerBox>
                }
                </ScrollView>
                {
                    status&&status ==='IN_USE' && <MyBtn onPress={goExerciseScreens}>운동하기</MyBtn>
                }
            </TicketListContentsContainer>
        </Container>
    );
}


export default TicketListDetailTemplate;

const Container = styled.View`
  flex: 1;
  /* padding: 0 20px; */
  background-color: ${COLORS.white};
`;

const HeaderContainer = styled.View`
    width: 100%;
    height: 260px;
    background-color: ${props => props.isUsed === 'IN_USE' ? COLORS.sub : COLORS.gray_200};
    padding: 0 20px;
`

const GobackContainer = styled.View`
     margin-top:40px ;
`

const SpotTitleText = styled.Text`
color: ${props => props.isUsed === 'IN_USE' ? COLORS.gray_200 : COLORS.gray_400};
font-size: 14px;
font-weight: 500;
line-height: 22.40px;
margin-top: 52px;
margin-bottom: 20px;
`

const UseTicketTitleText = styled.Text`
/* font-size: 32px; */
font-size: ${props => props.isLength > 12 ? '28px' : '30px'};
font-weight: 600;
line-height: 43.20px;
color: ${props => props.isUsed === 'IN_USE' ? COLORS.main : COLORS.gray_400};
margin-bottom: 6px;
`

const SubTextContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const SubText = styled.Text`
font-size: 16px;
font-weight: 400;
line-height: 22.40px;
/* color: ${COLORS.white}; */
color: ${props => props.isUsed === 'IN_USE' ? COLORS.white : COLORS.gray_400};
`

const TicketListContentsContainer = styled.View`
    padding: 0 20px;
    margin-top: 26px;
    flex: 1;
    margin-bottom: 20px;
`

const TicketTextContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 17px;
`

const TicketOptionTextContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 17px;
`

const TicketTitleText = styled.Text`
font-size: 14px;
font-weight: 500;
line-height: 22.40px;
color: ${COLORS.sub};
`


const CenterListContainerBox = styled.TouchableOpacity`
  margin-top: 20px;
  background-color: ${COLORS.white};
  border-radius: 10px;
  border: 1px solid ${COLORS.gray_200};
  margin-bottom: 100px;
`;
const CenterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 14px 14px;
  border-radius: 13px;
  justify-content: space-between;
`;

const UpdownImg = styled.Image``;

const CenterListText = styled.Text`
color: ${COLORS.gray_400};
font-size: 14px;
font-weight: 500;
line-height: 22.40px;
`

const CenterListContainer = styled.View`
    padding:0 15px;
    margin-bottom: 20px;
`

const CenterListLongText = styled.Text`
    color: ${COLORS.gray_400};
font-size: 14px;
font-weight: 400;
line-height: 22.40px;
`

const OptionContainer = styled.View`
    flex-direction: column;
    justify-content: flex-end;
`

const TicketContentsText = styled.Text`
font-size: 14px;
font-weight: 400;
line-height: 22.40px;
color: ${COLORS.gray_400};
text-align: right; 
`