import {Image ,View, Text, ScrollView} from 'react-native';
import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';


function OperatingProgram(props) {
    return (
        <Container>
            <ContainerLine/>
            <MainTitleText>운영 프로그램</MainTitleText>
            <MainSubText>헬스, 퍼스널트레이닝, 필라테스, 요가</MainSubText>
        </Container>
    );
}

export default OperatingProgram;


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

const MainSubText = styled.Text`
font-size: 16px;
font-weight: 400;
line-height: 22.40px;
color: ${COLORS.gray_200};
margin-top: 4px;
`