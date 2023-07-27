import {Image ,View, Text, ScrollView} from 'react-native';
import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';

function PtCareerGrid(props) {
    return (
        <Container>
            <ContainerLine />
            <MainTitleText>자격 및 경력사항</MainTitleText>
            <SubText>경력사항</SubText>
            <SubText>전) 워라벨 피트니스 트레이너</SubText>
            <SubText>전) 예스짐 피트니스 트레이너</SubText>
            <SubText>전) 에이블짐 노원역점 트레이너</SubText>
            <SubTextm>현) 에이블짐 수유점 트레이너</SubTextm>

            <SubText>자격사항</SubText>
            <SubText>21 고양시 보디빌딩 스포츠모델 3위</SubText>
            <SubText>21 PCA KOREA 스포츠모델 4위</SubText>
            <SubText>CES KOREA 교정운동전문과정 수료</SubText>
            <SubText>FISAF 국제필라테스 교육과정 수료</SubText>
            <SubText>바디컨설팅 아카데미 수료</SubText>
            <SubText>IKA 케틀벨 국제트레이너과정 수료</SubText>
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