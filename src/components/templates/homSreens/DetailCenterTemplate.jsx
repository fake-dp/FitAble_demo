import {Image ,View, Text, ScrollView} from 'react-native';
import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { useNavigation } from '@react-navigation/native';
import GymBasicInfoGrid from '../../grid/GymBasicInfoGrid';
import ThreeBtnGrid from '../../grid/ThreeBtnGrid';
import OperatingProgram from '../../grid/OperatingProgram';
import OperaintgTime from '../../grid/OperatingTime';
import FacilitiesGrid from '../../grid/FacilitiesGrid';
import PhotoScrollGrid from '../../grid/PhotoScrollGrid';
import MainBtn from '../../ui/buttonUi/MainBtn';
import ActiveMainBtn from '../../ui/buttonUi/ActiveMainBtn';
import AboutChannel from '../../grid/AboutChannel';
import LongTextGrid from '../../grid/LongTextGrid';
import ShopTagGrid from '../../grid/ShopTagGrid';

function DetailCenterTemplate(props) {

    const navigation = useNavigation();

    const goBackScreens = () => {
        navigation.goBack();
    };

    const goConsultingScreens = () => {
        navigation.navigate('Consulting');
    };

    const handleBtnPress = (screenName) => {
        navigation.navigate(screenName);
      };

    const testImg = require('../../../assets/img/detailTest.png');
    const backArrow = require('../../../assets/img/back_arrow.png');
    return (
        <Container>
            <ScrollView
              bounces={false}
         
              showsVerticalScrollIndicator={false}
              overScrollMode="never"
            >
            <TestImg source={testImg}/>
            <GobackTouchable onPress={goBackScreens}>
            <Image source={backArrow}/>
            </GobackTouchable>

            <GymBasicInfoGrid 
            onPress={goConsultingScreens}
            />

        <ThreeBtnGrid
          onPressSubscribe={() => handleBtnPress('Subscribe')}
          onPressPT={() => handleBtnPress('PT')}
          onPressUse={() => handleBtnPress('Use')}
        />

        <LongTextGrid />

        <ShopTagGrid />

        <OperatingProgram />

        <OperaintgTime />

        <FacilitiesGrid />

        <PhotoScrollGrid />

        <AboutChannel />

            <ActiveMainBtn>이용하기</ActiveMainBtn>
        </ScrollView>
        </Container>
    );
}

export default DetailCenterTemplate;


const Container = styled.View`
    flex: 1;
    background-color: ${COLORS.sub};
`


const TestImg = styled.Image`
    width: 100%;
`

const GobackTouchable = styled.TouchableOpacity`
position: absolute;
top: 56px;
left: 20px;
`;
