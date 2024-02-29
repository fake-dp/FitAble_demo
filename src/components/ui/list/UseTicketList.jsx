import { View ,Text} from "react-native";
import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { Fragment } from "react";
import {formatCommaNumber} from '../../../utils/CustomUtils'
import { useNavigation } from '@react-navigation/native';
function UseTicketList({ useTicketListData,openCancelModal,openStopModal }) {
    
  const navigation = useNavigation();

  const detailScreen = (id) => {
    console.log('id@@@확인용',id)
    navigation.navigate('TicketDetail', {data:"OTHER",id:id})
  };
  console.log('useTicketListData',useTicketListData)
  return (
      <View>
        {useTicketListData.map((data,index) => (
            <Fragment key={data.id}>
          <Container>
            <ContentsBox onPress={()=>detailScreen(data.id)}>
              <TextContainer>
                <DateText>{data.createAt}</DateText>
                {data.status === 'IN_USE'&& <UsingText>이용중</UsingText>}
                {data.status === 'USING_SOON'&& <UsingText>이용예정</UsingText>}
                {data.status === 'STOP'&& <UsingText>중지중</UsingText>}
                {/* {data.status === 'EXPIRED'&& <UsingText>만료</UsingText>} */}
                </TextContainer>
                <TitleText>{`${data.name}`.length > 16 ? `${data.name}`.substring(0, 16) + '...' : `${data.name}`}</TitleText>
                {/* EXPIRED 일때 중지버튼이랑 환불 버튼 안보이게 */}
              {/* <DateText>{data.status}</DateText> */}
              {/* <DateText>{data.paymentStatus}</DateText> */}
              {/* <DateText>{`${data.stopTicket}`}</DateText> */}
            </ContentsBox>
            <SubTextContainer>
              <IsCardText>{data.paymentType}</IsCardText>
              <TitleText>{formatCommaNumber(data.price)}원</TitleText>
              
              <BtnWraper>
              {data.status !== 'EXPIRED' && (
             <>
              {data.stopTicket && (
                 <CancelBtnContainer onPress={() => openStopModal(data.id, data.centerName, data.name)}>
                   <CancelBtnText>중지</CancelBtnText>
                </CancelBtnContainer>
              )}
              {data.paymentStatus === 'PAYMENT_SUCCESS' && (
                <CancelBtnContainer onPress={() => openCancelModal(data.id)}>
                    <CancelBtnText>환불</CancelBtnText>
                </CancelBtnContainer>
               )}
             </>
             )}
              </BtnWraper>
          
            </SubTextContainer>
          </Container>
          <LineStyle key={`line-${data.id}`} isLast={index === useTicketListData.length - 1}/>
          
              </Fragment>
        ))}
      </View>
    );
  }
  

export default UseTicketList;

const Container = styled.View`
    flex-direction: row;
    justify-content: space-between;
`

const LineStyle = styled.View`
    border-bottom-width: 1px;
    border-bottom-color: ${COLORS.gray_100};
    /* margin-bottom: 30px; */
    margin-top: 28px;
    margin-bottom: ${({ isLast }) => (isLast ? '60px' : '30px')};
`;

const ContentsBox = styled.TouchableOpacity``

const TextContainer = styled.View`
    flex-direction: row;
`

const TitleText = styled.Text`
color: ${COLORS.sub};
font-size: 14px;
font-weight: 400;
line-height: 22.40px;
`

const SubTextContainer = styled.View`
      align-items: flex-end;
`

const DateText = styled.Text`
color: ${COLORS.gray_300};
font-size: 14px;
font-weight: 400;
line-height: 22.40px;
`

const IsCardText = styled.Text`
color: ${COLORS.gray_300};
font-size: 14px;
font-weight: 400;
line-height: 22.40px;
`

const CancelBtnContainer = styled.TouchableOpacity`
    border: 1px solid ${COLORS.sub};
    border-radius: 100px;
    padding: 4px 11px;
    margin-top: 16px;
    margin-bottom: 18px;
    width: 70px;
    align-items: center;
    justify-content: center;
    margin-left: 8px;
`;


const CancelBtnText = styled.Text`
    font-size: 14px;
    font-weight: 400;
    line-height: 22.40px;
    color: ${COLORS.sub};
`;

const BtnWraper = styled.View`
    flex-direction: row;
`



const UsingText = styled.Text`
  color:#FF7A00;
  font-size: 14px;
  font-weight: 400;
  line-height: 22.40px;
  margin-left: 8px;
`;