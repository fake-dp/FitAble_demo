import {Button, Image , ScrollView} from 'react-native';
import { styled } from 'styled-components/native';
import { COLORS } from '../../../constants/color';
import { useNavigation } from '@react-navigation/native';
import GymBasicInfoGrid from '../../grid/GymBasicInfoGrid';
import ThreeBtnGrid from '../../grid/ThreeBtnGrid';
import OperatingProgram from '../../grid/OperatingProgram';
import OperaintgTime from '../../grid/OperatingTime';
import FacilitiesGrid from '../../grid/FacilitiesGrid';
import PhotoScrollGrid from '../../grid/PhotoScrollGrid';

import ActiveMainBtn from '../../ui/buttonUi/ActiveMainBtn';
import AboutChannel from '../../grid/AboutChannel';
import LongTextGrid from '../../grid/LongTextGrid';
import ShopTagGrid from '../../grid/ShopTagGrid';

import { useState ,useRef} from 'react';
import BasicNpremiumCardGrid from '../../grid/BasicNpremiumCardGrid';
import MonthTicketGrid from '../../grid/MonthTicketGrid';
import PtUserListGrid from '../../grid/PtUserListGrid';
import GymPtBasicInfoGrid from '../../grid/GymPtBasicInfoGrid';
import PtCareerGrid from '../../grid/PtCareerGrid';
import PtCardListGrid from '../../grid/PtCardListGrid';

function DetailPtTemplate(props) {
    const scrollViewRef = useRef(null);
    const [btnName, setBtnName] = useState('');

    const [selectedCard, setSelectedCard] = useState(0);

    const handleBtnPress = (name) => {
        setBtnName(name);
    };

    const navigation = useNavigation();

    const goBackScreens = () => {
        navigation.goBack();
    };

    const goConsultingScreens = () => {
        navigation.navigate('Consulting');
    };

    const goPtPriceScreens = () => {
        navigation.navigate('PT');
    };




    const testImg = require('../../../assets/img/testptuserimgbig.png');
    const backArrow = require('../../../assets/img/back_arrow.png');

   

    const ptTicketData = [
        {
            id: 0,
            title: '1:1 P.T',
            number: '10',
            price: '77000',
        },
        {
            id: 1,
            title: '1:1 P.T',
            number: '20',
            price: '67000',
        },
        {
            id: 2,
            title: '1:1 P.T',
            number: '30',
            price: '57000',
        },
        {
            id: 3,
            title: '맛보기 체험 레슨 1회',
            number: '1',
            price: '44000',
        },
    ]

    return (
        <Container>
            <ScrollView
            ref={scrollViewRef}
              bounces={false}
         
              showsVerticalScrollIndicator={false}
              overScrollMode="never"
            >
            <TestImg source={testImg}/>
            <GobackTouchable onPress={goBackScreens}>
            <Image source={backArrow}/>
            </GobackTouchable>


            <GymPtBasicInfoGrid />

            <LongTextGrid />
            <PtCareerGrid />
            <PtCardListGrid 
                ptTicketData={ptTicketData}
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
            />


        <BtnContainer>
        <ConsultingBtn onPress={goConsultingScreens} >
            <ConsultingBtnText>상담하기</ConsultingBtnText>
        </ConsultingBtn>

        <ParchaseBtn onPress={goPtPriceScreens}>
            <ParchaseBtnText>구매하기</ParchaseBtnText>
        </ParchaseBtn>
        </BtnContainer>


        </ScrollView>
        </Container>
    );
}

export default DetailPtTemplate;


const Container = styled.View`
    flex: 1;
    background-color: ${COLORS.sub};
    /* padding: 0 20px; */
`


const TestImg = styled.Image`
    width: 100%;
`

const GobackTouchable = styled.TouchableOpacity`
position: absolute;
top: 56px;
left: 20px;
`;


const BtnContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 28px 20px;
`

const ConsultingBtn = styled.TouchableOpacity`
    width: 48%;
    height: 60px;
    background-color: ${COLORS.box};
    justify-content: center;
    align-items: center;
    border-radius: 90px;
`

const ConsultingBtnText = styled.Text`
    color: ${COLORS.white};
    font-size: 16px;
    font-weight: 700;

`

const ParchaseBtn = styled.TouchableOpacity`
    width: 48%;
    height: 60px;
    background-color: ${COLORS.main};
    justify-content: center;
    align-items: center;
    border-radius: 90px;
`

const ParchaseBtnText = styled.Text`
    color: ${COLORS.sub};
    font-size: 16px;
    font-weight: 700;
`