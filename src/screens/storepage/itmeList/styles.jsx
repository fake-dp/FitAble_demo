import {styled} from 'styled-components/native';
import {COLORS} from '../../../constants/color';
import FastImage from 'react-native-fast-image';

export const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
  /* align-items: center;
  justify-content: center; */
`;

export const Header = styled.View`
  padding: 21px 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  resize: both;
`;
export const Body = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  /* flex-wrap: wrap; */
`;

export const Data = styled.TouchableOpacity`
  width: 50%;
  height: 100%;
  margin-bottom: ${props => (props.isLastItem ? '130px' : '20px')};
  padding: 0px 10px;
  padding-top: 20px;
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
  margin-left: 16px;
  width: 24px;
  height: 24px;
`;

export const ItemImage = styled(FastImage)`
  border-radius: 20px;
  background-color: #f6f6f6;
  width: 95%;
  height: 150px;
`;
