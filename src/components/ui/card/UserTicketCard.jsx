import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { Platform, Image ,View} from 'react-native';
import SmallLabel from '../label/SmallLabel';
function UserTicketCard({ userCardData }) {
  const { location, sportswear, locker, label, des, period, number, startdate, enddate,expiration } = userCardData;
//   console.log('userCardData', userCardData);

  const shirts = require('../../../assets/img/t_shirt.png');
  const lockers = require('../../../assets/img/lockers.png');
 
  const progressPercentage = (1 - expiration/number) * 100;
//   console.log('progressPercentage', progressPercentage)
  return (
    <Container>
    <CardContainer>
      <CardContent>
        <CardMainText>{location}</CardMainText>
        <LabelContainer>
            {
                sportswear && (<LabelImg source={shirts}/>)
            }
            {
                locker && (<LabelImg source={lockers}/>)
            }
            <SmallLabel>{label}</SmallLabel>
        </LabelContainer>

      </CardContent>
        <CardDesText>{des}</CardDesText>
        <CardPeriodText>{period} {number}회</CardPeriodText>

        <ProgressBarContainer>
            <ProgressBar percentage={progressPercentage} />
          </ProgressBarContainer>
        <CardDateContainer>

        <CardExpirationText>{startdate}~{enddate}</CardExpirationText>
        <CardExpirationText>{expiration}회 남음</CardExpirationText>
        </CardDateContainer>
    </CardContainer>
  </Container>
  );
}

export default UserTicketCard;

const Container = styled.View`
  padding: 0 20px;
`;

const CardContainer = styled.View`
   width: ${Platform.OS === 'ios' ? '340px' : '350px'};
  padding: 27px 30px 30px 24px;
  height: 210px;
  border-radius: 13px;
  background-color: ${COLORS.sub};
  border: 1px solid ${COLORS.gray_400};
  margin-top: 12px;
`;


const CardContent = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 22px;
`;

const CardMainText = styled.Text`
  font-size: 16px;
font-weight: 700;
line-height: 22.40px;
  color: ${COLORS.white};
`;

const LabelContainer = styled.View`
    flex-direction: row;
    align-items: center;
`

const LabelImg = styled.Image`
    width: 20px;
    height: 20px;
    margin-right: 10px;
`

const CardDesText = styled.Text`
font-size: 14px;
font-weight: 400;
line-height: 22.40px;
color: ${COLORS.gray_200};
margin-bottom: 4px;
`

const CardPeriodText = styled.Text`
font-size: 32px;
font-weight: 600;
line-height: 43.20px;
color: ${COLORS.white};
margin-bottom: 9px;
`

const CardDateContainer = styled.View`
flex-direction: row;
justify-content: space-between;
margin-top: 15px;
`

const CardExpirationText = styled.Text`
font-size: 12px;
font-weight: 400;
line-height: 16.80px;
color: ${COLORS.gray_200};
`

const ProgressBarContainer = styled.View`
  /* flex: 1; */
  height: 8px;
  background-color: ${COLORS.gray_400};
  border-radius: 4px;
  margin-right: 8px;
`;

const ProgressBar = styled.View`
  /* flex: ${({ percentage }) => percentage / 100}; */
  width: ${({ percentage }) => percentage}%;
  height: 100%;
  background-color: ${COLORS.main};
  border-radius: 4px;
`;