import { Image } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import FastImage from 'react-native-fast-image'
function FloatingBtn({ onPress }) {
   const floatingIcon = require('../../../assets/img/floating_plus.png')

    return (
        <FloatingButtonContainer>
      <FloatingButtonTouchable onPress={onPress}>
        <FastImage source={floatingIcon} 
        style={{ width: 24, height: 24 }}
        />
      </FloatingButtonTouchable>
    </FloatingButtonContainer>
    );
}

export default FloatingBtn;



const FloatingButtonContainer = styled.View`
  position: absolute;
  bottom: 40px;
  right: 20px;
  z-index: 5;
`;

const FloatingButtonTouchable = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${COLORS.main};
  justify-content: center;
  align-items: center;
`;
