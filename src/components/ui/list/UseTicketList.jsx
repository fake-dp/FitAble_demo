import { View ,Text} from "react-native";
import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { Fragment } from "react";
function UseTicketList({ useTicketListData,openCancelModal,openStopModal,goDetailTicketScreens }) {
    return (
      <View>
        {useTicketListData.map((data) => (
            <Fragment key={data.id}>
          <Container>
            <ContentsBox onPress={goDetailTicketScreens}>
              <TextContainer>
                <DateText>{data.date}</DateText>
                {data.isUsed && <UsingText>이용중</UsingText>}
                </TextContainer>
                {data.isUsed && <TitleText>3개월 이용권+1:1 P.T 3회</TitleText>}
              <TitleText>{data.title}</TitleText>
            </ContentsBox>
            <SubTextContainer>
              <IsCardText>{data.isCard ? 'PAYCO' : '현금'}</IsCardText>
              <TitleText>{data.price}</TitleText>
              {data.isUsed ? (
                  <BtnWraper>
                  <CancelBtnContainer onPress={openStopModal}>
                     <CancelBtnText>중지</CancelBtnText>
                  </CancelBtnContainer>
                  <CancelBtnContainer onPress={openCancelModal}>
                     <CancelBtnText>환불</CancelBtnText>
                  </CancelBtnContainer>
                </BtnWraper>
              ) : null}
            </SubTextContainer>
          </Container>
          <LineStyle key={`line-${data.id}`} />
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
    margin-bottom: 30px;
    margin-top: 28px;
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