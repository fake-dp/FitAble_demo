import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import {Image } from 'react-native';

function GobackGrid({children, onPress}) {
    
const backArrow = require('../../assets/img/back_arrow.png');
    return (
        <GobackTouchable onPress={onPress}>
            <Image source={backArrow}/>
            <TitleText>{children}</TitleText>
        </GobackTouchable>
    );
}

export default GobackGrid;

const GobackTouchable = styled.TouchableOpacity`
flex-direction: row;
align-items: center;
`;

const TitleText = styled.Text`
color: ${COLORS.white};
font-size: 20px;
font-weight: 600;
margin-left: 12px;
`
