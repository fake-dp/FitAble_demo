import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';

function ConsultBtn({onPress}) {
    return (
        <ConsultBtnContainer
        onPress={onPress}
        >
            <ConsultBtnText>상담하기</ConsultBtnText>
        </ConsultBtnContainer>
    );
}

export default ConsultBtn;

const ConsultBtnContainer = styled.TouchableOpacity`
background-color: ${COLORS.box};
border-radius: 100px;
width: 80px;
height: 40px;
justify-content: center;
align-items: center;
margin-top: 16px;
`

const ConsultBtnText = styled.Text`
font-size: 14px;
font-weight: 500;
line-height: 22.40px;
color: ${COLORS.main};
`