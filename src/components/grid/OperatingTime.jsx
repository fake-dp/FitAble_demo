import {Image ,View, Text, ScrollView} from 'react-native';
import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';

function OperatingTime({operationTimes}) {
    return (
        <Container>
            <MainTitleText>운영 시간</MainTitleText>
            {
                operationTimes.map((item, index) => {
                    return (
                        <TextContainer key={index}>
                            <DateText>{item.time}</DateText>
                            <DateText>{item.description}</DateText>
                        </TextContainer>
                    )})
            }
                <ContainerLine />
        </Container>
    );
}

export default OperatingTime;


const Container = styled.View`
 padding: 0 20px;
 `

const ContainerLine = styled.View`
     border-top-width: 1px;
     border-top-color: ${COLORS.gray_500};
     padding: 0 20px;
     margin-top: 35px;
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

