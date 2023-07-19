import {Image ,View, Text, ScrollView} from 'react-native';
import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';

function ThreeBtnGrid(props) {
    const { onPressSubscribe, onPressPT, onPressUse } = props;
    return (
        <Container>
        <ContainerLine />
        <ThreeBtnContainer>
          <ThreeBtn onPress={onPressSubscribe}>
            <ThreeBtnText>구독</ThreeBtnText>
          </ThreeBtn>
          <ThreeBtn onPress={onPressPT}>
            <ThreeBtnText>P.T</ThreeBtnText>
          </ThreeBtn>
          <ThreeBtn onPress={onPressUse}>
            <ThreeBtnText>이용</ThreeBtnText>
          </ThreeBtn>
        </ThreeBtnContainer>
      </Container>
    );
}

export default ThreeBtnGrid;


const Container = styled.View`
 padding: 0 20px;
 margin-top: 35px;
`

const ContainerLine = styled.View`
     border-top-width: 1px;
    border-top-color: ${COLORS.white};
    padding: 0 20px;
`

const ThreeBtnContainer = styled.View`
margin-top: 30px;
flex-direction: row;
`

const ThreeBtn = styled.TouchableOpacity`
margin-right: 8px;
border: 1px solid ${COLORS.gray_300};
border-radius: 100px;
width: 70px;
height: 40px;
justify-content: center;
align-items: center;
`

const ThreeBtnText = styled.Text`
font-size: 16px;
font-weight: 700;
line-height: 22.40px;
color: ${COLORS.gray_300};
`