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
  /* flex: 1; */
  /* height: 100%; */
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 10px;
  background-color: ${COLORS.white};
`;

export const Body = styled.View`
  /* flex: 1; */

  background-color: ${COLORS.white};
  padding: 20px;
  /* align-items: center;
  justify-content: center; */
`;

export const Line = styled.View`
  width: 100%;
  height: 1px;
  background: #eee;
  margin: 28px 0;
`;
export const ItemDetail = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
  color: var(--sub, #b5b5b5);
`;

export const Button = styled.TouchableOpacity`
  width: 350px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 90px;
  background-color: #1f1f1f;

  justify-content: center;
  align-items: center;

  /* background: var(--sub, #1f1f1f); */
`;

export const InfoTitleText = styled.Text`
  color: #000;
  margin-bottom: 6px;
  /* H5 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;

  /* color: ${COLORS.white}; */
`;

export const InfoText = styled.Text`
  color: #000;
  margin-bottom: 6px;
  /* H5 */
  font-family: Pretendard;
  font-size: 20px;
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
  width: 100%;

  height: 100%;
`;

export const Bottom = styled.View`
  margin: 30px 20px 47px 20px;
  justify-content: center;
  align-items: center;
`;
export const MainImageArea = styled.View`
  flex: 1;
  background-color: #f6f6f5;
  justify-content: center;
  align-items: center;
  /* height: fit-content; */

  width: 100%;
  margin-bottom: 28px;
`;
