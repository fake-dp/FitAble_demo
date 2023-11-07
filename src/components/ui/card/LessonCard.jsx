import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { Platform,Dimensions } from 'react-native';

function LessonCard({homeReservationList}) {
    // console.log('homeReservationList',homeReservationList)
    const {id, status, date,startTime, endTime, name, trainers,location }= homeReservationList

    const deviceWidth = Dimensions.get('window').width;
    const padding = 30;  // 원하는 패딩 값으로 변경 가능
    const cardWidth = deviceWidth - 2 * padding;
    // console.log('ddd@!',id, status, date,startTime, endTime, name, trainers,location )

    return (
        <Container>
            <CardContainer cardWidth={cardWidth}>
                <CardContent>
                    <CardMainText>{name}</CardMainText>
                    <CardTimeText>{startTime}~{endTime}</CardTimeText>
                    <CardSubTextContainer>
                        <CardDateText>{date}</CardDateText>
                        <CardRightText>{trainers} {location && `| ${location}` }</CardRightText>
                    </CardSubTextContainer>
                </CardContent>
            </CardContainer>
        </Container>
    );
}

export default LessonCard;

const Container = styled.View`

    padding: 0px 0px 0px 20px;

    `;

const CardContainer = styled.View`
   /* width: ${Platform.OS === 'ios' ? '340px' : '350px'}; */
   width: ${({ cardWidth }) => cardWidth}px;
   padding: 25px 40px 25px 16px;
  height: 120px;
  border-radius: 13px;
  background-color: ${COLORS.sub};
  border: 1px solid ${COLORS.gray_400};
  margin-top: 12px;
  margin-bottom: 20px;
`;

const CardContent = styled.View`

`;

const CardMainText = styled.Text`
color: ${COLORS.gray_200};
font-size: 14px;
font-weight: 400;
line-height: 22.40px;
`

const CardTimeText = styled.Text`
color: ${COLORS.gray_200};
font-size: 20px;
font-weight: 600;
line-height: 30px;
`

const CardSubTextContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const CardDateText = styled.Text`
color: ${COLORS.gray_300};
font-size: 14px;
font-family: Pretendard;
font-weight: 400;
line-height: 22.40px;
`

const CardRightText = styled.Text`
color: ${COLORS.gray_200};
font-size: 14px;
font-weight: 400;
line-height: 22.40px;
`;