import { View,Text } from "react-native";
import { styled } from "styled-components/native";
import { COLORS } from "../../constants/color";
function StoreScreen(props) {
    return (
        <Container>
            <TitleText>곧 업데이트 예정입니다.</TitleText>
        </Container>
    );
}

export default StoreScreen;

const Container = styled.View`
    flex:1;
    background-color: ${COLORS.sub};
    align-items: center;
    justify-content: center;
`

const TitleText = styled.Text`
    font-size: 20px;
    font-weight: 500;
    line-height: 22.40px;
    color: ${COLORS.white};
`