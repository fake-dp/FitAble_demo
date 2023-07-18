import {Image } from 'react-native';
import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';

function ScanTemplate(props) {
    return (
        <Container>
            <MainContainer>
            <TitleText>입장하기</TitleText>
            <SubText>입장을 위해 QR코드를 인식해주세요</SubText>
            <Rectangular />
            <SubText>휴대폰을 흔들면 QR코드를 촬영할 수 있어요!</SubText>
            </MainContainer>
            <ImgContainer>
            <Image source={require('../../../assets/img/testimg.png')} />
            </ImgContainer>
        </Container>
    );
}

export default ScanTemplate;


const Container = styled.View`
    flex: 1;
    background-color: ${COLORS.sub};
    align-items: center;
    justify-content: center;
`;

const MainContainer = styled.View`
   margin-bottom: 120px;
    align-items: center;
    justify-content: center;
`

const ImgContainer = styled.View`
    position: absolute;
    bottom: 0;
`

const Rectangular = styled.View`
    width: 200px;
    height: 200px;
    border: 1px solid ${COLORS.white};
    margin-bottom: 26px;
`

const TitleText  = styled.Text`
    font-size: 20px;
font-weight: 700;
line-height: 30px;
color: ${COLORS.white};
`

const SubText = styled.Text`
font-size: 14px;
font-weight: 400;
line-height: 22.40px;
color: ${COLORS.gray_100};
margin-bottom: 26px;
`