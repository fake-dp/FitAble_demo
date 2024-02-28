import styled from 'styled-components/native';
import { COLORS } from "../../../constants/color";

function ActiveMainBtn({children, onPress ,btnName}) {

    const handlePress = () => {
        console.log('MainBtn pressed');
        onPress();
    }

    console.log('btnName',btnName)
    
    return (
        <Container>
            <StyledPressable onPress={handlePress} btnName={btnName}>
              <StyledText>{children}</StyledText>
            </StyledPressable>
        </Container>
    );
}

export default ActiveMainBtn;

const Container = styled.View`
    /* padding: 0 20px; */
    justify-content: center;
    align-items: center;
`


const StyledPressable = styled.Pressable`
    width: 90%;
    height: 60px;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
    background-color:${COLORS.main};
    /* margin-top: 49px; */
    margin-top: ${props => props.btnName ? '0px' : '49px'};
    margin-bottom: 23px;
`

const StyledText = styled.Text`
    font-size: 16px;
    font-weight: 600;
     color: ${ COLORS.sub }
`
