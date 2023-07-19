import {Image ,View, Text, ScrollView} from 'react-native';
import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';

function OperatingTime(props) {
    return (
        <Container>
            <ContainerLine />
            <MainTitleText>운영 프로그램</MainTitleText>
            <TextContainer>
                <DateText>평일</DateText>
                <DateText>오전 10시 ~ 오후 10시</DateText>
            </TextContainer>
            <TextContainer>
                <DateText>주말</DateText>
                <DateText>오전 10시 ~ 오후 6시</DateText>
            </TextContainer>
            <TextContainer>
                <DateText>휴관일</DateText>
                <DateText>일요일 및 공휴일</DateText>
            </TextContainer>
        </Container>
    );
}

export default OperatingTime;


const Container = styled.View`
 padding: 0 20px;
 margin-top: 35px;
`

const ContainerLine = styled.View`
     border-top-width: 1px;
    border-top-color: ${COLORS.white};
    padding: 0 20px;
`

const TextContainer = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
`

const MainTitleText = styled.Text`
margin-top: 40px;
font-size: 20px;
font-weight: 700;
line-height: 30px;
color: ${COLORS.white};
`

const DateText = styled.Text`
font-size: 16px;
font-weight: 400;
line-height: 22.40px;
color: ${COLORS.gray_200};
margin-top: 10px;
`

