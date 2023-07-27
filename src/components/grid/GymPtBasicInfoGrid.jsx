
import {Image ,View, Text, ScrollView} from 'react-native';
import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';


function GymPtBasicInfoGrid() {

    const spaceIcon = require('../../assets/img/spaceIcon.png');
    const mapIcon = require('../../assets/img/map.png');

    return (
        <Container>
            <MainTitleText>브이 트레이너</MainTitleText>
            <SubTextContainer>
                <Image source={spaceIcon}/>
                <SubText>0507-1342-0491</SubText>
            </SubTextContainer>
            <SubTextContainer>
                <Image source={mapIcon}/>
                <SubText>서울 노원구 상계로 77 다나프라자 B1F</SubText>
            </SubTextContainer>
            <ContainerLine/>
        </Container>
    );
}

export default GymPtBasicInfoGrid;

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

const ContainerLine = styled.View`
     border-top-width: 1px;
    border-top-color: ${COLORS.gray_500};
    padding: 0 20px;
    margin-top: 35px;
`