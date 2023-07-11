// UI-loinput
import { View,Text,TextInput } from "react-native";
import styled from 'styled-components/native';
import { COLORS } from "../../../constants/color";
const AuthTextInput = styled.TextInput`
    width: 350px;
    height: 60px;
    background-color: ${COLORS.box};
    border-radius: 15px;
    margin-bottom: 8px;
    padding: 0 20px;
    color: ${COLORS.white};

`

function AuthInput({children}) {
    return (
        <View>
            <AuthTextInput
                placeholder={children}
            />
        </View>
    );
}

export default AuthInput;