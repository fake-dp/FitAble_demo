import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { Linking } from 'react-native';

function AboutChannel(props) {

    const blog = require('../../assets/img/blog.png');
    const homepage = require('../../assets/img/homepage.png');
    const instar = require('../../assets/img/instar.png');
    const kakao = require('../../assets/img/kakao.png');

    const handleLinkPress = (url) => {
        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            Linking.openURL(url);
          } else {
            console.log("Don't know how to open URI: " + url);
          }
        });
      };

    return (
        <Container>
            <MainTitleText>바로가기</MainTitleText>
            <AboutChannelContainer>
                
                <AboutContainer onPress={()=> handleLinkPress(props.homepage)}>
                <AboutChannelImg source={homepage}/>
                <AboutText>홈페이지</AboutText>
                </AboutContainer>

                <AboutContainer onPress={()=> handleLinkPress(props.instagram)}>
                <AboutChannelImg source={instar}/>
                <AboutText>인스타그램</AboutText>
                </AboutContainer>

                <AboutContainer onPress={()=> handleLinkPress(props.blog)}>
                <AboutChannelImg source={blog}/>
                <AboutText>블로그</AboutText>
                </AboutContainer>

                <AboutContainer onPress={()=> handleLinkPress(props.kakao)}>
                <AboutChannelImg source={kakao}/>
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

const AboutChannelImg = styled.Image`
width: 50px;
height: 50px;
`