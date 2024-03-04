import React from 'react';
import { TextInput } from 'react-native';
import { styled } from 'styled-components';
import { COLORS } from '../../../constants/color';
function ConsultInput(props) {
    return (
        <ConsultTextInputContainer>
        <ConsultInputText 
        style={{marginLeft: 16, fontSize: 14, marginRight: 16, color: COLORS.white, fontWeight: '500'}}
        {...props}
        />
        </ConsultTextInputContainer>
    );
}

export default ConsultInput;


const ConsultTextInputContainer = styled.View`
      margin-top: 20px;
    background-color: ${COLORS.box};
    flex-direction: row;
    border-radius: 13px;
    height: 50px;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
`;


const ConsultInputText = styled(TextInput).attrs(() => ({
    placeholderTextColor: COLORS.gray_300,
}))`
    flex: 1;
    color: ${COLORS.white};
    font-size: 14px;
    font-weight: 500;
    /* line-height: 22.40px; */
`;
