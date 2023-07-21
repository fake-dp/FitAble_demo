import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';


function SelectOptionGrid({ optionData, selectedOption, onSelectOption }) {
  console.log('optionData', optionData);

  return (
    <Container>
      <MainTitleText>옵션 선택</MainTitleText>
      <OptionContainer>
        {optionData.map((item) => (
          <OptionBox
            key={item.id}
            selected={item.id === selectedOption}
            onPress={() => onSelectOption(item.id)}
          >
            <OptionImg 
             tintColor={item.id === selectedOption ? COLORS.main : COLORS.gray_400}
             source={item.img} />
            <OptionText selected={item.id === selectedOption}>{item.title}</OptionText>
            {item.price && (
              <OptionPriceText selected={item.id === selectedOption}>
                {item.price}원
              </OptionPriceText>
            )}
          </OptionBox>
        ))}
      </OptionContainer>
    </Container>
  );
}

export default SelectOptionGrid;

const Container = styled.View`
  padding: 0 20px;
`;

const MainTitleText = styled.Text`
  margin-top: 40px;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  color: ${COLORS.white};
`;

const OptionContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 12px;
`;

const OptionBox = styled.TouchableOpacity`
  width: 33%;
  height: 126px;
  border-radius: 15px;
  background-color: ${({ selected }) =>
    selected ? COLORS.box : COLORS.box_two};
  margin-bottom: 20px;
  align-items: center;
  padding: 20px 0;
`;

const OptionImg = styled.Image`
  width: 35px;
  height: 32px;
  margin-bottom: 10px;
`;

const OptionText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  line-height: 22.4px;
  color: ${({ selected }) => (selected ? COLORS.white : COLORS.gray_400)};
`;

const OptionPriceText = styled.Text`
  font-size: 14px;
  font-weight: 400;
  line-height: 22.4px;
  color: ${({ selected }) => (selected ? COLORS.white : COLORS.gray_400)};
`;
