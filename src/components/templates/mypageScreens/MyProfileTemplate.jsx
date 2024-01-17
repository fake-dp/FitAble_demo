import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import GobackBlackGrid from '../../grid/GobackBlackGrid';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'

function MyProfileTemplate(props) {
    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
    }

    const rightIcon = require('../../../assets/img/rightIcon.png');

    
    const goChangePassword = () => {
        navigation.navigate('ChangePassword');
    }

    const goChangePhoneNumber = () => {
        navigation.navigate('ChangePhoneNumber');
    }


    return (
        <Container>
            <GobackBlackGrid
            onPress={goBack}
            >프로필 수정</GobackBlackGrid>
            
            {/* <ProfileContainer>
                <Titletext>새로운 비밀번호 입력</Titletext>
                <InputContainer 
                placeholder="새로운 비밀번호를 입력해주세요."
                placeholderTextColor={COLORS.gray_300}
                style={{paddingLeft: 16, fontSize: 14,}}
                />

                <Titletext>새로운 비밀번호 입력 확인</Titletext>
                <InputContainer 
                placeholder="새로운 비밀번호를 입력해주세요."
                placeholderTextColor={COLORS.gray_300}
                style={{paddingLeft: 16, fontSize: 14,}}
                />
            </ProfileContainer>
            
            <TextContainer>
                <TextContainerBtn>
                <ChangeText>휴대폰번호 변경</ChangeText>
                </TextContainerBtn>

                <TextContainerBtn>
                <PassText>pass로 이동</PassText>
                </TextContainerBtn>
            </TextContainer> */}

        <ProfileContainer>
         <ProfileListContainer onPress={goChangePassword}>
                    <ProfileListText>비밀번호 변경</ProfileListText>
                    <ProfileListRightIcon source={rightIcon}/>
            </ProfileListContainer>

                <ProfileListContainer onPress={goChangePhoneNumber}>
                    <ProfileListText>휴대폰번호 변경</ProfileListText>
                    <ProfileListRightIcon source={rightIcon}/>
        </ProfileListContainer>
        </ProfileContainer>

        </Container>
    );
}

export default MyProfileTemplate;

const Container = styled.View`
    flex:1;
    padding: 0 20px;
    background-color: ${COLORS.white};
`
const ProfileContainer = styled.View`
    /* margin-top: 68px; */
    margin-top: 38px;
`

const Titletext = styled.Text`
font-size: 14px;
color: ${COLORS.gray_400};
font-weight: 400;
line-height: 22.40px;
`

const InputContainer = styled.TextInput`
     width: 100%;
    border: 1px solid ${COLORS.gray_300};
    border-radius: 13px;
    margin-top: 10px;
    margin-bottom: 16px;
    height: 50px;
    /* color: ${COLORS.gray_400}; */
`


const TextContainer = styled.View`
    margin-top: 14px;
    flex-direction: row;
`

const TextContainerBtn = styled.TouchableOpacity``

const ChangeText = styled.Text`
    color: ${COLORS.gray_400};
font-size: 14px;
font-weight: 400;
text-decoration: underline;
line-height: 22.40px;
`

const PassText = styled.Text`
color: #FF0000;
font-size: 14px;
font-weight: 700;
line-height: 22.40px;
margin-left: 7px;
`

const ProfileListContainer = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    /* padding: 30px 0; */
    margin-bottom: 30px;
`
    
const ProfileListText = styled.Text`
font-size: 16px;
color: ${COLORS.sub};
font-weight: 500;
line-height: 22.40px;
`
const ProfileListRightIcon = styled(FastImage)`
    width: 20px;
    height: 20px;
`



