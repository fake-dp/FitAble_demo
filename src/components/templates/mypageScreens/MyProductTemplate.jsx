import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
import GobackGrid from '../../grid/GobackGrid';
function MyProductTemplate(props) {

    const navigation = useNavigation();

    const goBackScreens = () => {
        navigation.goBack();
    };

    return (
        <Container>
            <GobackBlackGrid onPress={goBackScreens}>주문상품 확인</GobackBlackGrid>
            <TestGrid>

            <MyProductText>곧 업데이트 예정입니다.</MyProductText>
            </TestGrid>
        </Container>
    );
}

export default MyProductTemplate;

const Container = styled.View`
  flex: 1;
  padding: 0 20px;
  background-color: ${COLORS.white};
`;


const TestGrid = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`


const MyProductText = styled.Text`
font-size: 16px;
color: ${COLORS.sub};
font-weight: 500;
line-height: 22.40px;
`