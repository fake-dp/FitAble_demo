import styled from 'styled-components/native';
import { COLORS } from "../../../constants/color";

function ActiveMainBtn({children, onPress}) {

    const handlePress = () => {
        console.log('MainBtn pressed');
        onPress();
    }
    
    return (
        <Container>
            <StyledPressable onPress={handlePress}>
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
    width: 350px;
    height: 60px;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
    background-color:${COLORS.main};
    margin-top: 49px;
    margin-bottom: 23px;
`

const StyledText = styled.Text`
     color: ${ COLORS.sub }
`
