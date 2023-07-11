// UI-MainBtn
import { View,Text, Pressable } from "react-native";
import styled from 'styled-components/native';
import { COLORS } from "../../../constants/color";
const StyledPressable = styled.Pressable`
    background-color: #000;
    width: 350px;
    height: 60px;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
    background-color: ${COLORS.main};
    margin-top: 49px;
    margin-bottom: 23px;
`

function MainBtn({children, onPress}) {

    const handlePress = () => {
        console.log('MainBtn pressed');
        onPress()
    }

    
    

    return (
        <View>
            <StyledPressable
                onPress={handlePress}
            >
                <Text>{children}</Text>
            </StyledPressable>
        </View>
    );
}

export default MainBtn;