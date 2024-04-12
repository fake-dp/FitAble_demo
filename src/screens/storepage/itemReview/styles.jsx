import {styled} from 'styled-components/native';
import {COLORS} from '../../../constants/color';
import FastImage from 'react-native-fast-image';

export const Container = styled.View`
  flex: 1;

  background-color: ${COLORS.white};
  padding: 20px;
  /* align-items: center;
  justify-content: center; */
`;

export const Body = styled.ScrollView`
  /* flex: 1; */

  background-color: ${COLORS.white};
  padding: 20px;
  /* align-items: center;
  justify-content: center; */
`;

export const Header = styled.View`
  /* flex: 1; */
  /* height: 100%; */
  /* padding: 0 20px; */
  margin-bottom: 25px;
  background-color: ${COLORS.white};
`;

export const Line = styled.View`
  width: 100%;
  height: 1px;
  background: #eee;
  margin: 28px 0;
`;
export const AnswerArea = styled.View`
  margin-bottom: 30px;
  padding: 22px 16px 28px 16px;
  border-radius: 15px;
  background-color: #f6f6f6;
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

export const DateText = styled.Text`
  color: ${COLORS.gray_300};

  /* H3 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  /* line-height: 160%; 19.2px */
  letter-spacing: -0.3px;
`;

export const NameText = styled.Text`
  color: ${COLORS.gray_400};

  /* body 2 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  /* line-height: 160%; 22.4px */
  letter-spacing: -0.35px;

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
  height: 1606px;
  /* height: 100%; */
  resize: horizontal;
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

  width: 100vh;
  margin-bottom: 28px;
`;

export const NothingData = styled.View`
  /* flex: 1; */
  height: ${props => props.windowHeight / 1.3}px;

  align-items: center;
  justify-content: center;
`;
