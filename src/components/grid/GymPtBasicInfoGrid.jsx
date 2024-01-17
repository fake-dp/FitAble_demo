
import {Image ,View, Text, ScrollView} from 'react-native';
import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import {threeBtnState,btnActiveState} from '../../store/atom'
import FastImage from 'react-native-fast-image'
function GymPtBasicInfoGrid({detailTrainersData,centerId,id}) {

    const {name, centerName, centerAddress} = detailTrainersData;
    const spaceIcon = require('../../assets/img/spaceIcon.png');
    const mapIcon = require('../../assets/img/map.png');
    const navigation = useNavigation();

    const [threeBtn, setThreeBtn] = useRecoilState(threeBtnState);
    const [activeButton, setActiveButton] = useRecoilState(btnActiveState);
    const goBackFirstDetailScreen = () => {
        // setThreeBtn('');
        navigation.goBack();
        console.log('첫 페이지 이동하기 구현해야함')
    };

    return (
        <Container>
            <MainTitleText>{name} 강사</MainTitleText>
            <SubTextContainerBtn onPress={goBackFirstDetailScreen}>
                <FastImage 
                resizeMode={FastImage.resizeMode.contain}
                source={spaceIcon}
                style={{ width: 20, height: 20 }} 
                />
                <SubText>{centerName}</SubText>
            </SubTextContainerBtn>
            <SubTextContainer>
                <FastImage 
                resizeMode={FastImage.resizeMode.contain}
                source={mapIcon}
                style={{ width: 20, height: 20 }} 
                />
                <SubText>{centerAddress}</SubText>
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

const SubTextContainerBtn = styled.TouchableOpacity`
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