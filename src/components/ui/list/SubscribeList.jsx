import { View ,Text} from "react-native";
import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { Fragment } from "react";
import {formatCommaNumber} from '../../../utils/CustomUtils'
import { useNavigation } from '@react-navigation/native';
function SubscribeList({ postPaymentSubscriptionNextMonthBtn,subscribeListData,onPress,openCancelModal,goDetailTicketScreens }) {
  // SUBSCRIBE

  const navigation = useNavigation();

  const detailScreen = (id) => {
    console.log('id@@@확인용',id)
    navigation.navigate('TicketDetail', {data:"SUBSCRIBE",id:id})
  };
  
  return (
      <View>
        {subscribeListData.map((data) => (
        <Fragment key={data.id}>
          <Container>
            <ContentsBox onPress={()=>detailScreen(data.id)}>
              <TextContainer>
                <DateText>{data.createAt}</DateText>
                {data.status === 'IN_USE' && <UsingText>이용중</UsingText>}
                {data.status === 'USING_SOON' && <UsingText>이용예정</UsingText>}
                </TextContainer>
                <TitleText>{`${data.name}`.length > 18 ? `${data.name}`.substring(0, 18) + '...' : `${data.name}`}</TitleText>
              
              {/* <DateText>{data.status}</DateText> */}
              {/* <DateText>{data.paymentStatus}</DateText> */}
            </ContentsBox>
            <SubTextContainer>
              <IsCardText>{data.paymentType}</IsCardText>
              <TitleText>{formatCommaNumber(data.price)}원</TitleText>
              {/* {data.status === 'IN_USE' ? ( */}
                  <>
                  <BtnContainer>
                  {
                    data.paymentStatus === 'PAYMENT_SUCCESS' && (
                      <CancelBtnContainer onPress={()=>openCancelModal(data.id)}>
                        <CancelBtnText>해지예약</CancelBtnText>
                       </CancelBtnContainer>
                    )
                  }
                  
                  {
                    data.paymentStatus === 'PAYMENT_FAILURE' && (
                      <CancelNextBtnContainer onPress={()=>postPaymentSubscriptionNextMonthBtn(data.id)}>
                          <CancelBtnText>다음달 결제</CancelBtnText>
                       </CancelNextBtnContainer>
                    )
                  }
                  </BtnContainer>
                  {
                    data.paymentStatus === 'PAYMENT_SUCCESS' || data.paymentStatus === 'PAYMENT_FAILURE' ? (
                      <TextContainerBtn onPress={onPress}>
                      <UnderLineText>결제 수단 변경</UnderLineText>
                      </TextContainerBtn>) : null
                  }
    
                </>
              {/* ) : null} */}
            </SubTextContainer>
          </Container>
          <LineStyle key={`line-${data.id}`} />
           </Fragment>
        ))}
      </View>
    );
  }
  

export default SubscribeList;

const Container = styled.View`
    flex-direction: row;
    justify-content: space-between;
`

const LineStyle = styled.View`
    border-bottom-width: 1px;
    border-bottom-color: ${COLORS.gray_100};
    margin-bottom: 30px;
    margin-top: 28px;
`;

const ContentsBox = styled.TouchableOpacity`
    /* background-color: red; */
`

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
`;

const CancelNextBtnContainer = styled.TouchableOpacity`
    border: 1px solid ${COLORS.sub};
    border-radius: 100px;
    padding: 4px 11px;
    margin-top: 16px;
    margin-bottom: 18px;
    margin-left: 8px;
`;


const CancelBtnText = styled.Text`
    font-size: 14px;
    font-weight: 400;
    line-height: 22.40px;
    color: ${COLORS.sub};
`;

const TextContainerBtn = styled.TouchableOpacity``

const UnderLineText = styled.Text`
    color: ${COLORS.gray_400};
font-size: 14px;
font-weight: 400;
text-decoration: underline;
line-height: 22.40px;
`

const UsingText = styled.Text`
  color:#FF7A00;
  font-size: 14px;
  font-weight: 400;
  line-height: 22.40px;
  margin-left: 8px;
`;

const BtnContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`