import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import {formatPhoneNumber} from '../../utils/CustomUtils';
import FastImage from 'react-native-fast-image'
function MySettingHeaderGrid({onPress,goEditMyProfileScreen,myInfo}) {

    const {name, phone} = myInfo;
    const rightIcon = require('../../assets/img/rightIcon.png');

    return (
      <>
            <UserHeaderContainer>
                <UserHeaderLeftContainer onPress={goEditMyProfileScreen}>
                <MyNameText>{name}님</MyNameText>
                <RigthIcon 
                resizeMode={FastImage.resizeMode.contain}
                source={rightIcon}/>
                </UserHeaderLeftContainer>

                <SettingContainerBtn onPress={onPress}>
                <SettingText>앱 설정</SettingText>
                </SettingContainerBtn>
            </UserHeaderContainer>
            
            <UserPhoneNumberText>{formatPhoneNumber(phone)}</UserPhoneNumberText>
      </>
    );
}

export default MySettingHeaderGrid;



const UserHeaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const UserHeaderLeftContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
background-color: ${COLORS.sub};
`


const RigthIcon = styled(FastImage)`
    width: 20px;
    height: 20px;
    margin-left: 8px;
`

const MyNameText = styled.Text`
    font-size: 20px;
color: ${COLORS.white};
font-weight: 700;
line-height: 30px;
`

const UserPhoneNumberText = styled.Text`
    font-size: 16px;
font-weight: 400;
line-height: 22.40px;
color: ${COLORS.gray_300};
`

const MyNameBtn = styled.TouchableOpacity``


const SettingContainerBtn = styled.TouchableOpacity`
    width: 26%;
    height: 30px;
    background-color: ${COLORS.box};
    justify-content: center;
    align-items: center;
    border-radius: 60px;
`

const SettingText = styled.Text`
    padding: 4px 15px;
    font-size: 14px;
    color: ${COLORS.white};
    font-weight: 500;
    line-height: 22.40px;
`