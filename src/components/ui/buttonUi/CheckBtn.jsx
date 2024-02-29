import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import FastImage from 'react-native-fast-image';



function CheckBtn({ onPress, allCheck}) {

    console.log('allCheck',allCheck, 'onPress',onPress)
    const unActiveCheck = require('../../../assets/img/unactivecheck.png');
    const activeCheck = require('../../../assets/img/activecheck.png');

    return (
        <StyledPressable 
        onPress={onPress}
        allCheck={allCheck}>
            <StyledText
             allCheck={allCheck}
            >약관 전체동의</StyledText>
            <FastImage
                source={allCheck ? activeCheck : unActiveCheck}
                style={{ width: 18, height: 18 }}
                resizeMode={FastImage.resizeMode.contain}/> 
        </StyledPressable>
    );
}


export default CheckBtn;

const StyledPressable = styled.TouchableOpacity`
    width: 100%;
    height: 60px;
    border-radius: 13px;
    padding: 0 20px;
    
    background-color: ${({ allCheck }) => allCheck ? COLORS.main : COLORS.box};
    margin-top: 29px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;



const StyledText = styled.Text`
    color: ${({ allCheck }) => allCheck ? COLORS.sub : COLORS.gray_300};
    font-size: 16px;
font-weight: 600;
line-height: 22.40px;
`
