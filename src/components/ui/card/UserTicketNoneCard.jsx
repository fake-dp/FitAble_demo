import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { Platform, Dimensions} from 'react-native';

function UserTicketNoneCard({onPress}) {
   
  const deviceWidth = Dimensions.get('window').width;
const padding = 20;  // 원하는 패딩 값으로 변경 가능
const cardWidth = deviceWidth - 2 * padding;
  
  return (
    <Container>
         <CardContainer cardWidth={cardWidth} onPress={onPress}>
            <CardText>사용 중인 이용권이 없습니다</CardText>
            <RegisteredBtn>
                <BtnCardText>내 센터 등록하기</BtnCardText>
            </RegisteredBtn>
         </CardContainer>
  </Container>
    );
}

export default UserTicketNoneCard;




const Container = styled.View`
  /* width: 100%; */
  padding: 0 20px;
`;

const CardContainer = styled.TouchableOpacity`
   /* width: ${Platform.OS === 'ios' ? '340px' : '350px'}; */
   width: ${({ cardWidth }) => cardWidth}px;
  height: 210px;
  border-radius: 13px;
  background-color: ${COLORS.sub};
  border: 1px solid ${COLORS.gray_400};
  margin-top: 12px;

  align-items: center;
  justify-content: center;
`;

const CardText = styled.Text`
color: ${COLORS.white};
font-size: 16px;
font-weight: 500;
line-height: 22.40px;
`

const RegisteredBtn = styled.View`
    background-color: ${COLORS.main};
    border-radius: 80px;
    width: 173px;
    height: 60px;
    margin-top: 13px;
    justify-content: center;
    align-items: center;
`

const BtnCardText = styled.Text`
  color: ${COLORS.sub};
font-size: 16px;
font-weight: 700;
`