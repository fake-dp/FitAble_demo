import {styled} from 'styled-components/native';
import {COLORS} from '../../../constants/color';
import FastImage from 'react-native-fast-image';
import CheckBox from '@react-native-community/checkbox';

export const Container = styled.View`
  flex: 1;

  background-color: ${COLORS.white};

  /* align-items: center;
  justify-content: center; */
`;

export const Body = styled.ScrollView`
  flex: 2;
  padding: 28px 15px;
`;

export const Header = styled.View`
  /* flex: 1; */
  /* height: 100%; */
  padding: 0 20px;
  margin-bottom: 10px;
  background-color: ${COLORS.white};
`;
export const TitleText = styled.Text`
  color: #000;
  margin-bottom: 6px;
  /* H5 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;

  /* color: ${COLORS.white}; */
`;

export const SelectedImage = styled.Image`
  width: 80px;
  height: 80px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
`;
export const CustomImage = styled(FastImage)`
  /* margin-left: 16px; */
  width: 24px;
  height: 24px;
`;

export const QuantityButton = styled.TouchableOpacity`
  width: 19.5px;
  fill: var(--gray-4, #707070);
  height: 19.5px;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
`;

export const QuantityText = styled.Text`
  color: #000;
  text-align: center;
  margin: 0 20px;

  /* H5 */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: -0.5px;
`;

export const OrderButton = styled.TouchableOpacity`
  width: 90%;
  height: 60px;
  flex-shrink: 0;
  margin: 30px 0;
  border-radius: 90px;
  background-color: ${COLORS.sub};
  align-items: center;
  justify-content: center;
`;

export const OrderButtonText = styled.Text`
  color: ${COLORS.white};

  /* button 1 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  /* line-height: normal; */
  letter-spacing: -0.4px;
`;
export const Line = styled.View`
  width: 100%;
  height: 1px;
  background: #eee;
  margin: 28px 0;
`;

export const CheckBoxStyle = styled(CheckBox)`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

export const PriceInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const PriceInfoText = styled.Text`
  color: ${COLORS.gray_400};

  /* H1 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  letter-spacing: -0.4px;
`;

export const PriceArea = styled.View`
  width: 80%;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 0 30px 15%;
`;

export const ItemText = styled.Text`
  color: ${COLORS.gray_400};

  /* body */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;

  letter-spacing: -0.35px;
`;

export const ItemCartArea = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 15px 30px 20px;
`;

export const ItemInfoArea = styled.View`
  width: 60%;
`;
