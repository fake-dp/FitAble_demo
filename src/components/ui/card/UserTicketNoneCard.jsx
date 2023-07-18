import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { Platform, Image ,View, Text} from 'react-native';

function UserTicketNoneCard(props) {
    return (
    <Container>
         <CardContainer>
            <Text>ddd</Text>
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
  padding: 27px 30px 30px 24px;
  height: 210px;
  border-radius: 13px;
  background-color: ${COLORS.sub};
  border: 1px solid ${COLORS.gray_400};
  /* margin-left: 20px; */
  margin-top: 12px;
`;
