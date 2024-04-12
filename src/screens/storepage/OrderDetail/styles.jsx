import {styled} from 'styled-components/native';
import {COLORS} from '../../../constants/color';
import FastImage from 'react-native-fast-image';

export const Container = styled.View`
  /* flex: 1; */
  padding-bottom: 70px;
  background-color: ${COLORS.white};
  /* align-items: center;
  justify-content: center; */
`;
export const Header = styled.View`
  /* flex: 1; */
  /* height: 100%; */
  padding: 0 20px;
  margin-bottom: 10px;
  background-color: ${COLORS.white};
`;
export const Body = styled.ScrollView`
  /* flex: 1; */
  padding: 0 20px 20px 20px;

  background-color: ${COLORS.white};
  /* padding-bottom: 50px; */
  /* align-items: center;
  justify-content: center; */
`;

export const Line = styled.View`
  width: 100%;
  height: 1px;
  background: #eee;
  margin: 28px 0;
`;
export const InfoView = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 14px;
`;

export const Button = styled.TouchableOpacity`
  width: 79px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 100px;
  background: #1f1f1f;
  justify-content: center;
  align-items: center;
  margin-top: 18px;
  margin-bottom: 36px;

  /* background: var(--sub, #1f1f1f); */
`;

export const ButtonText = styled.Text`
  color: ${COLORS.white};

  /* body */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;

  letter-spacing: -0.35px;
`;

export const InfoTitleText = styled.Text`
  color: ${COLORS.sub};
  margin-bottom: 14px;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  /* line-height: 140%; */
  letter-spacing: -0.4px;

  /* color: ${COLORS.white}; */
`;

export const InfoText = styled.Text`
  color: ${COLORS.gray_400};

  /* body 2 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  /* line-height: 160%; */
  letter-spacing: -0.35px;
`;

export const SelectedImage = styled.Image`
  width: 80px;
  height: 80px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
`;
// export const CustomImage = styled(FastImage)`
export const CustomImage = styled.Image`
  margin-right: 12px;
  width: 70px;
  height: 70px;
  /* height: 100%; */
  border-radius: 10px;
  resize: horizontal;
`;

export const NameArea = styled.View`
  width: 85%;
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
