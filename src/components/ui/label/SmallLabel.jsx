import { View, Text } from "react-native";
import styled from 'styled-components/native';
import { COLORS } from "../../../constants/color";
function SmallLabel({children}) {
    return (
        <LabelContainer>
            <LabelText>{children}</LabelText>
        </LabelContainer>
    );
}

export default SmallLabel;

const LabelContainer = styled.View`
    background-color: ${COLORS.box};
    border-radius: 50px;
    padding: 9px 8px;
    align-items: center;
`

const LabelText = styled.Text`
    font-size: 12px;
    font-weight: 400;
    color: ${COLORS.white};
`