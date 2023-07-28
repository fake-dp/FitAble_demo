import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
import GobackGrid from '../../grid/GobackGrid';
function CenterRegistTemplate(props) {

    const navigation = useNavigation();

    const goBackScreens = () => {
        navigation.goBack();
    };

    return (
        <Container>
            <GobackGrid onPress={goBackScreens}>대표 센터 등록</GobackGrid>
        </Container>
    );
}

export default CenterRegistTemplate;

const Container = styled.View`
  flex: 1;
  padding: 0 20px;
  background-color: ${COLORS.sub};
`;
