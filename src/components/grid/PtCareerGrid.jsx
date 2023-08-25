import {Image ,View, Text, ScrollView} from 'react-native';
import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';

function PtCareerGrid({detailTrainersData}) {

    const {career, qualifications} = detailTrainersData;

    return (
        <Container>
            <ContainerLine />
            <MainTitleText>자격 및 경력사항</MainTitleText>
            <SubText>경력사항</SubText>
            <SubTextm>{career}</SubTextm>

            <SubText>자격사항</SubText>
            <SubText>{qualifications}</SubText>
        </Container>
    );
}

export default PtCareerGrid;

const ContainerLine = styled.View`
     border-top-width: 1px;
    border-top-color: ${COLORS.gray_500};
    padding: 0 20px;
    margin-top: 35px;
`;

const Container = styled.View`
    /* background-color: ${COLORS.main}; */
    padding: 0px 20px 0px 20px;
    margin-top: 5px;
    margin-bottom: 40px;
`;

const MainTitleText = styled.Text`
    color: ${COLORS.white};
    font-size: 24px;
    font-weight: 700;
    line-height: 32.40px;
    margin-top: 40px;
    margin-bottom: 12px;
`;

const SubText = styled.Text`
    font-size: 14px;
    font-weight: 400;
    line-height: 22.40px;
    color: ${COLORS.gray_100};

`;

const SubTextm = styled.Text`
font-size: 14px;
    font-weight: 400;
    line-height: 22.40px;
    color: ${COLORS.gray_100};
    margin-bottom: 40px;
`