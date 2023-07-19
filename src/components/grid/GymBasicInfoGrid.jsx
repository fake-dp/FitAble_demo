import {Image ,View, Text, ScrollView} from 'react-native';
import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import ConsultBtn from '../ui/buttonUi/ConsultBtn';

function GymBasicInfoGrid({onPress}) {

    const phoneIcon = require('../../assets/img/phone.png');
    const mapIcon = require('../../assets/img/map.png');

    return (
        <Container>
            <MainTitleText>에이블짐 노원본점</MainTitleText>
            <SubTextContainer>
                <Image source={phoneIcon}/>
                <SubText>서울 노원구 상계로 77 다나프라자 B1F</SubText>
            </SubTextContainer>
            <SubTextContainer>
                <Image source={mapIcon}/>
                <SubText>0507-1342-0491</SubText>
            </SubTextContainer>

            <ConsultBtn 
            onPress={onPress}
            />
        </Container>
    );
}

export default GymBasicInfoGrid;

const Container = styled.View`
    /* background-color: ${COLORS.main}; */
    padding: 0px 20px 0px 20px;
    margin-top: 35px;

`

const MainTitleText = styled.Text`
    color: ${COLORS.white};
    font-size: 24px;
    font-weight: 700;
    line-height: 32.40px;
    margin-bottom: 12px;
`

const SubTextContainer = styled.View`
    flex-direction: row;
    align-items: center;
`

const SubText = styled.Text`
    font-size: 14px;
    font-weight: 400;
    line-height: 22.40px;
    color: ${COLORS.gray_100};
    margin-left: 8px;
`