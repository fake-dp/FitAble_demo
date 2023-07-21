import React, { useState } from 'react';
import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';

function ThreeBtnGrid(props) {
  const { onPressSubscribe, onPressPT, onPressUse } = props;
  const [activeButton, setActiveButton] = useState('');

  const handleButtonPress = (name) => {
    setActiveButton(name);
  };

  return (
    <Container>
      <ContainerLine />
      <ThreeBtnContainer>
        <ThreeBtn
          active={activeButton === 'Subscribe'}
          onPress={() => {
            handleButtonPress('Subscribe');
            onPressSubscribe();
          }}
        >
          <ThreeBtnText active={activeButton === 'Subscribe'}>구독</ThreeBtnText>
        </ThreeBtn>
        <ThreeBtn
          active={activeButton === 'PT'}
          onPress={() => {
            handleButtonPress('PT');
            onPressPT();
          }}
        >
          <ThreeBtnText active={activeButton === 'PT'}>P.T</ThreeBtnText>
        </ThreeBtn>
        <ThreeBtn
          active={activeButton === 'Use'}
          onPress={() => {
            handleButtonPress('Use');
            onPressUse();
          }}
        >
          <ThreeBtnText active={activeButton === 'Use'}>이용</ThreeBtnText>
        </ThreeBtn>
      </ThreeBtnContainer>
    </Container>
  );
}

export default ThreeBtnGrid;

const Container = styled.View`
  padding: 0 20px;
  margin-top: 35px;
`;

const ContainerLine = styled.View`
  border-top-width: 1px;
  border-top-color: ${COLORS.white};
  padding: 0 20px;
`;

const ThreeBtnContainer = styled.View`
  margin-top: 30px;
  flex-direction: row;
`;

const ThreeBtn = styled.TouchableOpacity`
  margin-right: 8px;
  border: 1px solid ${(props) =>
    props.active ? COLORS.sub : COLORS.gray_300};
  border-radius: 100px;
  width: 70px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.active ? COLORS.white : 'transparent')};
`;

const ThreeBtnText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  line-height: 22.40px;
  color: ${(props) => (props.active ? COLORS.sub : COLORS.gray_300)};
`;
