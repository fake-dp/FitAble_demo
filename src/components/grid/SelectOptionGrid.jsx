import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { ScrollView } from 'react-native';
import {formatCommaNumber} from '../../utils/CustomUtils';

function SelectOptionGrid({ optionData, selectedOption, onSelectOption }) {
  console.log('optionData', optionData);

  const lockers = require('../../assets/img/option_lockers.png');
  const optiont = require('../../assets/img/option_t.png');
  const optionnone = require('../../assets/img/option_none.png');


  const noneOptoion = {
    id: 'none',
    type: 'NONE',
    lockerName: '사용 안 함',
  };
  
  const updateOptionData = [noneOptoion,...optionData ??[]];


  return (
    <Container>
  
      <MainTitleText>옵션 선택</MainTitleText>
                  <OptionContainer>
                    <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
        {updateOptionData?.map((item) => (
               
          <OptionBox
            key={item.id}
            selected={selectedOption.includes(item.id)}
            onPress={() => onSelectOption(item.id)}
          >
            <OptionImg 
             tintColor={
              selectedOption.length === 0 && item.id === 'none' ? COLORS.main :
              selectedOption.includes(item.id) ? COLORS.main : COLORS.gray_400
            }
             source={
              item.type === 'RENTAL_LOCKER' ? lockers :
              item.type === 'RENTAL_SPORTSWEAR_PERIOD' ? optiont :
              item.type === 'RENTAL_SPORTSWEAR_TIME' ? optiont:optionnone
              } />
            <OptionText selected={selectedOption.includes(item.id)}>
            {item.type === 'NONE' ? '사용 안 함' : 
             item.type === 'RENTAL_LOCKER' ? item.lockerName :
             '운동복'
            }
              </OptionText>
            {item.price && (
              <OptionPriceText selected={selectedOption.includes(item.id)}>
                {item.cycle} {formatCommaNumber(item.price)}원
              </OptionPriceText>
            )}
          </OptionBox>
        ))}
        </ScrollView>
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
  width: 112px;
  height: 126px;
  border-radius: 15px;
  background-color: ${({ selected }) =>
    selected ? COLORS.box : COLORS.box_two};
  margin-bottom: 20px;
  align-items: center;
  padding: 20px 0;
  margin-right: 7px;
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
