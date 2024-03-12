import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { Linking, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
function AboutChannel(props) {

    const navigation = useNavigation();
    const blog = require('../../assets/img/blog.png');
    const homepage = require('../../assets/img/homepage.png');
    const instar = require('../../assets/img/instar.png');
    const kakao = require('../../assets/img/kakao.png');

    const handleLinkPress = (url) => {
        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            Linking.openURL(url);
          } else {
            console.log("Don't know how to open URI123: " + url);
          }
        });
      };
      
      const handleAndroidLink = (url) => {
        console.log('url',url)
        navigation.navigate('BannerWebView', {uri: url})
    }

const isAndroidLink = Platform.OS === 'android' ? handleAndroidLink : handleLinkPress;

    return (
        <Container>
            <MainTitleText>바로가기</MainTitleText>
            <AboutChannelContainer>
                
                <AboutContainer onPress={()=> isAndroidLink(props.homepage)}>
                <AboutChannelImg source={homepage}  resizeMode={FastImage.resizeMode.contain} />
                <AboutText>홈페이지</AboutText>
                </AboutContainer>

                <AboutContainer onPress={()=> isAndroidLink(props.instagram)}>
                <AboutChannelImg source={instar}  resizeMode={FastImage.resizeMode.contain} />
                <AboutText>인스타그램</AboutText>
                </AboutContainer>

                <AboutContainer onPress={()=> isAndroidLink(props.blog)}>
                <AboutChannelImg source={blog}  resizeMode={FastImage.resizeMode.contain} />
                <AboutText>블로그</AboutText>
                </AboutContainer>

                <AboutContainer onPress={()=> isAndroidLink(props.kakao)}>
                <AboutChannelImg source={kakao}  resizeMode={FastImage.resizeMode.contain} />
                <AboutText>카카오채널</AboutText>
                </AboutContainer>
            </AboutChannelContainer>
        </Container>
    );
}

export default AboutChannel;

const Container = styled.View`
 padding: 0 20px;
`

const MainTitleText = styled.Text`
margin-top: 40px;
font-size: 20px;
font-weight: 700;
line-height: 30px;
color: ${COLORS.white};
`

const AboutChannelContainer = styled.View`
flex-direction: row;
margin-top: 20px;
`

const AboutContainer = styled.TouchableOpacity`
align-items: center;
justify-content: center;
margin-right: 7px;
`

const AboutText = styled.Text`
font-size: 14px;
font-weight: 400;
line-height: 22.40px;
color: ${COLORS.gray_200};
margin-top: 3px;
`

const AboutChannelImg = styled(FastImage)`
width: 50px;
height: 50px;
`