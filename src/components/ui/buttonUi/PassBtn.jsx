// UI-passbtn
import { View, Image } from "react-native";
import styled from 'styled-components/native';
import { COLORS } from "../../../constants/color";

function PassBtn({onPress, screenName}) {

    const handlePress = () => {
        console.log('PassBtn pressed',screenName);
        onPress()
    }

    return (
        <View>
            <StyledPressable
            onPress={handlePress}
            >
                <StyledText>패스 인증하기</StyledText>
                <Image source={require('../../../assets/img/passicon.png')}/>
            </StyledPressable>
        </View>
    );
}

export default PassBtn;

const StyledPressable = styled.Pressable`
    background-color: #FF3A4A;
    width: 350px;
    height: 80px;
    border-radius: 13px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 49px;
    margin-bottom: 23px;
    padding: 0 20px;
`

const StyledText = styled.Text`
color: ${COLORS.white};
font-size: 20px;
font-weight: 500;
`;