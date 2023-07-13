
import { COLORS } from "../../../constants/color";
import { styled } from "styled-components/native";
import { TextInput,Platform } from "react-native";

function EctInput({placeholder, text,onChangeText,value,onBlur}) {
    return (
        <AuthTextInputContainer>
            <AuthText>{text}</AuthText>
            <AuthTextInput 
            placeholder={placeholder}
            secureTextEntry
            onChangeText={onChangeText}
            value={value}
            onBlur={onBlur}
            />
        </AuthTextInputContainer>
    );
}

export default EctInput;



const AuthTextInputContainer = styled.View`
   width: 350px;
    height: 70px;
    background-color: ${COLORS.box};
    border-radius: 15px;
    margin-bottom: 13px;
    padding:${Platform.OS === 'ios' ? '20px 20px 0px 20px;' : '25px 20px 0 20px'};
    color: ${COLORS.white};
    ${props => props.isPasswordInput && `
   
    `}
`;

const AuthText = styled.Text`
    position: absolute;
    top: 15px;
    left: ${Platform.OS === 'ios' ? '20px' : '25px'};
    color: ${COLORS.white};
    font-size: 12px;
    font-weight: 500;
    
`;

const AuthTextInput = styled(TextInput).attrs(() => ({
    placeholderTextColor: COLORS.gray_300,
}))`
    flex: 1;
    color: ${COLORS.white};
    font-size: 14px;
    font-weight: 500;
    line-height: 22.40px;
`;

