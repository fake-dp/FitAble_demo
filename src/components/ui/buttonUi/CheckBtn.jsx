import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import CheckBox from '@react-native-community/checkbox';
import { Text, StyleSheet, View} from 'react-native';
import { useState } from 'react';


function CheckBtn({ onPress, allCheck}) {

    console.log('allCheck',allCheck, 'onPress',onPress)

    return (
        <StyledPressable>
            <StyledText>약관 전체동의</StyledText>
            <CheckBoxStyle
               value={allCheck}
               onValueChange={onPress}
               tintColors={{ true: COLORS.main, false: COLORS.main }}
        
               onCheckColor={COLORS.main}
               onFillColor={COLORS.box}
               onTintColor={COLORS.box}
               boxType={'square'}
               tintColor={COLORS.main}
            />
        </StyledPressable>
    );
}

export default CheckBtn;

const StyledPressable = styled.Pressable`
    background-color: #000;
    width: 100%;
    height: 60px;
    border-radius: 13px;
    padding: 0 20px;
    background-color: ${COLORS.box};
    
    /* background-color: ${({ allCheck }) => allCheck ? COLORS.box : COLORS.main}; */
    margin-top: 29px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const StyledText = styled.Text`
    color: ${COLORS.gray_300};
    font-size: 16px;
font-weight: 600;
line-height: 22.40px;
`

const CheckBoxStyle = styled(CheckBox)`
background-color: ${COLORS.box};
width: 25px;
height: 25px;
`;
