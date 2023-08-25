import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { Text, View } from 'react-native';

function LongTextGrid({description}) {
    return (
        <Container>
            <LongText>
            {description}
            </LongText>
        </Container>
    );
}

export default LongTextGrid;

const Container = styled.View`
 padding: 0 20px;
 margin-top: 35px;
 margin-bottom: 35px;
`

const LongText = styled.Text`
    font-size: 14px;
font-weight: 400;
line-height: 22.40px;
color: ${COLORS.gray_100};
`
