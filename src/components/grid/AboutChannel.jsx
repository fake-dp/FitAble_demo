import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';

function AboutChannel(props) {

    const blog = require('../../assets/img/blog.png');
    const homepage = require('../../assets/img/homepage.png');
    const instar = require('../../assets/img/instar.png');
    const kakao = require('../../assets/img/kakao.png');


    return (
        <Container>
            <ContainerLine/>
            <MainTitleText>바로가기</MainTitleText>
            <AboutChannelContainer>
                
                <AboutContainer>
                <AboutChannelImg source={blog}/>
                <AboutText>홈페이지</AboutText>
                </AboutContainer>

                <AboutContainer>
                <AboutChannelImg source={homepage}/>
                <AboutText>인스타그램</AboutText>
                </AboutContainer>

                <AboutContainer>
                <AboutChannelImg source={instar}/>
                <AboutText>블로그</AboutText>
                </AboutContainer>

                <AboutContainer>
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
 margin-top: 35px;
`

const ContainerLine = styled.View`
     border-top-width: 1px;
    border-top-color: ${COLORS.white};
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

const AboutContainer = styled.View`
align-items: center;
justify-content: center;
margin-right: 16px;
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