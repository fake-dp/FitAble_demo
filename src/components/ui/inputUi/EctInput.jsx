
import { COLORS } from "../../../constants/color";
import { styled } from "styled-components/native";


function EctInput(props) {
    return (
        <AuthTextInput />
    );
}

export default EctInput;

const AuthTextInput = styled.TextInput`
    width: 350px;
    height: 70px;
    background-color: ${COLORS.box};
    border-radius: 15px;
    margin-bottom: 13px;
    padding: 0 20px;
    color: ${COLORS.white};

`