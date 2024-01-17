import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import FastImage from 'react-native-fast-image'

function GobackGrid({children, onPress}) {
    
const backArrow = require('../../assets/img/back_arrow.png');
    return (
        <GobackTouchable onPress={onPress}>
            <FastImage 
            source={backArrow}
            style={{ width: 30, height: 28 }} 
            resizeMode={FastImage.resizeMode.contain}
            />
            <TitleText>{children}</TitleText>
        </GobackTouchable>
    );
}

export default GobackGrid;

const GobackTouchable = styled.TouchableOpacity`
flex-direction: row;
align-items: center;
margin-bottom: 10px;
`;

const TitleText = styled.Text`
color: ${COLORS.white};
font-size: 20px;
font-weight: 600;
margin-left: 12px;
`
