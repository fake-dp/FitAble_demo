import styled from 'styled-components/native';
import { COLORS } from "../../../constants/color";

function MyBtn({children, onPress}) {

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

export default MyBtn;

const Container = styled.View`
    /* padding: 0 20px; */
    justify-content: center;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
    width: 100%;
    `


const StyledPressable = styled.Pressable`
    width: 100%;
    height: 60px;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
    background-color:${COLORS.sub};
    margin-top: 49px;
    margin-bottom: 23px;
    
`

const StyledText = styled.Text`
     color: ${ COLORS.white };
    font-size: 16px;
    font-weight: 600;
`
