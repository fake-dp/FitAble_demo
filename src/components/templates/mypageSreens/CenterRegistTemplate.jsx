import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';

function CenterRegistTemplate(props) {
    return (
        <Container>
            <TestText>dddadsf</TestText>
        </Container>
    );
}

export default CenterRegistTemplate;

const Container = styled.View`

`

const TestText = styled.Text`
    color: ${COLORS.main};
`