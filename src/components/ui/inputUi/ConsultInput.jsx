import React from 'react';
import { TextInput } from 'react-native';
import { styled } from 'styled-components';
import { COLORS } from '../../../constants/color';
function ConsultInput(props) {
    return (
        <ConsultTextInputContainer>
        <ConsultInputText 
        {...props}
        />
        </ConsultTextInputContainer>
    );
}

export default ConsultInput;


const ConsultTextInputContainer = styled.View`
     width: 100%;
    background-color: ${COLORS.box};
    border-radius: 10px;
    margin-bottom: 13px;
    padding: 9px 10px;
    /* padding:${Platform.OS === 'ios' ? '20px 20px 0px 20px;' : '25px 20px 0 20px'}; */
    color: ${COLORS.white};
    ${props => props.isPasswordInput && `
   
    `}
`;


const ConsultInputText = styled(TextInput).attrs(() => ({
    placeholderTextColor: COLORS.gray_300,
}))`
    flex: 1;
    color: ${COLORS.white};
    font-size: 14px;
    font-weight: 500;
    line-height: 22.40px;
`;
