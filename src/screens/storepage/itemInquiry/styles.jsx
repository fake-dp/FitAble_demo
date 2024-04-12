import {styled} from 'styled-components/native';
import {COLORS} from '../../../constants/color';
import FastImage from 'react-native-fast-image';

export const Container = styled.View`
  flex: 1;

  background-color: ${COLORS.white};
  padding: 0 20px 20px 20px;

  /* align-items: center;
  justify-content: center; */
`;

export const Header = styled.View`
  /* flex: 1; */
  /* height: 100%; */
  /* padding: 0 20px; */
  margin-bottom: 40px;
  background-color: ${COLORS.white};
`;

export const Body = styled.ScrollView`
  flex: 1;

  /* height: 90%; */
  /* align-items: center;
  justify-content: center; */
`;

export const Line = styled.View`
  width: 100%;
  height: 1px;
  background: #eee;
  margin: 28px 0;
`;
export const InquiryWrite = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
  color: var(--sub, #b5b5b5);
`;
export const InputContainer = styled.TextInput`
  width: 100%;
  height: 250px;

  background-color: ${COLORS.gray_100};
  border-radius: 13px;
  margin-top: 10px;
  margin-bottom: 16px;
  padding-left: 16px;
  padding-top: 16px;

  /* color: ${COLORS.gray_400}; */
`;

export const TapButton = styled.TouchableOpacity`
  display: flex;
  margin-left: 4px;
  padding: 7px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 80px;
  color: ${COLORS.white};
  background-color: #1f1f1f;

  /* background: var(--sub, #1f1f1f); */
`;

export const ImageAddButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 10px;
  margin-right: 10px;
  background-color: #1f1f1f;
  /* background: var(--sub, #1f1f1f); */
  /* margin: 40px 0 28px 0; */
  justify-content: center;
  align-items: center;
`;

export const PlusButtonText = styled.Text`
  color: ${COLORS.main};

  font-size: 35px;
  font-weight: 200;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  flex-shrink: 0;
  border-radius: 90px;
  background-color: #1f1f1f;

  justify-content: center;
  align-items: center;
  margin: 20px 0;

  /* background: var(--sub, #1f1f1f); */
`;

export const ButtonText = styled.Text`
  /* color: ${COLORS.white}; */

  font-size: 13px;
  font-weight: 400;
`;

export const SubmitButtonText = styled.Text`
  color: ${COLORS.white};

  font-size: 16px;
  font-weight: 600;
`;
export const SelectedImage = styled.Image`
  width: 60px;
  height: 60px;
  /* margin-right: 10px; */
  /* margin-bottom: 10px; */
  border-radius: 10px;
`;
export const CustomImage = styled(FastImage)`
  margin-top: 12px;
  /* width: 100%; */
  width: 80px;
  height: 80px;
  background-color: ${COLORS.gray_100};

  /* height: 1606px; */
  /* height: 100%; */
  border-radius: 13px;
  resize: horizontal;
`;

export const Bottom = styled.View`
  margin: 30px 20px 47px 20px;
  justify-content: center;
  align-items: center;
`;
export const Text = styled.Text`
  color: ${COLORS.gray_400};

  /* body 2 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  /* line-height: 160%; 22.4px */
  letter-spacing: -0.35px;
`;

export const TitleText = styled.Text`
  color: ${COLORS.gray_400};

  /* button 1 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  /* line-height: normal; */
  letter-spacing: -0.4px;
`;

export const InquiryText = styled.Text`
  color: ${COLORS.sub};
  width: 80%;
  /* button 1 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  /* line-height: normal; */
  letter-spacing: -0.4px;
`;

export const InquiryInfoText = styled.Text`
  color: ${COLORS.gray_400};

  /* H3 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  /* line-height: 160%; 19.2px */
  letter-spacing: -0.3px;
`;

export const NothingData = styled.View`
  width: 100%;
  height: ${props => props.windowHeight / 2}px;

  align-items: center;
  justify-content: center;
`;

export const ImgContainer = styled.View`
  /* margin-top: 10px; */
  /* margin-left: 10px; */
  justify-content: center;

  flex-direction: row;
  flex-wrap: wrap;
  /* flex:1; */
`;

export const CloseBtnContainer = styled.TouchableOpacity`
  position: absolute;
  top: 80px;
  right: 30px;
  z-index: 10;
`;

export const CloseBtnText = styled.Text`
  color: ${COLORS.white};
  font-size: 20px;
`;
export const ImageStyle = styled.Image`
  width: 11px;
  height: 11px;
  position: absolute;
  margin: 6px 0px 0 40px;

  /* justify-content: flex-end; */
  /* align-items: center; */
`;
