// UI-loinput
import styled from 'styled-components/native';
import { COLORS } from "../../../constants/color";


function AuthInput({children}) {
    return (
            <AuthTextInput
                placeholder={children}
            />
    );
}

export default AuthInput;

const AuthTextInput = styled.TextInput`
    width: 350px;
    height: 60px;
    background-color: ${COLORS.box};
    border-radius: 15px;
    margin-bottom: 8px;
    padding: 0 20px;
    color: ${COLORS.white};

`