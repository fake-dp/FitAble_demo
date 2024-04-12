import {styled} from 'styled-components/native';
import {COLORS} from '../../../constants/color';
import FastImage from 'react-native-fast-image';
import CheckBox from '@react-native-community/checkbox';
import {TextInput} from 'react-native';

export const Container = styled.View`
  flex: 1;

  background-color: ${COLORS.white};

  /* align-items: center;
  justify-content: center; */
`;

export const AgreeTerms = styled.View`
  flex-direction: row;
  margin-bottom: 24px;
  width: 90%;
  align-items: center;
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
  color: ${COLORS.sub};

  margin-bottom: 10px;

  /* H2 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  /* line-height: 140%; 22.4px */
  letter-spacing: -0.4px;
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

export const DeliveryAddressButton = styled.TouchableOpacity`
  width: 70px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 100px;
  border: 1px solid #000;
  justify-content: center;
  align-items: center;
`;

export const AddressSearchButton = styled.TouchableOpacity`
  margin-left: 10px;
  width: 80px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 15px;
  border: 1px solid #000;
  justify-content: center;
  align-items: center;
`;

export const OrderButton = styled.TouchableOpacity`
  width: 90%;
  height: 60px;
  flex-shrink: 0;
  margin-top: 10px;

  margin-bottom: 50px;
  border-radius: 90px;

  background-color: ${props => (props.allcheck ? COLORS.sub : COLORS.gray_100)};
  align-items: center;
  justify-content: center;
`;

export const OrderButtonText = styled.Text`
  color: ${props => (props.allcheck ? COLORS.white : COLORS.gray_300)};

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
  /* line-height: 140%; */
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
  margin-top: 2px;

  /* body */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  /* line-height: 160%; 22.4px */
  letter-spacing: -0.35px;
`;

export const AddressInput = styled(TextInput)`
  height: 50px;
  padding-left: 15px;
  margin-bottom: 30px;
  border-radius: 13px;
  border: 1px solid ${COLORS.gray_200};
`;

export const MilageInputArea = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50px;
  text-align: right;
  padding-right: 25px;

  margin-bottom: 30px;
  border-radius: 13px;
  border: 1px solid ${COLORS.gray_200};
`;
export const MilageInput = styled(TextInput)`
  width: 100%;
  height: 50px;
  text-align: right;
  padding-right: 5px;

  /* margin-bottom: 30px; */
  /* border-radius: 13px; */
  /* border: 1px solid ${COLORS.gray_200}; */
`;

export const ItemInfo = styled.View`
  width: 60%;
`;

export const AddressInfo = styled.View`
  width: 100%;
`;
