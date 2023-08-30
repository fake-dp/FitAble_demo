import styled from 'styled-components/native';
import { COLORS } from "../../../constants/color";

function ConsultBigBtn({children, onPress , isActived}) {
    const handlePress = () => {
        console.log('MainBtn pressed');
        onPress();
    }
    
    return (
    <Container>
        <StyledPressable onPress={handlePress} isActived={isActived} disabled={!isActived}>
           <StyledText>{children}</StyledText>
        </StyledPressable>
    </Container>
    );
}
export default ConsultBigBtn;



const Container = styled.View`
    /* padding: 0 20px; */
    margin-bottom: 10px;
`

const StyledPressable = styled.Pressable`
    width: 100%;
    height: 60px;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
    background-color: ${ props => props.isActived ? COLORS.main : COLORS.gray_500 };
    margin-top: 49px;
    margin-bottom: 23px;
`

const StyledText = styled.Text`
    color:${props => props.isActived ? COLORS.white : COLORS.sub};
`
