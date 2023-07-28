import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';

function MyBookListTemplate(props) {
    return (
        <Container>
            <TestText>dddadsf</TestText>
        </Container>
    );
}

export default MyBookListTemplate;

const Container = styled.View`

`

const TestText = styled.Text`
    color: ${COLORS.main};
`