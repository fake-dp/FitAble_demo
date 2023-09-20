import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { Platform, Image ,View, Text} from 'react-native';

function UserTicketNoneCard({onPress}) {
    return (
    <Container>
         <CardContainer>
            <CardText>사용 중인 이용권이 없습니다</CardText>
            <RegisteredBtn
            onPress={onPress}
            >
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

const CardContainer = styled.View`
   width: ${Platform.OS === 'ios' ? '340px' : '350px'};
   /* width: 100%; */
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

const RegisteredBtn = styled.TouchableOpacity`
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