import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import CheckBox from '@react-native-community/checkbox';



function CheckBtn({ onPress, allCheck}) {

    console.log('allCheck',allCheck, 'onPress',onPress)

    return (
        <StyledPressable allCheck={allCheck}>
            <StyledText
             allCheck={allCheck}
            >약관 전체동의</StyledText>
            <CheckBoxStyle
               value={allCheck}
               onValueChange={onPress}
               on={true}
               enabled={true}
               tintColors={{ true: COLORS.main, false: COLORS.main }}
            //    offAnimationType={'none'}
            //    animateTransitions={false}

            // animationDuration={5}
            // onAnimationType={'none'}
            //    onCheckColor={COLORS.main}
            //    onFillColor={COLORS.box}
            //    onTintColor={COLORS.box}
            //    boxType={'square'}
            //    tintColor={COLORS.main}
            //    hideBox={true}
            animated={false}
               onAnimationDidStop={() => console.log('onAnimationDidStop')}
               lineWidth={2}
               hideBox={
                allCheck ? false : true
               }
               boxType={'square'}
               tintColor={COLORS.main}
               onCheckColor={COLORS.sub}
               onFillColor={COLORS.box}
               onTintColor={COLORS.box}
            //    animationDuration={0.5}
            //    onAnimationType={'bounce'}
            //    offAnimationType={'bounce'}
            />
        </StyledPressable>
    );
}


export default CheckBtn;

const StyledPressable = styled.View`
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

const CheckBoxStyle = styled(CheckBox)`
width: 25px;
height: 25px;

`;
