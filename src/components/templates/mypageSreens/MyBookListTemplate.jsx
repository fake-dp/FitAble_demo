import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';

function MyBookListTemplate(props) {

    const navigation = useNavigation();

    const goBackScreens = () => {
        navigation.goBack();
    };

    return (
     <Container>
        <GobackBlackGrid onPress={goBackScreens}>전체 예약 목록</GobackBlackGrid>
    </Container>
    );
}

export default MyBookListTemplate;


const Container = styled.View`
  flex: 1;
  padding: 0 20px;
  background-color: ${COLORS.white};
`;
