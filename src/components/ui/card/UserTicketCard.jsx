import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { Platform, Image ,View, TouchableOpacity,Dimensions} from 'react-native';
import SmallLabel from '../label/SmallLabel';
import FastImage from 'react-native-fast-image'

function UserTicketCard({ homeTicketList,detailTicketsScreen }) {
  const { id, center,locker,name,sportWear,trainerName,detail, usePercentage,type, status, startDate,endDate,left } = homeTicketList;


const deviceWidth = Dimensions.get('window').width;
const padding = 30;  // 원하는 패딩 값으로 변경 가능
const cardWidth = deviceWidth - 2 * padding;
//  console.log('deviceWidth',deviceWidth)

  const shirts = require('../../../assets/img/t_shirt.png');
  const lockers = require('../../../assets/img/lockers.png');

  return (
    <Container>
      {
        status === "EXPIRED" || status ==="STOP_PENDING"? null : (
          <CardContainer cardWidth={cardWidth}>
          <InnerContainer onPress={()=>detailTicketsScreen(id)}>
          <CardContent>
            <CardMainText>{center.name}</CardMainText>
            <LabelContainer>
                {
                    sportWear && (<LabelImg source={shirts}/>)
                }
                {
                    locker && (<LabelImg source={lockers}/>)
                }
                {/* status : EXPIRING_SOON(만료 예정), EXPIRED(만료), IN_USE(사용중), STOP(중지) */}
                <SmallLabel>{
                    status === "IN_USE" ? "이용중" 
                  : status === "STOP" ? "중지" 
                  : status === "EXPIRING_SOON" ? "이용중" 
                  : status === "USING_SOON" ? "예정"
                  : null
                  }</SmallLabel>
            </LabelContainer>
    
          </CardContent>
            {/* <CardDesText>{name} {trainerName}</CardDesText> */}
            <CardDesText>
            {
              `${name} ${trainerName ? `• ${trainerName} 강사` : ''}`.length > 24 
              ? `${name} ${trainerName ? `• ${trainerName} 강사` : ''}`.substring(0, 24) + '...' 
              : `${name} ${trainerName ? `• ${trainerName} 강사` : ''}`
            }
            </CardDesText>


            <CardPeriodText>{detail}</CardPeriodText>
    
            <ProgressBarContainer>
                <ProgressBar percentage={usePercentage} status={status} />
              </ProgressBarContainer>
            <CardDateContainer>
    
            <CardExpirationText>{startDate}~{endDate}</CardExpirationText>
            <CardExpirationText>{left} 남음</CardExpirationText>
            </CardDateContainer>
          </InnerContainer>
        </CardContainer>
        )
      }
  </Container>
  );
}

export default UserTicketCard;

const Container = styled.View`
  padding: 0 0 0 20px;
`;

const CardContainer = styled.View`
  /* width: ${Platform.OS === 'ios' ? '340px' : '350px'}; */
  width: ${({cardWidth}) => cardWidth}px;

  /* padding: 27px 30px 30px 24px; */
  /* padding: 20px 25px 30px 25px; */
  padding: 20px;
  /* height: 210px; */
  border-radius: 13px;
  background-color: ${COLORS.sub};
  border: 1px solid ${COLORS.gray_400};
  margin-top: 12px;
`;

const InnerContainer = styled.TouchableOpacity`
  width: 100%;
`;

const CardContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 22px;
`;

const CardMainText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  line-height: 22.4px;
  color: ${COLORS.white};
`;

const LabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LabelImg = styled(FastImage)`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const CardDesText = styled.Text`
  font-size: 14px;
  font-weight: 400;
  line-height: 22.4px;
  color: ${COLORS.gray_200};
  margin-bottom: 4px;
`;

const CardPeriodText = styled.Text`
  font-size: 32px;
  font-weight: 600;
  line-height: 43.2px;
  color: ${COLORS.white};
  margin-bottom: 9px;
`;

const CardDateContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
`;

const CardExpirationText = styled.Text`
  font-size: 12px;
  font-weight: 400;
  line-height: 16.8px;
  color: ${COLORS.gray_200};
`;

const ProgressBarContainer = styled.View`
  /* flex: 1; */
  height: 8px;
  background-color: ${COLORS.white};
  border-radius: 4px;
  margin-right: 8px;
`;

const ProgressBar = styled.View`
  /* flex: ${({percentage}) => percentage / 100}; */
  width: ${({percentage}) => percentage}%;
  height: 100%;
  /* background-color: ${COLORS.main}; */
  background-color: ${({status}) =>
    status === 'IN_USE'
      ? COLORS.main
      : status === 'STOP'
      ? COLORS.gray_400
      : status === 'EXPIRING_SOON'
      ? '#FF7A00'
      : status === 'USING_SOON'
      ? COLORS.white
      : null};
  border-radius: 4px;
`;
