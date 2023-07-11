import { View,Text } from "react-native";
import { styled } from "styled-components/native";
import { COLORS } from "../../constants/color";
    const Container = styled.View`
        flex: 1;
        background-color: ${COLORS.sub};
        align-items: center;
        justify-content: center;
    `;
    

function HomeSreen(props) {
    return (
        <Container>
            <Text>홈</Text>
        </Container>
    );
}

export default HomeSreen;