import { View ,Text} from "react-native";
import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { Fragment } from "react";
function SubscribeList({ subscribeListData,onPress,openCancelModal,goDetailTicketScreens }) {
    return (
      <View>
        {subscribeListData.map((data) => (
        <Fragment key={data.id}>
          <Container>
            <ContentsBox onPress={goDetailTicketScreens}>
              <TextContainer>
                <DateText>{data.date}</DateText>
                {data.isUsed && <UsingText>이용중</UsingText>}
                </TextContainer>
              <TitleText>{data.title}</TitleText>
            </ContentsBox>
            <SubTextContainer>
              <IsCardText>{data.isCard ? 'PAYCO' : '현금'}</IsCardText>
              <TitleText>{data.price}</TitleText>
              {data.isUsed ? (
                  <>
                  <CancelBtnContainer onPress={openCancelModal}>
                     <CancelBtnText>구독취소</CancelBtnText>
                  </CancelBtnContainer>
                  <TextContainerBtn onPress={onPress}>
                  <UnderLineText>결제 수단 변경</UnderLineText>
                  </TextContainerBtn>
                </>
              ) : null}
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