import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import FastImage from 'react-native-fast-image'
function GobackBlackGrid({children, onPress}) {
    
const backArrow = require('../../assets/img/back_black.png');
    return (
        <GobackTouchable onPress={onPress}>
            <FastImage
             source={backArrow}
             style={{ width: 20, height: 20 }} 
             resizeMode={FastImage.resizeMode.contain}
             />
            <TitleText>{children}</TitleText>
        </GobackTouchable>
    );
}

export default GobackBlackGrid;

const GobackTouchable = styled.TouchableOpacity`
flex-direction: row;
align-items: center;
`;

const TitleText = styled.Text`
color: ${COLORS.sub};
font-size: 20px;
font-weight: 600;
margin-left: 12px;
`
