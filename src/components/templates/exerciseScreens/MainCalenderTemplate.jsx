import React from 'react';
import CustomCalendar from '../../ui/custom/CustomCalendar';
import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
function MainCalenderTemplate(props) {

    const downIcon = require('../../../assets/img/whitedownex.png');

    return (
        <Container>
             <TitleContainer>
                   <TitleText>에이블짐 노원본점</TitleText>
                   <DownIcon source={downIcon}/>
             </TitleContainer>
       <CustomCalendar />
        </Container>
    );
}

export default MainCalenderTemplate;


const Container = styled.View`
    flex:1;
    background-color: ${COLORS.sub};
    /* padding: 0 20px; */
`

const TitleContainer = styled.View`
    padding: 0 20px;
    margin-bottom: 42px;
    flex-direction: row;
    align-items: center;
`
    

const TitleText = styled.Text`
color: ${COLORS.white};
font-size: 20px;
font-weight: 600;
line-height: 28px;
`

const DownIcon = styled.Image`
margin-left: 8px;
`