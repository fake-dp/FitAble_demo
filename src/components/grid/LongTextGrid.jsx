import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { Text, View } from 'react-native';

function LongTextGrid({description}) {
    return (
        <Container>
            <LongText>
            {/* 노원 최대 규모의 피트니스짐 에이블짐은 매일 고객님들이 
            즐겁게 운동하실 수 있도록 청결을 유지하고 있으며 최신 기구들이 준비되어있습니다. 에이블짐에서 몸과 마음을 건강하게 만들 수 
            있도록 저희가 노력하겠습니다.

            노원 최대 규모의 피트니스짐 에이블짐은 매일 고객님들이
            즐겁게 운동하실 수 있도록 청결을 유지하고 있으며 최신 
            ß 기구들이 준비되어있습니다. 에이블짐에서 몸과 마음을 
            건강하게 만들 수 있도록 저희가 노력하겠습니다.

            노원 최대 규모의 피트니스짐 에이블짐은 매일 고객님들이
            즐겁게 운동하실 수 있도록 청결을 유지하고 있으며 최신 
            기구들이 준비되어있습니다. 에이블짐에서 몸과 마음을 
               건강하게 만들 수 있도록 저희가 노력하겠습니다. */}
            {description}
            </LongText>
        </Container>
    );
}

export default LongTextGrid;

const Container = styled.View`
 padding: 0 20px;
 margin-top: 35px;
`

const LongText = styled.Text`
    font-size: 14px;
font-weight: 400;
line-height: 22.40px;
color: ${COLORS.gray_100};
`
